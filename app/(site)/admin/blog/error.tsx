'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'

const Error = () => {

    const router = useRouter();

  return (
    <div className='margin-top-navbar flex-1 bg-white min-h-screen px-8 mb-8 text-center'>
        <h1 className='font-semibold text-2xl my-6'>Erreur</h1>
        <p className=' mx-auto md:w-[60%]'>Erreur lors du chargement de la page, veuillez rafraichir la page ou retourner à l&apos;accueil</p>
        <div className='flex gap-4 justify-center my-5'>
            <button onClick={() => router.refresh()} className='border-2 border-black w-[20%] py-1 rounded-lg text-center bg-black text-white'>Rafraichir</button>
            <Link href={'/'} className='border-2 border-black w-[20%] py-1 rounded-lg text-center'>Accueil</Link>
        </div>
    </div>
  )
}

export default Error