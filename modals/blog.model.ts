import mongoose, { Schema } from "mongoose";
import { UserModel } from "./user.model";
import { IProduct, ProductModel } from "./product.model";

export interface IBlog {
    slug: string;
    title: string;
    status: "private" | "free" | "paid";
    description: string;
    thumbnail: string;
    content: string;
    category: string[];
    tags: string[];
    products?: string[] | IProduct[];
    author?: string;
    publishedAt?: Date;
    updatedAt?: Date;
    _id?: string;
}

export const BlogSchema = new Schema<IBlog>({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    status: { type: String, enum: ["private", "free", "paid"], default: "free" },
    description: { type: String },
    thumbnail: { type: String },
    category: [{type: String}],
    content: { type: String },
    tags: [{ type: String }],
    products: [{ type: Schema.Types.ObjectId, ref: ProductModel }],
    author: { type: Schema.Types.ObjectId, ref: UserModel },
    publishedAt: { type: Date },
    updatedAt: { type: Date }
  });
  
  export const BlogModel = mongoose.models?.Blog || mongoose.model("Blog", BlogSchema);
