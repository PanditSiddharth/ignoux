import Image from 'next/image'
import Link from 'next/link'
// import Link from 'next/link'
import React from 'react'

interface IBlogCard {
    title: string,
    image: string,
    slug: string,
    date: string,
    description: string,
}

export const BlogCard = ({ title, image, slug, date, description }: IBlogCard) => {
    return (
        <div
            className="shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
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
                        href={"/blog/" + slug}
                        className="px-4 py-2 rounded transition-colors"
                    >
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    )
}