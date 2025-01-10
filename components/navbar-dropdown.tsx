"use client"
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FaUserCircle } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggleMobile } from "@/components/mode-toggle";
import { useSession } from "next-auth/react";

export const NavbarDropdown = () => {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const navigations = [
        { name: "Home", href: "/" },
        { name: "Courses", href: "/courses" },
        { name: "Blogs", href: "/blogs" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" }
    ];

    const user = session?.user;

    // State to track if the dropdown is open
    const [isOpen, setIsOpen] = useState(false);

    // Function to close dropdown after navigation
    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage className="rounded-full border-4" src={user?.image} alt={`@${user?.username}`} />
                    <AvatarFallback><FaUserCircle className="w-7 h-7 opacity-80" /></AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-2">
     
                <DropdownMenuLabel>Navigate</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {navigations.map((navItem, index) => (
                        <DropdownMenuItem key={index} className={`${pathname == navItem.href && 'bg-primary/5'}`}>
                            <Link href={navItem.href} className="w-full" onClick={handleLinkClick}>
                                {navItem.name}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>

                {status === 'unauthenticated' && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Join</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Link href="/auth" className="w-full" onClick={handleLinkClick}>
                                    Sign In
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </>
                )}
                <div className="lg:hidden w-full">
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Settings</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <ModeToggleMobile />
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
