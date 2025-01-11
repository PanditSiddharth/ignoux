import Image from 'next/image'
import Link from 'next/link'
// import Link from 'next/link'
import React from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'

interface IBlogCard {
    title: string,
    image: string,
    slug: string,
    date: string,
    description: string,
}

export const BlogCard = ({ title, image, slug, date, description }: IBlogCard) => {
    return (
        <Card
            className=""
        >
        <div className="relative" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
            <Image
                src={image}
                alt={title}
                layout="fill"
                objectFit="cover"
            />
        </div>

            <div className="p-6">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="mt-2">{description}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-sm">{date}</span>
                    <Link
                        href={"/t/" + slug}
                        className="px-4 py-2 rounded transition-colors"
                    ><Button variant={"secondary"}>
                        Read More
                    </Button>
                    </Link>
                </div>
            </div>
        </Card>
    )
}