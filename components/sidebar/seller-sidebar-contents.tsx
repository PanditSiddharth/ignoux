"use client"
import { LineChart, Package, Plus, Settings, User, PanelTopIcon } from "lucide-react";
import { useSession } from 'next-auth/react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import Loader from "../others/loader";

const SellerSidebarContents = () => {
    const { data: session, status } = useSession()
    const user = session?.user
    const pathname = usePathname()
    const profileUser = pathname.split("/")[1]?.replace("@", "")
    const visitor = user?.username
    const routes = [
        {
            label: "Profile",
            icon: User,
            route: `/@${profileUser}`
        },
        {
            label: "Products",
            icon: Package,
            route: `/@${profileUser}/products`
        },
        {
            label: "Purchased Products",
            icon: Package,
            route: `/@${profileUser}/bought-products`
        },
        {
            label: "Add Products",
            icon: Plus,
            route: `/@${profileUser}/products/add`
        },
        {
            label: "Analytics",
            icon: LineChart,
            route: `/@${profileUser}/analytics`
        }
        , {
            label: "Settings",
            icon: Settings,
            route: `/@${profileUser}/settings`
        },
        {
            label: "Admin Pannel",
            icon: PanelTopIcon,
            route: `/@${profileUser}/admin`
        }
    ]

    if (session?.user.username == profileUser) {
        if (session?.user.role != "admin")
            delete routes[6]
    } else if (session?.user.role == 'admin') {
        delete routes[3] // add product
        delete routes[5] // settings
        delete routes[6] // admin pannel
    } else {
        delete routes[2] // purchased product
        delete routes[3] // add product
        delete routes[4] // analytics
        delete routes[5] // settings
        delete routes[6] // admin pannel
    }

    if (status === "loading") {
        return <div className="flex-1 flex items-center justify-center"><Loader /></div>
    }

    return (
        <div className="flex flex-col justify-between items-center h-full">
            <div className="w-full h-full flex  font-semibold flex-col gap-1">
                {routes.map((route, index) => (
                    <Link href={route.route} key={index} className={`w-full h-12 flex items-center cursor-pointer justify-start pl-3 hover:bg-primary/5 ${pathname === route.route && "bg-primary/5"}  rounded-md`}>
                        <route.icon className="w-6 h-6" />
                        <p className="ml-2">{route.label}</p>
                    </Link>
                ))}
            </div>
            <Link href={`/${visitor ? `@${visitor}` : 'auth'}/`} className={`w-full h-12 flex items-center cursor-pointer justify-between px-3 bg-primary/50 hover:bg-primary/60 text-secondary-foreground rounded-md`}>
                <p className="ml-2">My Profile</p>
                <div className={`w-8 h-8 rounded-full  flex items-center justify-center "bg-primary/80 hover:bg-primary/90"`}>
                    <User className="w-4 h-4" />
                </div>
            </Link>
        </div>
    );
}

export default SellerSidebarContents;