import { IBlog } from "@/modals/blog.model"
import { IProduct } from "@/modals/product.model"

export const getBlogDefaults = (initial: Partial<IBlog> = {}) => {
    return {
      slug: initial?.slug || "",
      title: initial?.title || "",
      status: initial?.status || "private",
      description: initial?.description || "",
      thumbnail: initial?.thumbnail || "https://res.cloudinary.com/panditsiddharth/image/upload/v1736330395/u780a5e8wjgb3sqep7do.png",
      content: initial?.content || "# IGNOUX.in",
      tags: initial?.tags || [],
      category: initial?.category || [],
      products: initial?.products || [],
      author: initial?.author || "",
      publishedAt: initial?.publishedAt || new Date(),
      updatedAt: initial?.updatedAt || new Date(),
      _id: initial?._id || "",
    }
  }

  export const getProductDefault = (initial: Partial<IProduct> = {}) => {
    return {
          title: initial?.title || "",
          description: initial?.description || "",
          price: initial?.price || 0,
          tags: initial?.tags || [],
          thumbnail: initial?.thumbnail || "https://res.cloudinary.com/panditsiddharth/image/upload/v1736330395/u780a5e8wjgb3sqep7do.png",
          fileLink: initial?.fileLink || "https://res.cloudinary.com/panditsiddharth/image/upload/v1736330395/u780a5e8wjgb3sqep7do.png",
          publishedAt: initial?.publishedAt || new Date(),
          slug: initial?.slug || ""
        }
  }

  export function generateSlug(title: string = "") {
    return title
      .toLowerCase() // Convert to lowercase
      .trim() // Remove leading and trailing spaces
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
      .replace(/\s+/g, "-"); // Replace spaces with hyphens
  }