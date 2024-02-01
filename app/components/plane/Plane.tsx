import Image from 'next/image';
import React from 'react'

type PlaneType = {
    index: number;
    img: string;
    alt: string;
    name: string;
    seats?: string;
    vmax?: string;
    weight?: string;
}

const Plane = ({index, img, alt, name, seats, vmax, weight}: PlaneType) => {
  return (
    <>
        <Image src={img} width={200} height={300} alt={name} className='w-full block max-h-[450px] object-cover object-center rounded-2xl sm:max-h-[550px] md:w-[55%] md:max-w-[600px]' />
        <div className='flex flex-col md:ml-12'>
        <h3 className={`${index%2 !== 0 ?'text-left md:text-right' : 'text-right md:text-left'} text-3xl font-semibold py-6 md:mb-12`}>{name}</h3>
        <p className={`${index%2 !== 0 ? 'text-right pr-8 border-r-2 border-r-black' : 'text-left pl-8 border-l-2 border-l-black'} text-xl mb-8`}><span className='font-semibold text-3xl'>{seats}</span><br />Places</p>
        <p className={`${index%2 !== 0 ? 'text-right pr-8 border-r-2 border-r-black' : 'text-left pl-8 border-l-2 border-l-black'} text-xl mb-8`}><span className='font-semibold text-3xl'>{vmax}</span><br />Vitesse max (km/h)</p>
        <p className={`${index%2 !== 0 ? 'text-right pr-8 border-r-2 border-r-black' : 'text-left pl-8 border-l-2 border-l-black'} text-xl mb-8`}><span className='font-semibold text-3xl'>{weight}</span><br />Poids (kg)</p>
        </div>
    </>
  )
}

export default Plane
