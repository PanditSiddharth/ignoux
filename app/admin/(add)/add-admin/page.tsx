"use client"
import React from 'react'

import { useSession } from 'next-auth/react'

const Add = () => {
  const { data: session } = useSession()
  console.log(session)
  return (
    <div className='flex flex-col w-full items-center justify-center h-screen'>
      
    
    </div>
  )
}

export default Add
