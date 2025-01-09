import mongoose, { Schema } from "mongoose";

export interface IProduct{
    _id?: string;
    slug: string;
    title: string;
    price: number;
    description: string;
    thumbnail: string;
    tags: string[];
    fileLink?: string;
    publishedAt?: Date;
}
export const ProductSchema = new Schema<IProduct>({
    slug: {
        type: String, 
        required: true,
        unique: true
        // default: getId()
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    thumbnail: {
        type: String
    },
    fileLink: {
        type: String,
        required: true,
    },
    publishedAt: {
        type: Date,
        default: Date.now,
    }
});

export const ProductModel = mongoose.models?.Product || mongoose.model<IProduct>("Product", ProductSchema);
