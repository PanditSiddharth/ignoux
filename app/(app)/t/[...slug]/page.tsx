"use client"
import React, { useEffect, useState } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useTheme } from 'next-themes';
import { useDataStore } from '@/store';
import { IBlog } from '@/modals/blog.model';
import { getBlog } from '@/server-functions/blog';
import { toast } from 'react-toastify';
import Loader from '@/components/loader';
import rehypeHighlight from "rehype-highlight";
import { cn } from '@/modals/utils';
import dynamic from 'next/dynamic';


export default function Blog(props: any) {

  const { theme } = useTheme();
  const bg = useDataStore<Partial<IBlog> | undefined>("blog", undefined)()
  const params = React.use<{ slug: string[] }>(props.params)
  const [loading, setLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">("light")


  useEffect(() => {
    if (theme && ["dark", "blue"].includes(theme)) {
      setCurrentTheme("dark")
    }
    else
      setCurrentTheme("light")
  }, [theme])

  const ThemeComponent = React.useMemo(
    () => {
      if (currentTheme == "dark") {
        return (
          dynamic(() => import("@/components/themes/GithubDark"), {
            ssr: false,
          })
        )
      }
      else
        return (
          dynamic(() => import("@/components/themes/Github"), {
            ssr: false,
          })
        )
    }, [currentTheme]
  )


  useEffect(() => {
    const fetchBlog = async () => {
      const blog = await getBlog({
        slug: params?.slug[1],
        category: params?.slug[0]
      });
      if ("error" in blog) {
        toast.error(blog.error);
      } else {
        bg.setData(blog);
      }
      setLoading(false);
    };
    if (loading)
      fetchBlog();
  }, [params?.slug, bg, loading]);

  if (loading) return <Loader />

  if (!bg || !bg.data) return <div className='fixed inset-0 flex items-center justify-center'>
    Not Found</div>

  const pv = <MarkdownPreview
    style={{
      backgroundColor: currentTheme == "dark" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)",
      fontFamily: "sans-serif"
    }}
    rehypePlugins={[rehypeHighlight]}
    className={cn('p-4 max-w-4xl mx-auto')}
    source={bg?.data?.content}
  />
  console.log(currentTheme)
  return (

    <div className='p-4'
      data-color-mode={currentTheme}>
      <ThemeComponent>
        {pv}
      </ThemeComponent>

    </div>

  );
}