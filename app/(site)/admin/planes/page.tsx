
import PlaneCard from '@/app/components/plane/PlaneCard';
import { getPlanes } from '@/app/hooks/getPlanes'
import Link from 'next/link';
import React from 'react'
import { FaPlus } from "react-icons/fa6";
import { useQuery } from '@tanstack/react-query';
import Error from './Error';


const AdminPlanes = async() => {

  const planes = await getPlanes('no-store');
  if (!planes) {
   return(
    <Error />
   )
  } else

  return (
    <div className='margin-top-navbar flex-1 bg-white min-h-screen px-8 mb-8'>
      <div className='flex gap-8 items-center'>
        <h1 className='text-2xl font-semibold'>Nos avions</h1>
        <Link href={'/admin/planes/create'} className='flex justify-between gap-2 items-center border-2 border-text px-4 py-1 rounded-full'><FaPlus /> Ajouter un avion</Link>
      </div>
      <div className='flex flex-wrap gap-6 mt-8'>
        {planes &&
          planes.map((item) => 
              <PlaneCard 
                key={item.id}
                id={item.id}
                img={item.img}
                alt={item.name}
                name={item.name}
                seats={item.seats}
                vmax={item.vmax}
                weight={item.weight}
              />
          )
        }
      </div>
    </div>
  )
}

export default AdminPlanes
