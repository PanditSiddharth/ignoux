import { IBlog } from "./modals/blog.model";
import { ICourse } from "./modals/course.model";
import { IProduct } from "./modals/product.model";
import { IUser } from "./modals/user.model";

export const userFilter = (user: any = {}): Partial<IUser> => {
    const { _id, name, email, password, image, role, about, phone, username }: Partial<IUser> = user;
    const filteredUser: Partial<IUser> = { _id: _id ? String(_id) : undefined, name, email, password, image, role, about, phone, username };
    return JSON.parse(JSON.stringify(filteredUser))
}

export const blogFilter = (blog: any = {}): Partial<IBlog> => {
    const { _id, slug, title, status, description, thumbnail, content, tags, products, author, publishedAt, updatedAt }: Partial<IBlog> = blog;
    const filteredBlog: Partial<IBlog> = { _id: _id ? String(_id) : undefined, slug, title, status, description, thumbnail, content, tags, products, author, publishedAt, updatedAt };

    return JSON.parse(JSON.stringify(filteredBlog));
}

export const courseFilter = (course: any = {}): Partial<ICourse> => {
    const { _id, slug, title, status, price, description, thumbnail, content, landingPage, author, publishedAt }: Partial<ICourse> = course;
    const filteredCourse: Partial<ICourse> = { _id: _id ? String(_id) : undefined, slug, title, status, price, description, thumbnail, content, landingPage, author, publishedAt };
    return JSON.parse(JSON.stringify(filteredCourse));
}

export const productFilter = (product: any = {}, str?: any): Partial<IProduct> => {
    str = str?.trim()
    if (str && str.includes("!")) {
        str = str?.replace("!", "")
        for (const data of str.split(" ")) {
            product[data] = undefined;
        }
    } else if (str) {
        const pd: any = {}
        for (const data in str?.split()) {
            pd[data] = product[data]
        }
        product = pd
    }

    const { _id, slug, title, price, description, thumbnail, tags, fileLink, publishedAt }: Partial<IProduct> = product;
    const filteredProduct: Partial<IProduct> = {
        _id: _id ? String(_id) : undefined, slug, title,
        price, description, thumbnail, tags, fileLink, publishedAt
    };
    return JSON.parse(JSON.stringify(filteredProduct))
}

export const err = <T>(error: any, tp?: "m" | "f", e?: {
    ret: T
}) => {
    if (!tp || tp === "f")
        console.error(error)
    else if (tp === "m") {
        console.error(error?.message)
    }
    return e?.ret as T
}

