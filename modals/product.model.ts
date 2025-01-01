import mongoose, { Schema, Document } from "mongoose";
import { UserModel } from "./user.model";
import { categoriesObject } from "./data";

export interface IProduct extends Document{
    slug?: string;
    name: string;
    price: number;
    description: string;
    thumbnail: string;
    tags: string[];
    fileLink?: string;
    createdOn?: Date;
    category?: keyof typeof categoriesObject;
    seller?: Schema.Types.ObjectId | string;
}
export const ProductSchema = new Schema<IProduct>({
    seller: {
        type: Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    },
    slug: {
        type: String, 
        // default: getId()
    },
    name: {
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
    category: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now,
    }
});

export const ProductModel = mongoose.models?.Product || mongoose.model<IProduct>("Product", ProductSchema);
