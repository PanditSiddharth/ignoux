"use client"
import { BlogCard } from '@/components/Cards'
import Scroll from '@/components/infinite-scroll'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { IBlog } from '@/modals/blog.model'
import { ICourse } from '@/modals/course.model'
import { getBlogs } from '@/server-functions/blog'
import { useDataStore } from '@/store'
import { CircleX, CrossIcon } from 'lucide-react'
import { useEffect } from 'react'

const AddBlogs = ({ onChange, value, showBlogs, setShowBlogs }: any) => {
  const slct = useDataStore<IBlog[]>("sblogs", [])()
  const pd = useDataStore<IBlog[]>("blogs", [])()
  const selectedItemsSet = new Set(slct.data.map(item => item._id));

  const handleSelectItem = (item: any) => {
    if (!selectedItemsSet.has(item._id)) {
      slct.setData([...slct.data, item]);
    }
  };
  const handleRemoveItem = (item: any) => {
    slct.setData(slct.data.filter(selectedItem => selectedItem._id !== item._id));
  };

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
    showBlogs && <div className="w-screen h-screen bg-background fixed z-50 top-0 left-0 mx-auto px-2">
      <Button type='button' className='py-3 my-4 ' onClick={e => {
        setShowBlogs(!showBlogs)
        onChange(slct.data.map((val: any) => val._id))
      }} >
        Close</Button>

      <div className='grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
        {slct?.data?.map((blog, index) => (
          <div key={blog.slug}>
            <Card className='flex h-full'>
              <div className='px-3'>
                <div>   {index + 1}   </div>
                <CircleX onClick={e => handleRemoveItem(blog)} className='text-xs size-3' />
              </div>
              <div className='text-sm line-clamp-2'>{blog.title}</div>
            </Card>
          </div>
        ))}
      </div>

      <div>Blogs select to add</div>

      <Scroll
        data={pd.data || []}
        next={next}
        className2='grid-cols-1 md:grid-cols-3 lg:grid-cols-4'
        totalLength={pd.totalLength}
        element={(blog, index) => (
          <BlogCard title={blog.title} slug={blog.category[0] + "/" + blog.slug}
            image={blog.thumbnail}
            key={index}
            component={<Button variant={"secondary"}
              onClick={e => handleSelectItem(blog)}
              type='button'>Add Blog</Button>}
          />
        )}
      />
    </div>
  )
}

export default AddBlogs;
