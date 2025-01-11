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

export async function getBlog(slug: string): Promise<Partial<IBlog> | {error: string}> {
    if(!slug)
        return {error: "Invalid Url"}
    await connectDB()
    try {
        const blog = await BlogModel.findOne({slug}) as IBlog;
        if (!blog) return {error: "No blog found"}

        return blogFilter(blog);
    } catch (error: any) {
        return err(error, "f", {ret: error.message});
    }
}

interface GetBlogOptions {
    skip: number
    postsPerPage?: number
    search?: string
    searchBy?: string
}

interface ResProps {
    blogs: IBlog[];
    totalBlogs: number;
}

export async function getBlogs(options: GetBlogOptions): Promise<ResProps | {error: string}> {
    await connectDB()
    const user = await getSessionUser()

    try {
        options.postsPerPage = options.postsPerPage || 20
        const or = [
            { title: { $regex: options.search || "", $options: "i" } },
            { description: { $regex: options.search || "", $options: "i" } },
            { tags: { $regex: options.search || "", $options: "i" } },
        ]
            // Fetch blogs with search and pagination
           const blogs = await BlogModel.find({
                $or: or,
            })
                .sort({ _id: -1 })
                .skip(options.skip)
                .limit(options.postsPerPage);

            const totalBlogs = await BlogModel.countDocuments({
                $or: or,
            });
        
        return JSON.parse(JSON.stringify({ blogs, totalBlogs }));
    } catch (error: any) {
       return err(error, "f", {ret: error.message})
    }
}