import { Schema } from "mongoose";

export interface IComment {
    blogId: Schema.Types.ObjectId; // Reference to Blog
    userId: Schema.Types.ObjectId; // User who commented
    message: string; // Comment text
    createdOn: Date; // Date of comment
}
