import { IBlog } from "@/modals/blog.model"
import { IProduct } from "@/modals/product.model"

export const getBlogDefaults = (initial: Partial<IBlog> = {}) => {
    return {
      slug: initial?.slug || "",
      title: initial?.title || "",
      status: initial?.status || "private",
      description: initial?.description || "",
      thumbnail: initial?.thumbnail || "",
      content: initial?.content || "# IGNOUX.in",
      tags: initial?.tags || [],
      products: initial?.products || [],
      author: initial?.author || "",
      publishedAt: initial?.publishedAt || new Date(),
      updatedAt: initial?.updatedAt || new Date(),
      _id: initial?._id || "",
    }
  }

  export const getProductDefault = (initial: Partial<IProduct> = {}) => {
    return {
          name: initial?.name || "",
          description: initial?.description || "",
          price: initial?.price || 0,
          tags: initial?.tags || [],
          thumbnail: initial?.thumbnail || "",
          fileLink: initial?.fileLink || "",
          publishedAt: initial?.publishedAt || new Date(),
          slug: initial?.slug || ""
        }
  }