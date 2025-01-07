"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/sidebar";
import { ReactNode } from "react";
import { LineChart, Package, Plus, Settings, User, PanelTopIcon } from "lucide-react";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function ProfileLayout({ children }: { children: ReactNode }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const routes = [
        {
            label: "Admin Panel",
            icon: PanelTopIcon,
            route: `/admin`,
        },
        {
            label: "Users",
            icon: User,
            route: `/admin/users`,
        },
        {
            label: "Products",
            icon: Package,
            route: `/admin/products`,
        },
        {
            label: "Blogs",
            icon: Package,
            route: `/admin/blogs`,
        },
        {
            label: "Courses",
            icon: Package,
            route: `/admin/blogs`,
        },
        {
            label: "Add",
            icon: Plus,
            route: `/admin/add`,
        },
        {
            label: "Analytics",
            icon: LineChart,
            route: `/products/analytics`,
        },
        {
            label: "Tools",
            icon: Settings,
            route: `/products/tools`,
        },
    ];

    const themeOptions = {
        // attribute: "class",
        defaultTheme: "dark",
        enableSystem: true,
        disableTransitionOnChange: true,
    };

    if (!isMounted) {
        return null; // Prevent rendering until hydration is complete
    }

    return (
        <ThemeProvider {...themeOptions} attribute={"class"}>
            <div>
            <div className="w-72 z-40 fixed hidden lg:bg-primary/5 lg:block top-0 left-0 pt-4 h-screen">
                <div className="flex flex-col justify-between h-full">
                    <div className="font-bold text-sky-700 pl-6 text-2xl pb-3">IGNOUX.in</div>
                    <Sidebar routes={routes} />
                </div>
            </div>
            <div className="lg:pl-72 w-full">{children}</div>
       
       </div>
        </ThemeProvider>
    );
}
