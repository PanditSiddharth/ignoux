"use client"
import SellerSidebarContents from "./seller-sidebar-contents";
const Sidebar = () => {
    return (
        <div className={`w-full h-full flex flex-col justify-center  text-secondary-foreground/80 p-4`} >
            <SellerSidebarContents />
        </div>
    )
}

export default Sidebar