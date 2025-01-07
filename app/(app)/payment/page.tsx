"use client"
import { redirect } from 'next/navigation'
const page = (props:any) => {
console.log(props.searchParams)
 
 return <div className='flex items-center justify-center h-screen'>
    <button onClick={()=> redirect(props?.searchParams?.url)}>Proceed for Payment</button>
 </div>
}

export default page