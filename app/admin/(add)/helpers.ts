import { IBlog } from "@/modals/blog.model"
import { ICourse } from "@/modals/course.model";
import { IProduct } from "@/modals/product.model"

interface ICommon { _id?: string; 
  slug?: string; 
  title?: string 
  thumbnail?: string;
  tags?: string[];
  publishedAt?: Date;
}

export const common = <T extends ICommon>(initial: Partial<T> = {}) => {
  return {
    _id: initial?._id || "",
    slug: initial?.slug || "",
    title: initial?.title || "",
    thumbnail: initial?.thumbnail || "https://res.cloudinary.com/panditsiddharth/image/upload/v1736330395/u780a5e8wjgb3sqep7do.png",
    tags: initial?.tags || [],
    publishedAt: initial?.publishedAt || new Date(),
  };
};
export const getCourseDefault = (initial: Partial<ICourse> = {}) => {
  return {
    ...common(initial),
    status: initial?.status || "private",
    price: initial?.price || 0,
    content: initial?.content || [],
    author: initial?.author || "",
  };
};

export const getBlogDefaults = (initial: Partial<IBlog> = {}) => {
  return {  
    ...common(initial),
    status: initial?.status || "private",
    content: initial?.content || "# IGNOUX.in",
    category: initial?.category || [],
    products: initial?.products || [],
    author: initial?.author || "",
    updatedAt: initial?.updatedAt || new Date(),
  }
}

export const getProductDefault = (initial: Partial<IProduct> = {}) => {
  return {
    ...common(initial),
    price: initial?.price || 0,
    fileLink: initial?.fileLink || "https://res.cloudinary.com/panditsiddharth/image/upload/v1736330395/u780a5e8wjgb3sqep7do.png",
  }
}

export function generateSlug(title: string = "") {
  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing spaces
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
}