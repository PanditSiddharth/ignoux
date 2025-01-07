
import mongoose, { Schema } from "mongoose";
import { IProduct, ProductModel } from "./product.model";
import { IUser, UserModel } from "./user.model";

export interface IReview {
    _id?: string;
    user: IUser | string,
    product: IProduct | string,
    rating: number;
    comment: string;
    createdOn?: Date;
}

export const ReviewSchema = new Schema<IReview>({
    user: { type: Schema.Types.ObjectId, ref: UserModel, required: true },
    product: { type: Schema.Types.ObjectId, ref: ProductModel, required: true },
    rating: { type: Number, default: 1 },
    comment: { type: String, required: true },
    createdOn: { type: Date, default: Date.now }
})

export const ReviewModel = mongoose.models?.Review || mongoose.model<IReview>("Review", ReviewSchema)

