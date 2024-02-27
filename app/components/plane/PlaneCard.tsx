'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { MouseEventHandler, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { RxPencil1 } from "react-icons/rx";

type PlaneType = {
    id: number;
    img: string;
    alt: string;
    name: string;
    seats?: string;
    vmax?: string;
    weight?: string;
}

const Plane = ({id, img, alt, name, seats, vmax, weight}: PlaneType) => {

  const router = useRouter();

  const [ deleteValidation, setDeleteValidation ] = useState(false)

  const handleDelete = async(id: number) => {
    console.log(id);
    try {
      await fetch(`http://localhost:3000/api/planes/${id}`, {
          method: 'DELETE',
          cache: 'no-store'
      },
      ).then(res => res.json())
      .finally(() => {
        router.refresh()
      })
    } catch (error) {
        console.log("🚀 ~ file: PostsList.tsx:20 ~ handleDelete ~ error:", error)
    }
  }


  return (
    <div className='relative '>
        <Image src={img} width={200} height={300} alt={name} className='w-full max-h-[250px] rounded-t-lg object-cover object-center' />
          <RxCross2 size={20} className='absolute top-1 right-1 border border-text bg-white box-content p-1 cursor-pointer rounded-md' onClick={() => setDeleteValidation(true)} />
          <Link href={`/admin/planes/edit/${id}`}><RxPencil1 size={20} className='absolute top-10 right-1 border border-text bg-white box-content p-1 cursor-pointer rounded-md' /></Link>
          <div className='flex flex-col p-2'>
          <h3 className='font-semibold text-xl my-2'>{name}</h3>
          <p className='flex justify-between'>Places<span className='font-semibold'>{seats}</span></p>
          <p className='flex justify-between'>V-max<span className='font-semibold'>{vmax}</span></p>
          <p className='flex justify-between'>Poids<span className='font-semibold'>{weight}</span></p>
        </div>
        {deleteValidation && 
          <div className='absolute top-0 left-0 w-full h-full bg-slate-100 backdrop-blur-sm bg-white/30 rounded-lg flex flex-col justify-center items-center gap-2'>
            <button onClick={() => handleDelete(id)} className='bg-red-500 w-[50%] py-2 rounded-lg text-slate-100 shadow-sm'>Supprimer</button>
            <button onClick={() => setDeleteValidation(false)} className='bg-black w-[50%] py-2 rounded-lg text-slate-100 shadow-sm'>Annuler</button>
          </div>
        }
    </div>
  )
}

export default Plane
