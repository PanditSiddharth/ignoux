import mongoose, { Schema } from "mongoose";

export interface IQuery {
    _id?: string;
    name: string;
    description: string;
    email: string;
    user?: Schema.Types.ObjectId | string;
    createdOn?: Date;
}
export const QuerySchema = new Schema<IQuery>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now,
    }
});

export const QueryModel = mongoose.models.Query || mongoose.model<IQuery>("Query", QuerySchema);
