import { clash } from '@/app/fonts/fonts'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Intro = () => {

  return (    
    <header className={` ${clash.variable} font-title relative block w-full mx-auto pl-4 lg:mt-12`}>
      <h2 className={`font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl`}>Location d&rsquo;ULM,<br />Formation</h2>
      <p className={`max-w-[60%] mt-4 font-normal sm:text-lg md:text-xl lg:text-2xl mb-8`}>Nous vous proposons notre ULM en location et vous formons à la navigation glass cockpit.</p>
      <Link href={'/calendar'} className='bg-black relative z-10 rounded-3xl text-white py-3 px-12 text-sm sm:text-base lg:text-xl lg:px-20'>Réserver</Link>
      <Image id='image' src={'/img/plane-intro.png'} width={1000} height={500} alt='hélice VL3' className=' z-0 mr-0 ml-auto relative -right-16 -mt-20 w-[100%] min-w-[300px] max-w-[700px] sm:pt-0 md:-mt-32 lg:-mt-48' />
    </header>
  )
}

export default Intro
