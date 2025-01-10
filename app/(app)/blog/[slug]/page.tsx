"use client"
import React, { useEffect } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useTheme } from 'next-themes';
import { useDataStore } from '@/store';
import { IBlog } from '@/modals/blog.model';
import { getBlog } from '@/server-functions/blog';

const source = `
\`\`\`js {2}
function () {
  console.log('hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello')
}
\`\`\`
\`\`\`js {2}
function () {
  console.log('hello ')
}
\`\`\`

# Hello Markdown Preview

This is a markdown preview component.

## Usage
`;

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
    <div className='flex flex-col items-center' data-color-mode={theme || "dark"} >
      <MarkdownPreview
        className='max-w-4xl'
        source={bg?.data?.content}
        style={{ padding: 16 }}
        rehypeRewrite={(node, index, parent) => {
          if ((node as any).tagName === "a" && parent && /^h(1|2|3|4|5|6)/.test((parent as any).tagName)) {
            parent.children = parent.children.slice(1)
          }
        }}
      />
    </div>

  );
}