"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { User } from "lucide-react";
import ProductsList from "@/components/product/products-list";
import { ProductOptions } from "@/types";
import UsersList from "@/components/user/users-lists";
import { FaProductHunt, FaUserPlus } from "react-icons/fa";

const UserProduct: React.FC = () => {
    const options: ProductOptions = {
        list: {
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
        },
        hz: true
    }

  

    return (
        <Tabs className="mb-6" defaultValue="Admin" orientation="horizontal">
            <TabsList className=" sm:gap-3 mx-2">
                <TabsTrigger value="Admin" className="flex items-center text-xs sm:text-base">
                    <FaUserPlus className="w-5 h-5 mr-2" /> Admin
                </TabsTrigger>
                <TabsTrigger value="Products" className="flex items-center text-xs sm:text-base">
                    <FaProductHunt className="w-5 h-5 mr-2" /> Products
                </TabsTrigger>
                <TabsTrigger value="Users" className="flex items-center text-xs sm:text-base">
                    <User className="w-5 h-5 mr-2 " /> Users
                </TabsTrigger>
            </TabsList> 
            <TabsContent className="mt-4 w-full p-0 mx-0" value="Users">
                <div className="flex flex-col flex-1 w-full min-h-screen">
                    <p className="text-3xl font-bold px-2 md:px-4 py-4 text-gray-500">Users List</p>
                    <UsersList options={options} />
                </div>
            </TabsContent>
            <TabsContent className="mt-4 w-full" value="Products">
                <div className="flex flex-col flex-1 w-full min-h-screen">
                    <div className="text-3xl font-bold px-2 md:px-4 py-4 text-gray-500">Products</div>
                    <ProductsList options={options} username="/@all" />
                </div>
            </TabsContent>
        </Tabs>
    );
};

export default UserProduct;