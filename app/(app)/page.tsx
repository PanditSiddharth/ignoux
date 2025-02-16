"use client"

import { useEffect } from "react"
import Link from "next/link"
import { BlogCard, CourseCard } from "@/components/Cards"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { IBlog } from "@/modals/blog.model"
import type { ICourse } from "@/modals/course.model"
import { getBlogs } from "@/server-functions/blog"
import { getCourses } from "@/server-functions/course"
import { useDataStore } from "@/store"
import { BookOpen, Mail, Search } from "lucide-react"

export default function HomePage() {
  const cs = useDataStore<ICourse[]>("courses", [])()
  const bg = useDataStore<IBlog[]>("blogs", [])()

  useEffect(() => {
    try {
      const fetchData = async () => {
        const courses = await getCourses({ skip: 0, postsPerPage: 3 })
        const blogs = await getBlogs({ skip: 0, postsPerPage: 3 })

        if (typeof courses === "object" && "courses" in courses) {
          cs.setData(courses.courses)
        }
        if (typeof blogs === "object" && "blogs" in blogs) {
          bg.setData(blogs.blogs)
        }
      }
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }, [bg.setData]) // Added bg.setData to dependencies

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-16 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
       
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Explore Our Courses With Notes
                </h1>
                <p className="mx-auto max-w-[700px]">
                  Join thousands of learners and enhance your skills with our comprehensive courses.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Search blogs and courses" type="search" />
                  <Button type="submit" className="bg-black text-white blue:text-black hover:bg-black">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                </form>
              </div>
              <Link href="/courses">
                <Button className="mt-6 bg-black text-white hover:bg-black">Join Courses</Button>
              </Link>
        
          </div>
        </section>
        <section className="w-full pt-12 bg-gradient-to-t from-background to-transparent">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Popular Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {cs.data.map((course) => (
                <CourseCard
                  key={course.slug}
                  title={course.title}
                  description={course.description}
                  slug={`/course/${course.slug}`}
                  image={course.thumbnail}
                  price={course.price}
                />
              ))}
            </div>
            <Link href={"/courses"} className="w-full flex items-center justify-center pt-10">
            <Button className="mx-auto"variant="secondary">More Courses</Button>
            </Link>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-transparent">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Popular Blogs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {bg.data.map((blog) => (
                <BlogCard
                  key={blog.slug}
                  title={blog.title}
                  description={blog.description}
                  slug={`/t/${blog.category[0]}/${blog.slug}`}
                  image={blog.thumbnail}
                  date={blog.publishedAt + ""}
                />
              ))}
            </div>
            <Link href={"/blogs"} className="w-full flex items-center justify-center pt-10">
            <Button className="mx-auto"variant="secondary">More Blogs</Button>
            </Link>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="mb-8">Subscribe to our newsletter for the latest blog posts and course updates.</p>
            <form className="flex max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" className="rounded-r-none" />
              <Button type="submit" className="rounded-l-none">
                <Mail className="mr-2 h-4 w-4" /> Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}


