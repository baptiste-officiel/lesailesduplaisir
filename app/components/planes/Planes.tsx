import { clash } from '@/app/fonts/fonts'
import React from 'react'
import Plane from '../plane/Plane'
import { getPlanes } from '@/app/hooks/getPlanes'


const Planes = async() => {

  const planes = await getPlanes('default')

  if (planes) {
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
}

export default Planes
