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
    date?: string,
    price?: number,
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
                    <span className="text-sm">{new Date(date).toLocaleString("en")}</span>
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

export const CourseCard = ({ title, image, slug, price, description }: IBlogCard) => {
    return (
        <Card
            className="px-0 mx-0 border rounded-sm"
        >
        <div className="relative rounded-t-full border" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
            <Image
                src={image}
                alt={title}
                className='rounded-t-sm'
                layout="fill"
                objectFit="cover"
            />
        </div>

            <div className="p-6 ">
                <h2 className="text-lg font-bold">{title}</h2>
                <p className="mt-2 text-sm">{description}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="">{price == 0 ? 
                        <div className='text-green-600'>
                        FREE
                    </div> : 
                    <div className=''>₹{price}</div>}</span>
                    <Link
                        href={slug}
                        className="px-4 py-2 rounded transition-colors"
                    ><Button variant={"secondary"}>
                        Enroll Now
                    </Button>
                    </Link>
                </div>
            </div>
        </Card>
    )
}