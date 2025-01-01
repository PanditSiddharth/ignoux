"use client"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import Sidebar from "./sidebar"

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
                    <Sidebar  />
                </div>
            </SheetContent>
        </Sheet>
    )
}
