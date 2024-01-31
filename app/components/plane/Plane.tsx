import Image from 'next/image';
import React from 'react'

type PlaneType = {
    img: string;
    alt: string;
    name: string;
    seats?: string;
    vmax?: string;
    weight?: string;
}

const Plane = ({img, alt, name, seats, vmax, weight}: PlaneType) => {
  return (
    <>
        <Image src={img} width={200} height={300} alt={name} className='w-full max-h-[450px] object-cover object-center rounded-2xl sm:max-h-[550px] md:w-[55%] md:max-w-[600px]' />
        <div className='flex flex-col md:ml-12'>
        <h3 className='text-right text-3xl font-semibold py-6 md:text-left md:mb-12'>{name}</h3>
        <p className='text-xl mb-8 border-l-2 border-l-black pl-8'><span className='font-semibold text-3xl'>{seats}</span><br />Places</p>
        <p className='text-xl mb-8 border-l-2 border-l-black pl-8'><span className='font-semibold text-3xl'>{vmax}</span><br />Vitesse max (km/h)</p>
        <p className='text-xl mb-8 border-l-2 border-l-black pl-8'><span className='font-semibold text-3xl'>{weight}</span><br />Poids (kg)</p>
        </div>
    </>
  )
}

export default Plane
