'use client'

import { clash, montserrat } from '@/app/fonts/fonts'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import DatePicker, { getDefaultLocale, registerLocale, setDefaultLocale } from 'react-datepicker'
import '@/app/components/calendar/style/datepicker.scss'
import fr from 'date-fns/locale/fr'

registerLocale('fr', fr)
setDefaultLocale('fr');

const HomepageCalendar = () => {

  const [ startDate, setStartDate ] = useState<Date | null>(new Date());
  console.log("🚀 ~ HomepageCalendar ~ startDate:", startDate)

  return (
    <section className={`${clash.variable} font-title px-4 py-12 bg-beige my-8`}>
        <h2 className='text-center font-semibold text-3xl uppercase mb-4'>Disponibilités</h2>
        <p className={`${montserrat.variable} font-main my-6`}>Retrouvez ici toutes nos disponibilités et réservez votre créneau !</p>
        {/* <Image src={`/img/calendar.png`} width={1000} height={500} alt='Calendrier' className='w-full' /> */}
        <div className='flex flex-col items-center gap-0'>
        <section className='mx-auto my-6'>
        <DatePicker
          selected={new Date()}
          onChange={(date) => setStartDate(new Date())}
          inline
          disabled
        />
        </section>
        </div>
        <Link href={'/reservation'} className='bg-black rounded-3xl text-white py-3 px-12 block text-center mt-6 text-sm sm:text-base lg:text-xl lg:px-20'>Louer l&apos;avion</Link>
    </section>
  )
}

export default HomepageCalendar
