"use client"
import Scroll from '@/components/infinite-scroll'
import ProductCard from '@/components/product/product-card'
import { IProduct } from '@/modals/product.model'
import { getProductsFromServer } from '@/server-functions/product'
import { useDataStore } from '@/store'

const Products = () => {
  const pd = useDataStore<IProduct[]>("products", [])()
  
  const next = async ()=> {
    console.log("fetching...")
    console.log(pd.data.length)
    const p = await getProductsFromServer({skip: pd?.data.length, postsPerPage: 10})
    console.log(p)
  
    if("error" in p) return console.error(p.error)
      pd.setTotalLength(p.totalProducts || 0)
    pd.setData([...pd.data, ...p.products])
  }

  return (
    <Scroll 
    data={pd.data || []}
    next={next}
    className2='grid-cols-4'
    totalLength={pd.totalLength}
    element={(data, index) => (
      <ProductCard key={index} product={data}/>
  )}
    />
  )
}

export default Products