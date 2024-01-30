import { clash } from '@/app/fonts/fonts'
import Image from 'next/image'
import React from 'react'
import { z } from 'zod'

const PlaneScheme = z.object({
  id: z.number(),
  name: z.string(),
  img: z.string(),
  seats: z.string().optional(),
  vmax: z.string().optional(),
  weight: z.string().optional(),
})

const PlanesScheme = z.array(PlaneScheme);

type PlaneType = z.infer<typeof PlaneScheme>;

const getPlanes = async() => {
    try {
      const response = await fetch(`${process.env.URL}/api/planes`)
    .then((res) => res.json())
    .then((json) => PlanesScheme.parse(json));

    return response;
    } catch (error) {
      console.log("🚀 ~ getPlanes ~ error:", error)
    }
}

const Planes = async() => {

  const planes = await getPlanes()

  return (
    <section className={`${clash.variable} font-title bg-beige w-full px-4 py-12`}>
      <h2 className='font-semibold text-4xl text-center mb-8'>ULM</h2>
      {planes && 
        planes.map((item) => 
        <div key={item.id}>
          <Image src={item.img} width={200} height={300} alt='VL3' className='w-full rounded-2xl' />
          <div className='flex flex-col'>
            <h3 className='text-right text-3xl font-semibold py-6'>{item.name}</h3>
            <p className='text-xl mb-8 border-l-2 border-l-black pl-8'><span className='font-semibold text-3xl'>{item.seats}</span><br />Places</p>
            <p className='text-xl mb-8 border-l-2 border-l-black pl-8'><span className='font-semibold text-3xl'>{item.vmax}</span><br />Vitesse max (km/h)</p>
            <p className='text-xl mb-8 border-l-2 border-l-black pl-8'><span className='font-semibold text-3xl'>{item.weight}</span><br />Poids (kg)</p>
          </div>
        </div>
        )
      }
    </section>
  )
}

export default Planes
