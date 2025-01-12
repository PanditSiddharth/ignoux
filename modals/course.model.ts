import mongoose, { Schema } from "mongoose";
import { UserModel } from "./user.model";
import { BlogModel } from "./blog.model";

export interface ICourse {
    _id?: string;
    slug: string;
    title: string;
    status: "private" | "published";
    price: number;
    description: string;
    thumbnail: string;
    content: string[]; //  BlogModel
    tags: string[]; //  BlogModel
    landingPage?: string
    author?: string; // UserModel
    publishedAt?: Date;
}
const CourseSchema = new Schema<ICourse>({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    status: { type: String, enum: ["private", "published"], required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    content: [{ type: Schema.Types.ObjectId, ref: BlogModel }],
    tags: [{ type: String }],
    landingPage: { type: String },
    author: { type: Schema.Types.ObjectId, ref: UserModel },
    publishedAt: { type: Date }
});

export const CourseModel = mongoose.models?.Course || mongoose.model("Course", CourseSchema);