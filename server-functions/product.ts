"use server"

import connectDB from "@/connectDB";
import { IProduct, ProductModel } from "@/modals/product.model";
import { getSessionUser, getUserByUsername } from "./user";
import { IOrder, OrderModel } from "@/modals/order.model";
import { ReviewModel } from "@/modals/review.model";
import { productFilter } from "@/helpers";
import mongoose from "mongoose";
interface SkipPageDataProp {
    skip: number
    postsPerPage: number
    username: string,
    boughtProducts?: boolean,
    category?: string,
    search?: string
}

interface ResProps {
    productsRes: IProduct[];
    totalProducts: number;
}
export async function getProductsFromServer(skipPageData: SkipPageDataProp): Promise<ResProps | false> {
    await connectDB()
    const user = await getSessionUser()
    const query = {} as { seller?: string, buyer?: string, username?: string, category?: string, }

    const username = skipPageData?.username?.split("@")[1]


    if (username && username != 'all') {
        const seller = await getUserByUsername(username)
        query[skipPageData.boughtProducts ? "buyer" : "seller"] = seller?._id
    }


    try {
        let products;
        let count;
        if (skipPageData.boughtProducts) {

            // Fetch orders and populate product data
            products = await OrderModel.find(query).sort({ _id: -1 }).populate("product")

            // Ensure unauthorized users cannot access the fileLink
            const buyer = products[0]?.buyer
            if (!user || user && user._id != buyer) {
                products = products.map((product: IProduct) => {
                    product.fileLink = undefined;
                    return product
                })
            }

            // Clean up invalid orders without transactionId
            products = await products.reduce(async (acc, order) => {
                if (order.product !== null) {
                    if (!order.transactionId) {
                        await OrderModel.deleteOne({ orderId: order.orderId }).catch(console.error);
                    } else {
                        const { product, ...others } = order;
                        acc.push({ ...product._doc, ...others._doc });
                    }
                }
                return acc;
            }, []);
            count = await OrderModel.countDocuments(query);

        } else {

            // Product-specific filters
            if (skipPageData.category) query.category = skipPageData.category;

            // Fetch products with search and pagination
            products = await ProductModel.find({
                ...query,
                $or: [
                    { name: { $regex: skipPageData.search || "", $options: "i" } },
                    { description: { $regex: skipPageData.search || "", $options: "i" } },
                    { tags: { $regex: skipPageData.search || "", $options: "i" } },
                ],
            })
                .sort({ _id: -1 })
                .skip(skipPageData.skip)
                .limit(skipPageData.postsPerPage);


            if (!user || user && user._id != products[0]?.seller) {
                products = products.map((product: IProduct) => {
                    product.fileLink = undefined;
                    return product
                })
            }
            count = await ProductModel.countDocuments({
                ...query,
                $or: [
                    { name: { $regex: skipPageData.search || "", $options: "i" } },
                    { description: { $regex: skipPageData.search || "", $options: "i" } },
                    { tags: { $regex: skipPageData.search || "", $options: "i" } },
                ],
            });
        }
        if (!products || products.length === 0) { return false }

        return JSON.parse(JSON.stringify({ productsRes: products, totalProducts: count }));
    } catch (error) {
        console.error(error);
        return false
    }
}

export async function getProductFromServer(productId: string): Promise<IProduct | false> {
    await connectDB()
    try {
        const product = await ProductModel.findById(productId);
        if (!product) return false
        const user = await getSessionUser()

        if (user?.role != "admin" && product.seller != user?._id)
            product.fileLink = null

        return JSON.parse(JSON.stringify(product));
    } catch (error) {
        console.error(error);
        return false
    }
}

export async function addOrUpdateProducts(data: Partial<IProduct> | Partial<IProduct>[]): Promise<IProduct[] | { error: string }> {
    try {
        await connectDB()
        const user = await getSessionUser()
        if (!user) return { error: "Please Login first" }
        const isProductArray = Array.isArray(data)
        const arrData = isProductArray ? data : [data]
        const options = { new: true, upsert: true, setDefaultsOnInsert: true };
        const results = await Promise.all(arrData.map(async (productData) => {
            const product = await ProductModel.findByIdAndUpdate(
                {_id: productData._id || new mongoose.Types.ObjectId()}, 
                productData, options);
            if (!product) return { error: "Something went wrong in updating product server side" }
            return productFilter(product)
        }));

        if (results.some(result => 'error' in result)) {
            return { error: "Some products failed to update/add" }
        }

        return JSON.parse(JSON.stringify(results)) as IProduct[]

    } catch (error) {
        console.error(error);
        return { error: (error as { message: string }).message }
    }
}

export async function deleteProduct(productId: string) {
    if (productId === undefined)
        return { error: "ProductId is required" }
    const user = await getSessionUser()
    if (!user)
        return { error: "You are not logged in" }
    await connectDB()
    try {
        if (user.role === "admin") {
            await ProductModel.deleteOne({ _id: productId })
            await ReviewModel.deleteMany({ product: productId })
        } else {
            const res = await ProductModel.deleteOne({ _id: productId, seller: user._id })
            if (res.deletedCount === 0)
                return { error: "Unable to delete product" }
            await ReviewModel.deleteMany({ product: productId })
        }
        return { success: true }
    } catch (error) {
        console.error(error)
        return { error: "Failed to delete product" }
    }
}

export async function getOrder(transactionId: string): Promise<Record<string, IOrder> | false> {
    await connectDB()
    try {
        const order = await OrderModel.findOne({ transactionId }).populate("product");
        if (!order) return false

        const { product, ...others } = order;

        return JSON.parse(JSON.stringify({ ...product._doc, ...others._doc }));
    } catch (error) {
        console.error(error);
        return false
    }
}
