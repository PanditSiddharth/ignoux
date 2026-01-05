"use client"
import { CourseCard } from '@/components/Cards'
import Scroll from '@/components/infinite-scroll'
import Loader from '@/components/loader'
import { ICourse } from '@/modals/course.model'
import { getCourses } from '@/server-functions/course'
import { useDataStore } from '@/store'
import { useEffect, useState } from 'react'

const Courses = () => {
  const pd = useDataStore<ICourse[]>("courses", [])()
  const [loading, setLoading] = useState(true)

useEffect(()=> {setLoading(false)}, [])

  const next = async () => {
    console.log("fetching...")
    console.log(pd.data.length)
    const p = await getCourses({ skip: pd?.data.length, postsPerPage: 10 })
    console.log(p)
    if ("error" in p) return console.error(p.error)
    pd.setTotalLength(p.totalCourses || 0)
    pd.setData([...pd.data, ...p.courses])
  }

  if(loading) return <Loader />

  return (
    <div className="mx-auto max-w-6xl">
      <section className="relative bg-[#fff]/10 border backdrop-blur-[50px] mx-auto py-10 mt-8">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold font-sans">Our Courses</h2>
          <p className="mt-4 text-lg font-sans">
          Discover insights, tips, and guides on coding, BCA, and more to help you excel in your learning journey.

          </p>
        </div>
      </section>

      <Scroll
        data={pd.data || []}
        next={next}
        className2='grid-cols-1 md:grid-cols-3 lg:grid-cols-3 max-w-screen mt-4'
        totalLength={pd.totalLength}
        element={(course, index) => (
          <CourseCard title={course.title} slug={"/course/" + course.slug}
            description={course.description}
            image={course.thumbnail}
            price={course.price}
            key={index}
          />
        )}
      />

    </div>
  )
}

export default Courses;
