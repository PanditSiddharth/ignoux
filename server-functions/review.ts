"use server"
import connectDB from "@/connectDB";
import { IReview, ReviewModel } from "@/modals/review.model";
import { getSessionUser } from "./user";
import { OrderModel } from "@/modals/order.model";
import mongoose from "mongoose";
interface SkipPageDataProp {
    skip: number
    postsPerPage: number
    productId: string
}

interface ResProps {
    reviewsRes: IReview[];
    totalReviews: number;
    ratings: { _id: null, totalRating: number, averageRating: number, reviewCount: number }
}
export async function getReviewsFromServer(skipPageData: SkipPageDataProp): Promise<ResProps | false> {
    await connectDB()
    const review = { product: skipPageData.productId }

    try {
        const reviews = await ReviewModel.find(review).sort({ _id: -1 })
        .skip(skipPageData.skip).limit(skipPageData.postsPerPage).populate("user");
        if (!reviews || reviews.length === 0) { return false }
        const count = await ReviewModel.countDocuments(review);


        const result = await ReviewModel.aggregate([
            { $match: { product: new mongoose.Types.ObjectId(skipPageData?.productId) } }, 
            {
              $group: {
                _id: "$product", // Product ID
                totalRating: { $sum: "$rating" }, // Sum of all ratings
                averageRating: { $avg: "$rating" }, // Average of all ratings
                reviewCount: { $count: {} }, // Total number of reviews
              },
            },
          ]);
         const ratings = result[0]
         ratings._id = null;


        return JSON.parse(JSON.stringify({ reviewsRes: reviews, totalReviews: count, ratings }));
    } catch (error) {
        console.error(error);
        return false
    }
}

export async function addReview({ productId, comment, rating }: { productId: string, comment: string, rating: number }) {
    try {
        await connectDB()
        const user = await getSessionUser()
        if (!user) return { error: "Please Login to review" }
        const purchased = await OrderModel.findOne({product: productId, buyer: user._id})
        if(!purchased) return { error: "Please buy to review" }

        const review = await ReviewModel.create({ product: productId, comment, rating, user: user._id });
        if (!review) return { error: "Error creating review"}
        return {success: true}
    } catch (error) {
        console.error(error);
        return {error: (error as {message: string}).message}
    }
}