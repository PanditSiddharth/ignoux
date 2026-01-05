
import mongoose, { Schema } from "mongoose";
// eslint-disable-next-line 

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

export interface IUser {
    _id?: string;
    about?: string;
    username?: string;
    name: string;
    email: string;
    password?: string;
    phone?: number;
    image?: string;
    role?: "student" | "admin";
    createdOn?: Date;
}

export const UserSchema = new Schema<IUser>({
    username: { type: String, unique: true, default: getId() },
    name: { type: String, required: true },
    password: { type: String },
    about: { type: String, required: false },
    phone: { type: Number, required: false },
    email: { type: String, required: true },
    role: { type: String, default: "student" },
    image: { type: String, default: "" },
    createdOn: { type: Date, default: Date.now }
})

export const UserModel = mongoose.models?.User || mongoose.model<IUser>("User", UserSchema)

