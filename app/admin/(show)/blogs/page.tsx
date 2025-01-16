"use client"
import { BlogCard } from '@/components/Cards'
import Scroll from '@/components/infinite-scroll'
import { IBlog } from '@/modals/blog.model'
import { getBlogs } from '@/server-functions/blog'
import { useDataStore } from '@/store'

const Blogs = () => {
  const pd = useDataStore<IBlog[]>("blogs", [])()

  const next = async () => {
    console.log("fetching...")
    console.log(pd.data.length)
    const p = await getBlogs({ skip: pd?.data.length, postsPerPage: 10 })
    console.log(p)

    if ("error" in p) return console.error(p.error)
    pd.setTotalLength(p.totalBlogs || 0)
    pd.setData([...pd.data, ...p.blogs])
  }

  return (
    <div className="max-w-6xl mx-auto px-2">

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold">Our Blogs</h1>
        </div>
      </section>
      <Scroll
        data={pd.data || []}
        next={next}
        className2='grid-cols-1 md:grid-cols-3 lg:grid-cols-3'
        totalLength={pd.totalLength}
        element={(blog, index) => (
          <BlogCard title={blog.title} slug={blog.category[0] + "/" + blog.slug}
            description={blog.description}
            image={blog.thumbnail}
            date={new Date(blog.publishedAt as any).toLocaleDateString()}
            key={index}
          />
        )}
      />

    </div>
  )
}

export default Blogs;
