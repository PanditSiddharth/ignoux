"use server"
import connectDB from "@/connectDB";
import { BlogModel, IBlog } from "@/modals/blog.model";
import { getSessionUser } from "./user";
import mongoose from "mongoose";
import { blogFilter, err } from "@/helpers";

export const addOrUpdateBlog = async (blog: Partial<IBlog>): Promise<Partial<IBlog> | { error: string }> => {
    try {
        await connectDB();
        const user = await getSessionUser();
        if (!user) return { error: "Please Login first" };

        const options = { new: true, upsert: true, setDefaultsOnInsert: true };
        const product = await BlogModel.findOneAndUpdate(
            { _id: blog._id || new mongoose.Types.ObjectId() },
            blog, options
        );

        if (!product) return { error: "Something went wrong in processing the blog" };
        return blogFilter(product)
    } catch (error: any) {
        return err(error, "f", { ret: error.message });
    }
};
