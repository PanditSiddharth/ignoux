"use client"
import { BlogCard, CourseCard } from '@/components/Cards'
import Loader from '@/components/loader'
import { ICourse } from '@/modals/course.model'
import { getCourse } from '@/server-functions/course'
import { useDataStore } from '@/store'
import { Book, BookAIcon, Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiLogoShopify } from 'react-icons/bi'

const Course = ({ params }: { params: Promise<any> }) => {
  const pd = useDataStore<ICourse | undefined>("course", undefined)()
  const ft = useDataStore<boolean>("footer", false)()
  const prs = React.use(params)
  const [loading, setLoading] = useState(true)
useEffect(() =>{ft.setData(false)}, [])

  useEffect(() => {
    if (prs && prs.slug) {
      console.log(prs)
      getCourse(prs.slug, { blogs: true }).then(course => {
        console.log(course, "course")
        setLoading(false)
        if (typeof course == "object" && "error" in course) return
        pd.setData(course as ICourse)
        // pd.setData({
        //   ...course,
        //   content: [...course.content!, ...course.content!, ...course.content!, 
        //     ...course.content!, ...course.content!
        //   ]
        // } as ICourse)
      })
    }
  }, [prs])

  if (loading) return <Loader />

  if (!pd || !pd.data || !pd.data.title) return <div className='fixed inset-0 flex items-center justify-center'>
    Not Found</div>

  return (
    <div className='fixed z-10 overflow-y-scroll md:overflow-y-clip w-screen top-0 left-0 h-screen flex flex-col md:flex-row pt-16 space-y-3'>
      <div className="hidden md:w-[8%] place-content-start space-y-10 px-4 md:flex flex-col items-center">
        <Link href={"/"} className='flex flex-col items-center'>
          <Home />
          <div className='text-xs'>Home</div>
        </Link>
        <Link href={"/courses"} className='flex flex-col items-center'>
          <BookAIcon />
          <div className='text-xs'>Courses</div>
        </Link>
        <Link href={"/blogs"} className='flex flex-col items-center'>
          <Book />
          <div className='text-xs'>Blogs</div>
        </Link>
      </div>

      <div className='md:w-[30%] relative 
      bg-gradient-to-t from-background to-transparent'>
        {/* this is image */}
          <div className="absolute blur-md z-50" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
            <Image
              src={pd.data.thumbnail}
              alt={pd.data.title}
              layout="fill"
              objectFit="cover"
            />
        </div>

          <BlogCard
            title={pd.data.title}
            slug={pd.data.slug}
            image={pd.data.thumbnail}
            description={pd.data.description}
            component={<div></div>}
            className='mx-6 relative z-10 bg-gradient-to-b from-forground to-transparent border-none shadow-none'
            className2='bg-transparent'
          />
      </div>
      <div className='relative w-full px-4 space-y-2 pb-6 md:w-[62%] bg-gradient-to-b from-forground to-transparent md:overflow-y-scroll'>
        {pd.data?.content?.map((blog: any) => (
          <Link href={"/course/" + pd.data?.slug + "/" + blog.slug} key={blog._id} className={"flex flex-row"}>
            <div className="relative px-6 w-36 h-20" >
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className='px-2 overflow-ellipsis'>
              <div className='text-lg'>{blog.title}</div>
              <div className="text-sm overflow-ellipsis">{blog.description}</div>
            </div>
          </Link>))}
      </div>
    </div>
  )
}

export default Course