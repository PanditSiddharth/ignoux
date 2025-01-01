"use client"
import { IProduct } from "@/modals/product.model";
import { getProductFromServer, getProductsFromServer } from "@/server-functions/product";
import { create } from "zustand";

interface ProductsStore {
    products: IProduct[];
    product: IProduct;
    page: number;
    totalProducts: number;
    increasePage: () => void;
    getProducts(arg0: { username?: string, page: number, postsPerPage?: number, boughtProducts?: boolean
        category?: string, search?:string;
     }, isInfiniteScroll?: boolean): Promise<void>;
    getProduct: (slug: string) => Promise<void | false>
}
const useProductsStore = create<ProductsStore>((set) => ({
    products: [],
    page: 1,
    totalProducts: 0,
    product: {} as IProduct,
    getProduct: async (slug) => {
        try {
            const res = await getProductFromServer(slug);
            if (!res) {
                set({ product: {} as IProduct });
                return false;
            }
            set({ product: res });
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    },
    getProducts: async (o, isInfiniteScroll = false) => {
        const skip = isInfiniteScroll ? (o.page - 1) * (o?.postsPerPage || 20) : 0;
        try {
            const skipPageData = JSON.parse(JSON.stringify({ skip, postsPerPage: o.postsPerPage || 20, 
                username: o.username, boughtProducts: o.boughtProducts,
                category: o.category, search: o.search
            }));
            const res = await getProductsFromServer(skipPageData);
            if (res) {
                const { productsRes, totalProducts } = res;
                set(() => ({ totalProducts }));
                if (!isInfiniteScroll)
                    set({ products: productsRes });
                else
                    set((state) => ({ products: [...state.products, ...productsRes] }));
            }
            else set({ products: [] });

        } catch (error) {
            console.error(error);
        }
    },
    increasePage: () => set((state) => ({ page: state.page + 1 })),
}))


export default useProductsStore