import { montserrat } from '@/app/fonts/fonts';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import md from 'markdown-it';

type ArticleType = {
    title: string;
    description?: string;
    img?: string;
    content: string;
    id: number;
}

const Article = ({title, description, img, content, id}: ArticleType) => {

  // const markdescription = md().render(content)
  // const description = markdescription.substring(0, 100)

  return (
    <>
        <div>
            {img &&
              <Image src={img} width={500} height={300} alt={title} className='w-full object-center object-cover rounded-t-2xl max-h-48 min-h-48' />
            }
            <h4 className='font-semibold text-xl mt-8 px-4  overflow-x-hidden whitespace-nowrap text-ellipsis capitalize'>{title}</h4>
            <p className='px-4 my-2 font-light'>{description}</p>
        </div>
        <div>
            <Link href={`/blog/${id}`} className={`${montserrat.variable} font-main font-medium flex items-center gap-4 px-4`}>Lire l&apos;article <FaArrowRightLong /></Link>
        </div>
    </>
  )
}

export default Article
