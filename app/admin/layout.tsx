"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/sidebar";
import { ReactNode } from "react";
import { LineChart, Package, Plus, Settings, PanelTopIcon } from "lucide-react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ModeToggle } from "@/components/mode-toggle";

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
            label: "View",
            icon: Package,
            route: `/admin/courses`,
        },
        {
            label: "Add",
            icon: Plus,
            route: `/admin/add-blog`,
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
                  <div className="fixed bottom-1 lg:left-74">
                           <ModeToggle />
                       </div>

            <div className="lg:pl-72 w-full">{children}</div>
       
       </div>
        </ThemeProvider>
    );
}
