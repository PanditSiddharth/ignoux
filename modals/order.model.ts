import mongoose, { Schema, Document } from "mongoose";
import { ProductModel } from "./product.model";
import { UserModel } from "./user.model";

export interface IOrder extends Document {
    orderId: string;
    transactionId?: string;
    status?: string;
    createdOn?: Date;
    seller: Schema.Types.ObjectId | string;
    buyer: Schema.Types.ObjectId | string;
    product: Schema.Types.ObjectId | string;
}

const OrderSchema = new Schema<IOrder>({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    transactionId: {
        type: String,
    },
    status: {
        type: String,
        default: "pending"  // Add default status
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: ProductModel,
        required: true,
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

export const OrderModel = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
