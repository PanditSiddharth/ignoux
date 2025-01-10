"use client"
import { create, StoreApi, UseBoundStore } from 'zustand'
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

const storeInstances = new Map<string, any>();
interface IDataOptions<T> {
    data: T,
    setData: (data: T) => void,
    totalLength: number,
    setTotalLength: (totalLength: number) => void,
}
export const useDataStore = <T,>(key: string, defaultData: T) => {
    if (!storeInstances.has(key)) {
      // Store the new store
      const useNewStore = create<IDataOptions<T>>(
          (set: (arg0: (state: IDataOptions<T>) => { data: T }) => void) => ({
              data: defaultData,
              setData: (data: T) => set(() => ({ data: data })),
              totalLength: 0,
              setTotalLength: (totalLength: number) => set((state) => ({ totalLength: totalLength, data: state.data })),
          })
      );
      storeInstances.set(key, useNewStore);
    }
    // Return the existing store for the given key
    return storeInstances.get(key) as UseBoundStore<StoreApi<IDataOptions<T>>>;
  };
