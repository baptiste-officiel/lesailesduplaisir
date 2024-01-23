'use client'

import { clash } from '@/app/fonts/fonts'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Intro = () => {

  
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  
    useEffect(() => {
      const imageElement = document.getElementById('image');
  
      const updateImageDimensions = () => {
        if (imageElement) {
          const { width, height } = imageElement.getBoundingClientRect();
          setImageDimensions({ width, height });
        }
      };
  
      // Mettre à jour les dimensions de l'image au chargement de la page
      updateImageDimensions();
  
      // Mettre en place un écouteur de redimensionnement d'écran pour mettre à jour les dimensions en cas de changement
      window.addEventListener('resize', updateImageDimensions);
  
      // Nettoyer l'écouteur lorsque le composant est démonté
      return () => {
        window.removeEventListener('resize', updateImageDimensions);
      };
    }, []); // Le tableau vide en tant que dépendance signifie que cela ne s'exécute qu'une fois au montage
  
const dimension = Math.round(imageDimensions.height)

  return (
    <section className={` ${clash.variable} font-title relative block mt-8 w-full mx-auto bg-green-300`} style={{height: dimension}}>
      <h2 className={`font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl h-[${Math.round(imageDimensions.width)}px]`}>Location d&rsquo;ULM,<br />Formation</h2>
      <p className={`max-w-[60%] mt-4 font-normal sm:text-lg md:text-xl lg:text-2xl mb-8`}>Nous vous proposons notre ULM en location et vous formons à la navigation glass cockpit.</p>
      <Link href={'/calendar'} className='bg-black rounded-3xl text-white py-3 px-12 text-sm sm:text-base lg:text-xl lg:px-20'>Réserver</Link>
      <Image id='image' src={'/img/plane-intro.png'} width={1000} height={500} alt='hélice VL3' className='absolute top-28 -right-[80px] w-[100%] min-w-[300px] max-w-[700px] sm:top-0' />
      <p>{dimension}</p>
    </section>
  )
}

export default Intro
