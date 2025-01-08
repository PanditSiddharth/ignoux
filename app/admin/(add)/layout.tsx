"use client";
import { usePathname, useRouter } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JSX } from "react";
// import { ModeToggle } from "@/components/mode-toggle";
import ProductCard from "@/components/product/product-card";
import { useAddProducts } from "@/store";
import { IProduct } from "@/modals/product.model";
import { ProductOptions } from "@/types";

function AddRootPage({ children }: { children: JSX.Element }) {
    const options: ProductOptions = {
        
    };
    const pathname = usePathname()

    const router = useRouter();
    const { productAdds } = useAddProducts()
    const handleTabChange = (value: string) => {
        const routes = {
            product: "/admin/add-product",
            blog: "/admin/add-blog",
            course: "/admin/add-course",
            admin: "/admin/add-admin"
        }
        router.push(routes[value as "product"]);
    };

    return (
        <div className="w-full">
            <Tabs defaultValue="product" value={pathname.split("-")[1]?.split("/")[0]?.split("?")[0]} onValueChange={handleTabChange} className="w-[400px]">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="product">Add Product</TabsTrigger>
                    <TabsTrigger value="blog">Add Blog</TabsTrigger>
                    <TabsTrigger value="course">Add Course</TabsTrigger>
                    <TabsTrigger value="admin">Add Admin</TabsTrigger>
                </TabsList>

            </Tabs>
            <div className="w-full flex md:flex-row flex-col gap-4">
                {children}
                <div className="">

                    {
                        productAdds.map((product: Partial<IProduct>) => (
                            <ProductCard key={product._id!} product={product} options={
                                options
                            } />
                        ))
                    }
                </div>
            </div>
            {/* <div className="fixed bottom-1 lg:left-74">
                <ModeToggle />
            </div> */}
        </div>
    );
}

export default AddRootPage;