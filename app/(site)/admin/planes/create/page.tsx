'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner';

const CreatePlane = () => {

    const router = useRouter();

    const [ data, setData ] = useState({
            name: '',
            img: '',
            seats: '',
            vmax: '',
            weight: '',
        })
        
        const handleSubmit = async(e: React.FormEvent) => {
          e.preventDefault();
          console.log("🚀 ~ CreatePlane ~ data:", data)
          
          try {
            await fetch('/api/planes', {
              method: 'POST',
              body: JSON.stringify(data)
            })
            .then(() => router.push('/admin/planes'))
            .then(() => toast.success('L\'avion a été ajouté'))
            .then(() => setData({
              name: '',
              img: '',
              seats: '',
              vmax: '',
              weight: '',
            }))
            .finally(() => router.refresh())
            // const userInfo = await res.json()
          } catch (error) {
          console.log("🚀 ~ file: page.tsx:28 ~ handleSubmit ~ error:", error)
          }  
        }

  return (
    <div className='margin-top-navbar flex-1 bg-white min-h-screen px-8'>
        <h1 className='text-xl font-semibold'>Nouvel avion</h1>
        <form className="space-y-6 mt-8 py-6 px-8 border rounded-xl w-full md:w-[60%] mx-auto" onSubmit={handleSubmit}>
            <div className='relative flex flex-col gap-2'>
                <label htmlFor="name">Modèle</label>
                <input type='text' name='name' id='name' className='w-full border rounded-lg px-2 py-2'
                value={data.name}
                onChange={(e) => setData({...data, name: e.currentTarget.value})}
                />
            </div>
            <div className='relative flex flex-col gap-2'>
                <label htmlFor="image">Image</label>
                <input type='text' name='image' id='image' className='w-full border rounded-lg px-2 py-2'
                value={data.img}
                onChange={(e) => setData({...data, img: e.currentTarget.value})}
                />
            </div>
            <div className='relative flex flex-col gap-2'>
                <label htmlFor="seats">Places</label>
                <input type='text' name='seats' id='seats' className='w-full border rounded-lg px-2 py-2'
                value={data.seats}
                onChange={(e) => setData({...data, seats: e.currentTarget.value})}
                />
            </div>
            <div className='relative flex flex-col gap-2'>
                <label htmlFor="vmax">V-max</label>
                <input type='text' name='vmax' id='vmax' className='w-full border rounded-lg px-2 py-2'
                value={data.vmax}
                onChange={(e) => setData({...data, vmax: e.currentTarget.value})}
                />
            </div>
            <div className='relative flex flex-col gap-2'>
                <label htmlFor="weight">Poids</label>
                <input type='text' name='weight' id='weight' className='w-full border rounded-lg px-2 py-2'
                value={data.weight}
                onChange={(e) => setData({...data, weight: e.currentTarget.value})}
                />
            </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-text px-3 py-1.5 mt-12 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
                Ajouter
            </button>
          </div>
        </form>
    </div>
  )
}

export default CreatePlane
