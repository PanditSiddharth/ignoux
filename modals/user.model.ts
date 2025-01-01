
import mongoose, { Schema } from "mongoose";
// eslint-disable-next-line 
import { AnalyticsModel, IAnalytics } from "./analytics.model"

export function getId() {
    let userid = new Date().getTime() - 1707805802621 + Math.floor(Math.random() * 100)
    const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    do {
        result = alphabet[userid % 62] + result;
        userid = Math.floor(userid / 62);
    } while (userid > 0);
    return result;
}

export interface IUser{
    userId: string;
    _id: string;
    about?: string;
    username: string;
    analytics?: IAnalytics | string,
    name: string;
    email: string;
    phone?: number;
    image?: string;
    role?: "student" | "seller" | "admin";
    account?: string;
    ifsc?: string;
    isVerified?: boolean;
    createdOn?: Date;
}

export const UserSchema = new Schema<IUser>({
    userId: { type: String, required: true, unique: true, default: getId() },
    username: { type: String, required: true, unique: true, default: getId() },
    analytics: { type: Schema.Types.ObjectId, ref: AnalyticsModel, required: true },
    name: { type: String, required: true },
    about: { type: String, required: false },
    phone: { type: Number, required: false },
    email: { type: String, required: true },
    role: { type: String, default: "student" },
    image: { type: String, default: "" },
    account: { type: String, default: "" },
    ifsc: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
    createdOn: { type: Date, default: Date.now }
})

export const UserModel = mongoose.models?.User || mongoose.model<IUser>("User", UserSchema)

