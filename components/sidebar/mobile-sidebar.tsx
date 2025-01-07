"use client"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon, User } from "lucide-react"
import Sidebar from "./sidebar"
const routes = [
    {
        label: "Courses",
        icon: User,
        route: `/courses`
    },
]
export function ProfileMobileSidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <MenuIcon className="h-6 w-6 lg:hidden" />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="h-full">
                    <Sidebar routes={routes} />
                </div>
            </SheetContent>
        </Sheet>
    )
}
