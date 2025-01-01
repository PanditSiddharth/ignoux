"use client"
import useProductsStore from "@/hooks/use-products";
import { useEffect, useState, useTransition } from "react";
import { BarLoader } from "react-spinners";
import ProductCard from "@/components/product/product-card";
import InfiniteScroll from 'react-infinite-scroll-component'
import { cn } from "@/modals/utils";
import { ProductOptions } from "@/types";
import clsx from "clsx";
import { Input } from "../ui/input";
import { RxCross2 } from "react-icons/rx";
import { categoriesObject } from "@/modals/data";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { getOrder } from "@/server-functions/product";
import { showTransactionDetails } from "../others/transaction-details";
import { usePathname, useRouter } from "next/navigation";

interface ProductsListProps {
    username?: string,
    options: ProductOptions
}
const ProductsList = ({ username, options }: ProductsListProps) => {
    options = options || {};
    options.list = options?.list || {
        xs: 1,
        sm: 3,
        md: 4,
        lg: 5,
    }

    const { getProducts, products, page, increasePage, totalProducts } = useProductsStore();
    const [loading, setTransition] = useTransition()
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")
    const [tempSearch, setTempSearch] = useState("")
    const pathname = usePathname()
    const router = useRouter()
    useEffect(() => {
        if (options.boughtProducts && options.transactionId) {
            getOrder(options.transactionId)
                // eslint-disable-next-line
                .then((order: any) => {
                    router.push("/" + username + "/bought-products?tid=" + options.transactionId);
                    showTransactionDetails(order, pathname)
                })
        }
        // eslint-disable-next-line
    }, [])

    const handelScroll = () => {
        getProducts({ page: page + 1, username, postsPerPage: 10, boughtProducts: options.boughtProducts, search, category }, true);
        increasePage()
    }

    useEffect(() => {
        setTransition(async () => {
            await getProducts({
                page: 1, username, postsPerPage: 10,
                boughtProducts: options.boughtProducts,
                category,
                search
            });

        })
        // eslint-disable-next-line 
    }, [getProducts, search, category])

    useEffect(() => {
        setTransition(async () => {
            await getProducts({ page: 1, username, postsPerPage: 10, boughtProducts: options.boughtProducts, category, search });
        })
        // eslint-disable-next-line 
    }, [getProducts, username])

    const searchElement = <div className="flex gap-2 flex-col md:flex-row px-2 md:px-4 max-w-3xl">
        <div className="flex w-full">
            <div className="relative">
                {search ? <RxCross2 className="absolute h-4 left-2 top-3 cursor-pointer" onClick={() => { setTempSearch(""); setSearch("") }} /> :
                    <Search className="absolute h-4 left-2 top-2.5 cursor-pointer" onClick={() => setSearch(tempSearch)} />}
            </div>
            <Input placeholder="Search Products " className="pl-8 rounded-lg" value={tempSearch} onChange={e => setTempSearch(e.target.value)} />
            <div className="relative">
                <Button className="absolute right-0 bg-slate-400 rounded-l-none dark:text-gray-100 dark:bg-gray-800" onClick={() => setSearch(tempSearch)}>Search</Button>
            </div>
        </div>

        <select
            className="flex h-9 w-full rounded-lg border border-input dark:bg-gray-950 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            onChange={e => { setCategory(e.target.value) }} value={category}>

            {Object.entries({ "": "Select Categories (default all categories)", ...categoriesObject }).map(([key, value]) => (
                <option key={key} value={key}>
                    {value}
                </option>
            ))
            }
        </select>
    </div>

    if (loading) {
        return (
            <div className="w-full">
                {!options.boughtProducts && searchElement}
                <div className="flex flex-1  justify-center items-center h-64">
                    <BarLoader color="#36d7b7" />
                </div>
            </div>
        )
    }
    if (!products || products.length === 0) {
        return (
            <div className="w-full">
                {!options.boughtProducts && searchElement}
                <div className="flex flex-1  justify-center items-center h-64">
                    <p>No products found</p>
                </div>
            </div>
        )
    }
    const list = options.list
    const arr = {
        sm: ['sm:grid-cols-1', 'sm:grid-cols-2', 'sm:grid-cols-3'],
        md: ['md:grid-cols-1', 'md:grid-cols-2', 'md:grid-cols-3', 'md:grid-cols-4', 'md:grid-cols-5'],
        lg: ['lg:grid-cols-1', 'lg:grid-cols-2', 'lg:grid-cols-3', 'lg:grid-cols-4',
            'lg:grid-cols-5', 'lg:grid-cols-6', 'lg:grid-cols-7']
    }

    return (
        <div className="w-full">
            {!options.boughtProducts && searchElement}
            <InfiniteScroll
                dataLength={products.length}
                next={handelScroll}
                className={cn('w-full flex flex-col justify-center items-center pb-5')}
                hasMore={products.length < totalProducts}
                loader={
                    <BarLoader color="#36d7b7" />
                }>
                <div className={clsx(
                    'grid gap-4 w-full p-2 md:p-4 grid-cols-1',
                    arr['sm'][list.sm - 1],  // Small screens
                    arr['md'][list.md - 1],  // Medium screens
                    arr['lg'][list.lg - 1],  // Large screens
                )}>
                    {
                        products.map((product, index) => (
                            <ProductCard key={index} product={product} username={username} options={options} />
                        ))
                    }

                </div>
            </InfiniteScroll>
        </div>

    )
}
export default ProductsList;