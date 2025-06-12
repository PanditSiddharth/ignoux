"use client"
import { NavbarDropdown } from './navbar-dropdown';
import { ModeToggle } from '@/components/mode-toggle';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter()

    return (
<<<<<<< HEAD
        <header className="body-font bg-background shadow-sm backdrop-filter backdrop-blur-lg opacity-90 sticky z-50 top-0 h-16 items-center justify-between px-2 md:px-7 flex w-full antialiased">
            <h1 onClick={() => { router.push("/") }} className={"text-2xl font-semibold cursor-pointer"}>IGNOUX</h1>
            <div className="flex items-center gap-2">
                <NavbarDropdown />
                <ModeToggle />
=======
        <header className="sticky top-0 w-full p-4 backdrop-blur-md z-50">
            <div className='flex container mx-auto justify-between items-center max-w-7xl'>

                <h1 onClick={() => { router.push("/") }} className={"text-2xl font-semibold cursor-pointer"}>IGNOUX.in</h1>
                <div className="flex items-center gap-2">
                    <NavbarDropdown />
                    <ModeToggle />
                </div>
>>>>>>> 3358e3341608b44564e2b98572a786d8f77192d5
            </div>
        </header>
    )
}

export default Navbar