"use client"
import { NavbarDropdown } from '@/components/navbar-dropdown';
import { ModeToggle } from '@/components/mode-toggle';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter()

    return (
        <header className="body-font shadow-md bg-background sticky z-50 top-0 h-14 items-center justify-between px-2 md:px-7 flex w-full antialiased">
            <h1 onClick={() => { router.push("/") }} className={"text-2xl font-semibold cursor-pointer"}>IGNOUX.in</h1>
            <div className="flex items-center gap-2">
                <NavbarDropdown />
                <ModeToggle />
            </div>
        </header>
    )
}

export default Navbar