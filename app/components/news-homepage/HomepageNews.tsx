import { clash, montserrat } from '@/app/fonts/fonts'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";

const articles = [
    {
        id: 1,
        img: '/img/news-1.jpg',
        title: 'Nouvelle hélice pour le VL3 !',
        description: 'L’hélice du VL3 a été changée récemment à l’occasion des 2000 heures de vol.',
        buttonLabel: 'Lire l\'article',
    }
]

const HomepageNews = () => {
  return (
    <section className={`${clash.variable} font-title px-4 py-12 my-8`}>
        <h2 className='text-center font-semibold text-3xl uppercase mb-4'>Actualités</h2>
        <p className={`${montserrat.variable} font-main my-6`}>Retrouvez ici les actualités concernant la formation, l’avion et tout ce qui touche à l’aviation !</p>
        {articles &&
            articles.map((item) =>
                <article key={item.id} className='w-full rounded-2xl shadow-md pb-8'>
                    <Image src={item.img} width={500} height={300} alt={item.title} className='w-full max-h-[200px] object-center object-cover rounded-t-2xl' />
                    <h4 className='font-semibold text-xl mt-8 px-4'>{item.title}</h4>
                    <p className={`${montserrat.variable} font-main text-secondary-text my-4 px-4`}>{item.description}</p>
                    <Link href={`/news/${item.id}`} className={`${montserrat.variable} font-main font-medium flex items-center gap-4 px-4`}>Lire l&apos;article <FaArrowRightLong /></Link>
                </article>
            )
        }
        <Link href={`/news`} className='bg-black rounded-3xl text-white py-3 px-12 block text-center mt-12 text-sm sm:text-base lg:text-xl lg:px-20'>Voir les actus</Link>

    </section>
  )
}

export default HomepageNews
