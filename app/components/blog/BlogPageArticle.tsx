import { montserrat } from '@/app/fonts/fonts';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import md from 'markdown-it';

type ArticleType = {
    id: number;
    createdAt: string;
    img?: string;
    title: string;
    description?: string;
    content: string;
    author: string;
}

const BlogPageArticle = ({id, createdAt, img, title, description, content, author}: ArticleType) => {


    // const dateString = '2024-02-28T18:39:51.405Z';
    const date = new Date(createdAt);
  
    // Formater la date
    const formattedDate = date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

  return (
    <Link href={`/blog/${id}`} className={`font-medium flex justify-between gap-4 w-full my-3 md:w-[48%] lg:my-6 lg:flex-1 lg:min-w-[30%]`}>
        <article className='p-2 w-full rounded-2xl flex items-center border overflow-x-hidden shadow-sm transition-shadow duration-200 hover:shadow-md md:flex-col md:p-4'>
            {img &&
                <Image src={img} width={200} height={300} alt={title} className='min-w-32 min-h-24 max-w-32 max-h-24 block object-center object-cover rounded-xl md:w-full md:max-w-none md:max-h-48 md:min-h-48' />
            }
            <div className='flex flex-col justify-between h-full pl-4 py-1 overflow-x-hidden w-full md:pl-0'>
                <div className='flex flex-col justify-between md:mt-4'>
                <h4 className='font-semibold text-lg overflow-x-hidden whitespace-nowrap text-ellipsis mt-0'>{title}</h4>
                <p className='my-2 font-light hidden md:block'>{description}</p>
                </div>
                <p className='text-xs text-secondary-text capitalize mt-4'>{author} - {formattedDate}</p>
            </div>
        </article>
    </Link>
  )
}

export default BlogPageArticle
