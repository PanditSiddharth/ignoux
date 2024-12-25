"use client"
import { redirect } from 'next/navigation'
// eslint-disable-next-line 
const page = (props:any) => {
console.log(props.searchParams)
 return redirect(decodeURIComponent(props?.searchParams?.url))
}

export default page