"use server"
import { auth } from "@/auth";
import connectDB from "@/connectDB"
import { IUser, UserModel } from "@/modals/user.model"
import { randomUUID } from "crypto"
import { AnalyticsModel, IAnalytics } from "@/modals/analytics.model";
import { ProductModel } from "@/modals/product.model";

export const isExistingUser = async (email: string) => {
    try {
        await connectDB()
        const user = await UserModel.findOne({ email })
        if (user) {
            return user
        }
        return false
    } catch (error) {
        console.error("Error checking user", error);
        return false
    }
}

export const createUser = async (user: Partial<IUser>) => {
    try {
        await connectDB()
        const randomId = randomUUID().split("-")[1]
        const userId = user.userId ? user.userId : randomId
        const username = user.username ? user.username : userId
        const analyticss = JSON.parse(JSON.stringify(await AnalyticsModel.create({ userId })))

        const newUser = await UserModel.create({ ...user, userId, username, analytics: analyticss._id })
        return newUser
    } catch (error) {
        console.error("Error creating user", error);
        return false
    }
}
export const deleteUser = async () => {
    try {
        await connectDB()
        const user = await getSessionUser()
        if (user) {
            await AnalyticsModel.deleteOne({ userId: user?.userId })
            await UserModel.deleteOne({ _id: user._id })
            return { success: true }
        } else {
            return { error: "Not logged in" }
        }
    } catch (error) {
        console.error("Error creating user", error);
        return { error: (error as { message: string }).message }
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        await connectDB()
        const user = await UserModel.findOne({ email })

        if (user) {
            return JSON.parse(JSON.stringify(user))
        }
        return null
    } catch (error) {
        console.error("Error getting user", error);
        return null
    }
}

export const getSessionUser = async () => {
    const session = await auth()
    if (!session) {
        return null
    }
    else return session.user
}

export const updateUser = async (user: Partial<IUser>) => {
    const session = await auth()
    if (!session) {
        return { error: "Not logged in" }
    }

    try {
        await connectDB()
        const updatedUser = await UserModel.findOneAndUpdate({ email: user.email }, user, { new: true })
        if (!updateUser)
            return { error: "User not found" }
        return JSON.parse(JSON.stringify(updatedUser)) as IUser
    } catch (error) {
        console.error("Error updating user", error);
        return { error: (error as { message: string }).message }
    }
}

export const getSellers = async () => {
    const session = await auth()
    const userId = session?.user?._id || null
    try {
        await connectDB()
        const users = await UserModel.find({ role: "seller", _id: { $ne: userId } })
        return JSON.stringify(users)
    } catch (error) {
        console.error("Error getting users", error);
        return null
    }
}

export const getUserByUsername = async (username: string) => {
    const userlog = await getSessionUser()
    try {
        await connectDB()
        const user = await UserModel.findOne({ username })
        if (user) {
            if (!userlog || userlog.role != "admin" && username !== userlog?.username) {
                user.phone = undefined
                user.email = undefined
                user.ifsc = undefined
                user.account = undefined
            }


            return JSON.parse(JSON.stringify(user))
        }
        return null
    } catch (error) {
        console.error("Error getting user", error);
        return null
    }
}

export const getUsernameByProductId = async (productId: string) => {
    try {
        await connectDB()
        const product = await ProductModel.findOne({ _id: productId }).populate("seller")
        if (product)
            return product.seller.username
        else
            return null

    } catch (error) {
        console.error("Error getting user", error);
        return null
    }
}

interface SkipPageDataProp {
    skip: number
    postsPerPage: number
    username: string
    search?: string
    searchBy?: "name" | "username" | "about" | "userId"
}

interface ResProps {
    usersRes: IUser[];
    totalUsers: number;
}
export async function getUsersFromServer(skipPageData: SkipPageDataProp): Promise<ResProps | false> {
    await connectDB()

    try {
        let users;
        const { search, searchBy } = skipPageData;
        const currentUser = await getSessionUser()

        const searchRegex = search ? search?.replace("@", "") : "";
        const searchQuery = { $regex: searchRegex, $options: "i" };
        const query: { $or?: Array<Record<string, { $regex: string; $options: string }>> } = {};


        if (searchBy) {
            query.$or = [{ [searchBy]: searchQuery }];
        } else if (searchRegex) {
            query.$or = [
                { name: searchQuery },
                { username: searchQuery },
                { about: searchQuery },
                { userId: searchQuery },
            ];
        }

        if (currentUser && currentUser.role == 'admin') {
            users = await UserModel.find(query).sort({ _id: -1 })
                .skip(skipPageData.skip).limit(skipPageData.postsPerPage).populate("analytics");
        }
        else {
            users = await UserModel.find(query).sort({ _id: -1 })
                .skip(skipPageData.skip).limit(skipPageData.postsPerPage);
        }

     
        users = await Promise.all(users.map(async user => {
            user._doc.products = await ProductModel.countDocuments({ seller: user._id })
            user._doc.analytics = user?.analytics?._doc

            if(currentUser?.role != "admin"){
                user._doc.phone = undefined
                user._doc.email = undefined
                user._doc.ifsc = undefined
                user._doc.account = undefined
                user._doc.anlytics = undefined
            }
            return user._doc
        }))
        if (!users || users.length === 0) { return false }
        const count = await UserModel.countDocuments(query);

        const res = JSON.parse(JSON.stringify({ usersRes: users, totalUsers: count }));
        return res;

    } catch (error) {
        console.error(error);
        return false
    }
}

export const updateUserAnalytics = async (userId: string, data: Partial<IAnalytics>) => {
    try {
        const user = await getSessionUser()

        if(!user || user?.role != "admin")
            return { error: "Unauthorized user or not logged in" }

        await connectDB()
        const updated = await AnalyticsModel.updateOne({userId}, data)
        if(updated.modifiedCount == 0)
            return {error: "Something went wrong in updating users data"}
        return {success: true}
    } catch (error) {
        console.error(error)
        return {error: (error as {message: string}).message}
    }
}

