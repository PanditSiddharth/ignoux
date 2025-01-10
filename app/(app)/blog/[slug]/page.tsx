"use client"
import React, { useEffect } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useTheme } from 'next-themes';
import { useDataStore } from '@/store';
import { IBlog } from '@/modals/blog.model';
import { getBlog } from '@/server-functions/blog';

export default function Blog(props: any) {
  const { theme } = useTheme();
  const bg = useDataStore<Partial<IBlog> | undefined>("blog", undefined)()
  const params = React.use<{slug: string}>(props.params)
  useEffect(() => {
    if(params?.slug){
      getBlog(params?.slug)
      .then(blog => {
        console.log(blog)
        if("error" in blog)
          return 
        bg.setData(blog)
        })
    }
  }, [params])

  return (
    <div className='p-4'
     data-color-mode={theme || "dark"} >
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