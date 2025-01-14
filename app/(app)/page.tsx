"use client"
import { BlogCard, CourseCard } from "@/components/Cards";
import { Button } from "@/components/ui/button";
import { IBlog } from "@/modals/blog.model";
import { ICourse } from "@/modals/course.model";
import { getBlogs } from "@/server-functions/blog";
import { getCourses } from "@/server-functions/course";
import { useDataStore } from "@/store";
import Link from "next/link";
import { useEffect } from "react";

export default function HomePage() {
  const cs = useDataStore<ICourse[]>("courses", [])()
  const bg = useDataStore<IBlog[]>("courses", [])()

  useEffect(() => {
    try {
      const fetchData = async () => {
        const courses = await getCourses({ skip: 0, postsPerPage: 3 })
        const blogs = await getBlogs({ skip: 0, postsPerPage: 3 })
        if(Array.isArray(courses)){
          cs.setData(courses)
        }
        if(Array.isArray(blogs)){
          bg.setData(blogs)
        }
      }
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }, [])
  return (
    <div className="max-w-6xl mx-auto px-2">
      {/* Hero Section */}
      <section
        className="relative bg-[#fff]/10 border w-4xl
       backdrop-blur-[50px] mx-auto py-10 md:mt-4
       bg-gradient-to-t from-transparent to-background
       ">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold font-sans">Learn Programming & Development</h2>
          <p className="mt-4 text-lg font-sans">
            Join thousands of learners and start your coding journey with free tutorials and resources.
          </p>
          <Link href={'/courses'} ><Button className="mt-6">
            Join Courses
          </Button>
          </Link>
        </div>
      </section>

      {/* Courses Section */}
      <section
        className="relative bg-[#fff]/10 border w-4xl
       backdrop-blur-[50px] mx-auto py-10 mt-2 md:mt-4
       bg-gradient-to-t from-background to-transparent
       ">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center">Popular Courses</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {cs.data.map((course) => (
            <CourseCard title={course.title} description={course.description} slug={course.slug} image={course.thumbnail} key={course.slug} price={course.price} />
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section
        className="relative bg-[#fff]/10 border w-4xl
       backdrop-blur-[50px] mx-auto py-10 mt-2 md:mt-4
       bg-gradient-to-t from-transparent to-background
       ">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center">Popular blogs</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {bg.data.map((blog) => (
             <BlogCard title={blog.title} description={blog.description} slug={blog.slug} image={blog.thumbnail} key={blog.slug} date={blog.publishedAt + ""} />
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
