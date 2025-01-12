"use server"
import connectDB from "@/connectDB";
import { CourseModel, ICourse } from "@/modals/course.model";
import { getSessionUser } from "./user";
import mongoose from "mongoose";
import { courseFilter, err } from "@/helpers";

export const addOrUpdateCourse = async (course: Partial<ICourse>): Promise<Partial<ICourse> | { error: string }> => {
    try {
        console.log(course)
        await connectDB();
        const user = await getSessionUser();
        if (!user) return { error: "Please Login first" };

        const options = { new: true, upsert: true, setDefaultsOnInsert: true };
        const courseRes = await CourseModel.findOneAndUpdate(
            { _id: course._id || new mongoose.Types.ObjectId() },
            course, options
        );

        if (!courseRes) return { error: "Something went wrong in processing the course" };
        return courseFilter(courseRes)
    } catch (error: any) {
        return err(error, "f", { ret: error.message });
    }
};

// export async function getCourse(slug: string, category?: string): Promise<Partial<ICourse> | {error: string}> {
//     if(!slug)
//         return {error: "Invalid Url"}
//     await connectDB()
//     try {
//         const course = await CourseModel.findOne({slug}) as ICourse;
//         if (!course) return {error: "No course found"}
//         if(category && Array.isArray(course.category)){
//             if(!course.category.includes(category.trim()?.toLowerCase()))
//                 return {error: "No course found"}
//         }
        
//         return courseFilter(course);
//     } catch (error: any) {
//         return err(error, "f", {ret: error.message});
//     }
// }

interface GetCourseOptions {
    skip: number
    postsPerPage?: number
    search?: string
    searchBy?: string
}

interface ResProps {
    courses: ICourse[];
    totalCourses: number;
}

export async function getCourses(options: GetCourseOptions): Promise<ResProps | {error: string}> {
    await connectDB()
    const user = await getSessionUser()

    try {
        options.postsPerPage = options.postsPerPage || 20
        const or = [
            { title: { $regex: options.search || "", $options: "i" } },
            { description: { $regex: options.search || "", $options: "i" } },
            { tags: { $regex: options.search || "", $options: "i" } },
        ]
            // Fetch courses with search and pagination
           const courses = await CourseModel.find({
                $or: or,
            })
                .sort({ _id: -1 })
                .skip(options.skip)
                .limit(options.postsPerPage);

            const totalCourses = await CourseModel.countDocuments({
                $or: or,
            });
        
        return JSON.parse(JSON.stringify({ courses, totalCourses }));
    } catch (error: any) {
       return err(error, "f", {ret: error.message})
    }
}