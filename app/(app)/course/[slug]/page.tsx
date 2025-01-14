"use client"
import { CourseCard } from '@/components/Cards'
import Loader from '@/components/loader'
import { ICourse } from '@/modals/course.model'
import { getCourse } from '@/server-functions/course'
import { useDataStore } from '@/store'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Course = ({ params }: { params: Promise<any> }) => {
  const pd = useDataStore<ICourse | undefined>("course", undefined)()
  const prs = React.use(params)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (prs && prs.slug) {
      console.log(prs)
      getCourse(prs.slug, { blogs: true }).then(course => {
        console.log(course, "course")
        setLoading(false)
        if (typeof course == "object" && "error" in course) return
        pd.setData(course as ICourse)
      })
    }
  }, [prs])

  if (loading) return <Loader />

  if (!pd || !pd.data || !pd.data.title) return <div className='fixed inset-0 flex items-center justify-center'>
    Not Found</div>

  return (
    <div className='flex flex-col md:flex-row'>
      <div className="w-[8%]">

      </div>
      {/* this will be container of blured */}
      <div className='md:w-[30%] py-6'>
        {/* this is image */}
        <BlurredImageCard title={pd.data.title!} slug={"/course/" + pd.data?.slug}
          description={pd.data.description}
          image={pd.data.thumbnail}
          price={pd.data.price}
        />
      </div>
      <div className='flex-1 min-h-screen py-6'>
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
            <div className='px-2'>
              <div className='text-lg'>{blog.title}</div>
              <div className="text-sm">{blog.description}</div>
            </div>
          </Link>))}
      </div>
    </div>
  )
}

export default Course

const BlurredImageCard = ({ title, slug, description, image, price }: any) => {
  return (
    <div className="fixed w-full h-screen pt-12" >
      <div className="absolute inset-0 bg-cover bg-center filter blur-lg opacity-50" style={{ backgroundImage: `url(${image})` }}></div>
      <div className="relative z-10 p-6 bg-white bg-opacity-75 shadow-lg rounded-lg">
        <CourseCard
          title={title}
          slug={slug}
          description={description}
          image={image}
          price={price}
        />
      </div>
    </div>
  );
};