import { clash, montserrat } from '@/app/fonts/fonts';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type SectionType = {
    title: string;
    img: string;
    content: string;
    buttonLabel: string;
    linkTo: string;
    price: number;
}

const Section = ({title, img, content, buttonLabel, linkTo, price}: SectionType) => {
  return (
    <section className={`${clash.variable} font-title px-4 mb-16 flex flex-col justify-between md:w-[48%] md:mb-0`}>
        <div>
          <h3 className='text-center font-semibold text-3xl uppercase mb-4'>{title}</h3>
          <Image src={img} width={1000} height={500} alt={title} className='w-full rounded-2xl h-[300px] object-cover object-center' />
          <p className={`${montserrat.variable} font-main my-6`}>{content}</p>
        </div>
        <div>
          <Link href={linkTo} className='bg-black rounded-3xl text-white py-3 px-12 block text-center mt-6 text-sm sm:text-base lg:text-xl lg:px-20'>{buttonLabel}</Link>
          <p className='text-center font-light text-sm'>À partir de {price}€/h</p>
        </div>
    </section>
  )
}

export default Section
