"use client"

import { useEffect, useTransition } from "react"
import { BarLoader } from 'react-spinners'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import ProductCard from "@/components/product/product-card"
import useProductsStore from "@/hooks/use-products"

export default function ProductsShowcase() {
    const [isPending, startTransition] = useTransition()
    const { getProducts, products } = useProductsStore();
    useEffect(() => {
        startTransition(async () => {
            await getProducts({ page: 1, postsPerPage: 10  });
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isPending) {
        return (
            <div className="flex justify-center items-center h-64">
                <BarLoader color="#36d7b7" />
            </div>
        )
    }

    return (
        <div className="container w-full py-12 px-2 md:px-14">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
            <Carousel plugins={[
                Autoplay({
                    delay: 4000
                }),
            ]}>
                <CarouselContent>
                    {products.map((product) => (
                        <CarouselItem key={product.slug} className='md:basis-1/2  lg:basis-1/3'>
                            <ProductCard product={product} options={{
                                list: {
                                    xs: 1,
                                    sm: 1,
                                    md: 3,
                                    lg: 6,
                                },
                                hz: false
                            }} />
                        </CarouselItem>
                    ))}
                </CarouselContent >
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

