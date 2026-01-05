"use server"
import connectDB from "@/connectDB"
import { IQuery, QueryModel } from "@/modals/query.model";
import { getSessionUser } from "./user";

export const createQuery = async (data: Partial<IQuery>) => {
    try {
        await connectDB();
        const { name, email, description } = data;
        const newData = await QueryModel.create({ name, email, description });
        if (newData && newData.email)
            return { success: true }
        else
            return { error: "Error creating Query" }
    } catch (error) {
        return { error: "Error creating query" }
    }
}

export const deleteQuery = async (queryId: string) => {
    try {
        await connectDB();
        const user = await getSessionUser()
        if (!user || user.role != "admin") {
            return { error: "Only admin can delete queries." }
        }
        const newData = await QueryModel.deleteOne({ _id: queryId });
        return {success: true};
    } catch (error) {
        return { error: "Error in deleting query" }
    }
}

export const getQueries = async () => {
    try {
        await connectDB();
        const user = await getSessionUser()
        if (!user || user.role != "admin") {
            return { error: "Only admin can see queries." }
        }
        const newData = await QueryModel.find();
        if(newData)
            return JSON.parse(JSON.stringify(newData)) as IQuery[]
        return {error: "Something went wrong"}
    } catch (error) {
        return { error: "Error in deleting query" }
    }
}