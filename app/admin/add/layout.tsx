"use client";
import { useRouter } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JSX } from "react";
import { ModeToggle } from "@/components/mode-toggle";

function AddRootPage({ children }: { children: JSX.Element }) {
    const router = useRouter();

    const handleTabChange = (value: string) => {
        const routes = {
            product: "/admin/add/product",
            blog: "/admin/add/blog",
            course: "/admin/add/course",
            admin: "/admin/add"
        }
        router.push(routes[value as "product"]);
    };

    return (
        <div className="w-full">
            <Tabs defaultValue="product" onValueChange={handleTabChange} className="w-[400px]">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="product">Add Product</TabsTrigger>
                    <TabsTrigger value="blog">Add Blog</TabsTrigger>
                    <TabsTrigger value="course">Add Course</TabsTrigger>
                    <TabsTrigger value="admin">Add Admin</TabsTrigger>
                </TabsList>

            </Tabs>
            <div className="w-full">
                {children}
            </div>
            <div className="fixed bottom-1 lg:left-74">
                <ModeToggle />
            </div>
        </div>
    );
}

export default AddRootPage;