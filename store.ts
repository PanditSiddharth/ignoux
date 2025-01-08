"use client"
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { IProduct } from './modals/product.model'

type ProductId = {
    productAdds: Partial<IProduct>[],
    setProductAdds: (products: Partial<IProduct>[]) => void
}

export const useAddProducts = create<ProductId>()(
    persist((set) => ({
        productAdds: [],
        // eslint-disable-next-line 
        setProductAdds: (products) => set((state) => ({ productAdds: products })),
    }), {
        name: 'product-add-storage', // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
    )
)