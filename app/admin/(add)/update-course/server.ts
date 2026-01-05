"use server"
import connectDB from "@/connectDB"
import { CourseModel } from "@/modals/course.model"

export const update = async (data: any) => { 
    await connectDB()
    await CourseModel.updateOne({slug: data.slug}, {content: data.content})
}