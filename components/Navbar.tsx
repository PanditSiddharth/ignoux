import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './mode-toggle'

const Navbar = () => {
    return (
        <div>
            {/* Navbar */}
            <nav className="shadow sticky top-0 z-50">
                <div className="container mx-auto px-4 flex items-center justify-between py-4">
                    <Link href={"/"}>
                    <h1 className="text-xl font-bold text-blue-600">IGNOUX</h1>
                    </Link>
                    <ul className="flex space-x-6">
                        <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
                        <li><Link href="/courses" className="hover:text-blue-600">Courses</Link></li>
                        <li><Link href="/blogs" className="hover:text-blue-600">Blogs</Link></li>
                        <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
                        <ModeToggle />
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar