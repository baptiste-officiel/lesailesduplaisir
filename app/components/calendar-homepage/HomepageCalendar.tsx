import { clash, montserrat } from '@/app/fonts/fonts'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomepageCalendar = () => {
  return (
    <section className={`${clash.variable} font-title px-4 py-12 bg-beige my-8`}>
        <h2 className='text-center font-semibold text-3xl uppercase mb-4'>Disponibilités</h2>
        <p className={`${montserrat.variable} font-main my-6`}>Retrouvez ici toutes nos disponibilités et réservez votre créneau !</p>
        <Image src={`/img/calendar.png`} width={1000} height={500} alt='Calendrier' className='w-full' />
        <Link href={'/calendar'} className='bg-black rounded-3xl text-white py-3 px-12 block text-center mt-6 text-sm sm:text-base lg:text-xl lg:px-20'>Louer l&apos;avion</Link>
    </section>
  )
}

export default HomepageCalendar
