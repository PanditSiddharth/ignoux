"use client"
import { Card,  CardFooter, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { IndianRupee } from "lucide-react"
import { IProduct } from "@/modals/product.model"
import ProductActionDropdown from "./product-action-dropdown"
import ProductShareAction from "./product-share-action"
import Link from "next/link"
import { ProductOptions } from "@/types"
import clsx from "clsx"


const ProductCard = ({ product, username, options }: { product: Partial<IProduct>, username?: string, options: ProductOptions }) => {
    if (!product) {
        return <div>Faltu ka call kiu kar raha</div>;
    }

    options.hz = options.hz || false

    return (<Card className={
        clsx("flex", "overflow-hidden", "relative", !options.hz && "md:flex-col")
    }>
        <CardHeader className="p-0">
            <Link href={`/product/${product.slug}`}
                className={clsx("relative aspect-square md:aspect-square blur-animation h-full",

                    !options.hz ? "md:w-full" : "md:h-full",
                    !options.hz ? "md:h-auto" : "md:w-auto"
                )}
            >
                <Image
                    src={product.thumbnail!}
                    alt={product.title! || "no title"}
                    layout="fill"
                    objectFit="cover"
                    className=""
                />
            </Link>
        </CardHeader>
        <div className="h-full w-full flex flex-col justify-between">

            <CardFooter className="flex justify-between items-center py-1 px-2 min-h-4 bg-slate-50 dark:bg-primary/10">
                <Link href={`/product/${product.slug}`}>
                    <div className="flex items-center">
                        <IndianRupee className="w-4" />
                        <span className="font-bold">
                            {product?.price?.toLocaleString('en-IN')}
                        </span>
                    </div>
                </Link>
                <div className="bg-white/40 hover:bg-white h-8 w-8 flex items-center justify-center overflow-hidden rounded-full">
                    <ProductShareAction product={product} />
                </div>

            </CardFooter>
        </div>
        <div className="absolute top-2 right-2 bg-white h-8 w-8 flex items-center justify-center overflow-hidden rounded-full">
            <ProductActionDropdown product={product} username={username + ""} options={options} />
        </div>
    </Card>);
}

export default ProductCard;