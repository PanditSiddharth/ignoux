"use client"
import Scroll from '@/components/infinite-scroll'
import { IProduct } from '@/modals/product.model'
import { getProductsFromServer } from '@/server-functions/product'
import React, { useState } from 'react'

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const next = async ()=> {
    console.log("fetching...")
    const p = await getProductsFromServer({skip: products.length})
    console.log(p)
    if("error" in p) return console.error(p.error)
    setProducts(p.products)
  }

  return (
    <Scroll 
    data={products || []}
    next={next}
    totalLength={1}
    element={(data, index) => (<div key={index}>{data.title}</div>)}
    />
  )
}

export default Products