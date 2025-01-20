import Image from 'next/image'
import Link from 'next/link'
// import Link from 'next/link'
import React, { JSX } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { cn } from '@/modals/utils'

interface IBlogCard {
    title: string,
    image: string,
    slug: string,
    date?: string,
    price?: number,
    description?: string | JSX.Element,
    component?: JSX.Element,
    imageClass?: string,
    className?: string,
    className2?: string,
}

export const BlogCard = ({ title, image, slug, date,
    description, component,
    className, className2, imageClass
}: IBlogCard) => {
    return (
        <Card
            className={className}
        >
            <div className="relative" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                <Image
                    src={image}
                    alt={title}
                    layout="fill"
                    className={imageClass}
                    objectFit="cover"
                />
            </div>

            <div className={cn("p-6", className2)}>
                <h2 className="text-xl font-bold">{title}</h2>
                {description && typeof description == "string" ? <p className="mt-2 text-sm h-14 line-clamp-3">{description}</p> : description}
                {component ? component
                    : <div className="flex justify-between items-center mt-4">
                        <span className="text-sm">{new Date(date as string).toLocaleString("en")}</span>
                        <Link
                            href={slug}
                            className="px-4 py-2 rounded transition-colors"
                        ><Button variant={"secondary"}>
                                Read More
                            </Button>
                        </Link>
                    </div>}
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
                <h2 className="text-lg font-bold line-clamp-2">{title}</h2>
                <p className="mt-2 text-sm line-clamp-3 min-h-14">{description}</p>
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