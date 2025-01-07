import { Schema } from "mongoose";


export interface ICourse{
    _id?: string;
    slug: string;
    title: string;
    status: "private" | "published";
    price: number;
    description: string;
    thumbnail: string;
    content: Schema.Types.ObjectId
    landingPage?: string
    author?: Schema.Types.ObjectId | string;
    publishedAt?: Date;
}
