"use client"
import { NavbarDropdown } from './navbar-dropdown';
import { ModeToggle } from '@/components/mode-toggle';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter()

    return (
        <header className="sticky top-0 w-full p-4 backdrop-blur-md z-50">
            <div className='flex container mx-auto justify-between items-center max-w-7xl'>

                <h1 onClick={() => { router.push("/") }} className={"text-2xl font-semibold cursor-pointer"}>Ashirwad Balaji</h1>
                <div className="flex items-center gap-2">
                    <NavbarDropdown />
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}

export default Navbar