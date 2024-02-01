import { clash } from '@/app/fonts/fonts'
import Image from 'next/image'
import React from 'react'
import { z } from 'zod'
import Plane from '../plane/Plane'

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
    <section className={`${clash.variable} font-title bg-beige w-full px-4 py-16 md:py-28`}>
      <h2 className='font-semibold text-4xl text-center mb-8'>ULM</h2>
      {planes && 
        planes.map((item, index) => 
        <div key={item.id} className={`flex gap-0 ${index%2 !== 0 ? 'flex-col-reverse md:flex-row-reverse' : 'flex-col md:flex-row'} md:items-center md:gap-12 mt-8 ${index < planes.length - 1 ? 'mb-32 md:mb-48' : 'mb-8'}`}>
          <Plane 
            index={index}
            img={item.img}
            alt={item.name}
            name={item.name}
            seats={item.seats}
            vmax={item.vmax}
            weight={item.weight}
          />
        </div>
        )
      }
    </section>
  )
}

export default Planes
