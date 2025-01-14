"use client"
import React, { useEffect, useState } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useTheme } from 'next-themes';
import { useDataStore } from '@/store';
import { IBlog } from '@/modals/blog.model';
import { getBlog } from '@/server-functions/blog';
import { toast } from 'react-toastify';
import Loader from '@/components/loader';

export default function Blog(props: any) {
  const { theme, systemTheme } = useTheme();
  const bg = useDataStore<Partial<IBlog> | undefined>("blog", undefined)()
  const params = React.use(props.params) as any

  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchBlog = async () => {
        console.log(params)
          const blog = await getBlog(params?.blog, params?.slug);
          if ("error" in blog) {
              toast.error(blog.error);
          } else {
              bg.setData(blog);
          }
          setLoading(false);
      };
      if(loading)
      fetchBlog();
  }, [params?.blog, bg, loading]);

  if (loading) return <Loader />

  if(!bg || !bg.data) return <div className='fixed inset-0 flex items-center justify-center'>
    Not Found</div>
  return (
    <div className='p-4'
     data-color-mode={["dark", "blue"].includes((theme == "system" ? systemTheme : theme) as string) ? "dark" : "light"} >
      <MarkdownPreview
        className='p-4 max-w-4xl mx-auto'
        source={bg?.data?.content}
        rehypeRewrite={(node, index, parent) => {
          if ((node as any).tagName === "a" && parent && /^h(1|2|3|4|5|6)/.test((parent as any).tagName)) {
            parent.children = parent.children.slice(1)
          }
        }}
      />
    </div>

  );
}