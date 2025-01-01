
import { CopyIcon, Facebook, Twitter, Linkedin } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/modals/utils";
import { FaWhatsapp } from "react-icons/fa";
import { shareLinks } from "@/modals/data";
import { IProduct } from "@/modals/product.model";
import Link from "next/link";
import { toast } from "react-toastify";
function ShareIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
        >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>

    )
}

export default function ProductShareAction({ product }: { product: IProduct }) {
    const url = "https://eecm.vercel.app/product/" + product.slug
    const options = [
        {
            name: "Facebook",
            icon: Facebook,
            url: shareLinks(product.name, product.slug as string).facebook,
        },
        {
            name: "Twitter",
            icon: Twitter,
            url: shareLinks(product.name, product.slug as string).twitter,
        }
        , {
            name: "Whatsapp",
            icon: FaWhatsapp,
            url: shareLinks(product.name, product.slug as string).whatsapp,
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            url: shareLinks(product.name, product.slug as string).linkedin,
        },
        {
            name: "Copy Link",
            icon: CopyIcon,
            url: url
        }
    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" aria-label="Open menu" className={cn("h-[95%] p-1 hover:bg-gray-300 bg-gray-200 dark:bg-gray-800 text-gray-500 outline-none border-none  focus-visible:ring-0")}>
                    <ShareIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top">
                {options.map((option) => (
                    <DropdownMenuItem key={option.name} className="w-full" >
                        {option.name == 'Copy Link' ? <div className="w-full flex" onClick={() => {
                            navigator.clipboard.writeText(url);
                            toast.success("Link copied to clipboard!")
                        }}>
                            <option.icon className="mr-2 h-4 w-4" />
                            <span>{option.name}</span>
                        </div> : <Link href={option.url} target="_blank" className="w-full flex">
                            <option.icon className="mr-2 h-4 w-4" />
                            <span>{option.name}</span>
                        </Link>}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
