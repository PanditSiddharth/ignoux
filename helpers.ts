import { IBlog } from "./modals/blog.model";
import { ICourse } from "./modals/course.model";
import { IProduct } from "./modals/product.model";
import { IUser } from "./modals/user.model";

// eslint-disable-next-line
export const userFilter = (user: any = {}): Partial<IUser> => {
    const { _id, name, email, password, image, role, about, phone, username }: Partial<IUser> = user;
    const filteredUser: Partial<IUser> = { _id: String(_id), name, email, password, image, role, about, phone, username };

    return Object.fromEntries(
        Object.entries(filteredUser).filter(([, value]) => value !== undefined)
    );
}

// eslint-disable-next-line
export const blogFilter = (blog: any = {}): Partial<IBlog> => {
    const { _id, slug, title, status, description, thumbnail, content, tags, products, author, publishedAt, updatedAt }:Partial<IBlog> = blog;
    const filteredBlog: Partial<IBlog> = { _id: String(_id), slug, title, status, description, thumbnail, content, tags, products, author, publishedAt, updatedAt };

    return Object.fromEntries(
        Object.entries(filteredBlog).filter(([, value]) => value !== undefined)
    );
}

// eslint-disable-next-line
export const courseFilter = (course: any = {}): Partial<ICourse> => {
    const { _id, slug, title, status, price, description, thumbnail, content, landingPage, author, publishedAt }: Partial<ICourse> = course;
    const filteredCourse: Partial<ICourse> = { _id: String(_id), slug, title, status, price, description, thumbnail, content, landingPage, author, publishedAt };

    return Object.fromEntries(
        Object.entries(filteredCourse).filter(([, value]) => value !== undefined)
    );
}

// eslint-disable-next-line
export const productFilter = (product: any = {}): Partial<IProduct> => {
    const { _id, slug, title, price, description, thumbnail, tags, fileLink, publishedAt }: Partial<IProduct> = product;
    const filteredProduct: Partial<IProduct> = { _id: String(_id), slug, title, price, description, thumbnail, tags, fileLink, publishedAt };

    return Object.fromEntries(
        Object.entries(filteredProduct).filter(([, value]) => value !== undefined)
    );
}

// eslint-disable-next-line
export const err = <T>(error: any, tp?: "m" | "f" , e?: {
// eslint-disable-next-line
ret: T
}) => {
    if(!tp || tp === "f") 
        console.error(error)
    else if(tp === "m"){
        console.error(error?.message)
    }
    return e?.ret as T
}

