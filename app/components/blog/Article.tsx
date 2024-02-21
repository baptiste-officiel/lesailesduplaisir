import { montserrat } from '@/app/fonts/fonts';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";

type ArticleType = {
    title: string;
    img: string;
    description: string;
    id: number;
}

const Article = ({title, img, description, id}: ArticleType) => {
  return (
    <>
        <div>
            <Image src={img} width={500} height={300} alt={title} className='w-full max-h-[200px] object-center object-cover rounded-t-2xl' />
            <h4 className='font-semibold text-xl mt-8 px-4  overflow-x-hidden whitespace-nowrap text-ellipsis'>{title}</h4>
            <p className={`${montserrat.variable} font-main text-secondary-text my-4 px-4`}>{description}</p>
        </div>
        <div>
            <Link href={`/news/${id}`} className={`${montserrat.variable} font-main font-medium flex items-center gap-4 px-4`}>Lire l&apos;article <FaArrowRightLong /></Link>
        </div>
    </>
  )
}

export default Article
