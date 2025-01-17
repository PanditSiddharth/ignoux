"use client"
import { useDataStore } from '@/store'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin, FaTelegram, FaYoutube } from 'react-icons/fa'

const Footer = () => {
const [isMounted, setIsMounted] = useState(false);
const ft = useDataStore<boolean>("footer", true)();

useEffect(() => {
  setIsMounted(true);
}, []);

if (!isMounted) return null;

return (
  ft?.data && <div className='max-w-6xl mx-auto px-2'>
              {/* Footer */}
      <footer className="py-8">
        <div className="container mx-auto text-center">
          <h3 className="text-lg font-bold">Follow Us</h3>
          <div className="mt-4 flex justify-center space-x-6">
           <Link target="_blank" href={"https://youtube.com/ignouStudyCenter"}>
            <FaYoutube className="text-2xl hover:text-red-600 cursor-pointer" />
           </Link>
           <Link target="_blank" href={"https://telegram.me/ignou_Study_Channel"}>
            <FaTelegram className="text-2xl hover:text-blue-700 cursor-pointer" />
           </Link>
           <Link target="_blank" href={"https://github.com/panditsiddharth"}>
            <FaGithub className="text-2xl hover:text-black cursor-pointer" />
           </Link>
           <Link target="_blank" href={"https://linkedin.com/in/sidsharma0"}>
            <FaLinkedin className="text-2xl hover:text-blue-600 cursor-pointer" />
           </Link>
          </div>
          <p className="mt-4 text-gray-400">© 2024 IGNOUX.in. All rights reserved.</p>
        </div>
      </footer>
    </div> 
  )
}

export default Footer