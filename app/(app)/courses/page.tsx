"use client"
import { BlogCard } from '@/components/Cards'
import Scroll from '@/components/infinite-scroll'
import { ICourse } from '@/modals/course.model'
import { getCourses } from '@/server-functions/course'
import { useDataStore } from '@/store'

const Courses = () => {
  const pd = useDataStore<ICourse[]>("courses", [])()

  const next = async () => {
    console.log("fetching...")
    console.log(pd.data.length)
    const p = await getCourses({ skip: pd?.data.length, postsPerPage: 10 })
    console.log(p)

    if ("error" in p) return console.error(p.error)
    pd.setTotalLength(p.totalCourses || 0)
    pd.setData([...pd.data, ...p.courses])
  }

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold">Our Courses</h1>
          <p className="mt-4 text-lg">
            Discover insights, tips, and guides on coding, BCA, and more to help you excel in your learning journey.
          </p>
        </div>
      </section>
      <Scroll
        data={pd.data || []}
        next={next}
        className2='grid-cols-1 md:grid-cols-3 lg:grid-cols-4 max-w-screen'
        totalLength={pd.totalLength}
        element={(course, index) => (
          <BlogCard title={course.title} slug={course.slug}
            description={course.description}
            image={course.thumbnail}
            date={new Date(course.publishedAt as any).toLocaleDateString()}
            key={index}
          />
        )}
      />
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} ignoux.in. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  )
}

export default Courses;
