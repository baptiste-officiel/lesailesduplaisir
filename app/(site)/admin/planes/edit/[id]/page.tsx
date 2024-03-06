'use client'

import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'


const EditPlane = () => {
  
  const params = useParams()
  const paramsId = params.id as unknown as string
  
  const getPlane = async(paramsId: string, cache: RequestCache) => {
    try {
     const res = await fetch(`/api/planes/${paramsId}`, {cache: cache})
  
    if (!res.ok) {
      throw new Error(`${res.status}, ${res.statusText}`);
    }
      const data = await res.json()
    setData({
      name: data.name,
      img: data.img,
      seats: data.seats,
      vmax: data.vmax,
      weight: data.weight,
    })
  } catch (error) {
    if (error instanceof Error) {
      toast.error(`Erreur ${error}. Impossible de charger les données`)
      toast.error(`Erreur : ${error}`)
      throw new Error(`Error: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}

    useEffect(() => {
      getPlane(paramsId, 'default')
    }, [paramsId])
    
  
    const router = useRouter();

    const [ data, setData ] = useState({
            name: '',
            img: '',
            seats: '',
            vmax: '',
            weight: '',
        })
        console.log("🚀 ~ EditPlane ~ data:", data)
        
        const handleSubmit = async(e: React.FormEvent, id: string) => {
          e.preventDefault();
          
          try {
            const res = await fetch(`/api/planes/${id}`, {
              method: 'PUT',
              body: JSON.stringify(data)
            })
            if (!res.ok) {
              throw new Error(`${res.status}, ${res.statusText}`);
            }
            router.push('/admin/planes');
            toast.success('Modification effectuée !');
            router.refresh();
          } catch (error) {
            if (error instanceof Error) {
              toast.error(`Erreur : ${error}`)
              throw new Error(`Error: ${error.message}`);
            } else {
              throw new Error('An unexpected error occurred');
            }
          }
        }

  return (
    <div className='margin-top-navbar flex-1 bg-white min-h-screen px-8'>
        <h1 className='text-xl font-semibold'>Modifier l&apos;avion</h1>
        <form className="space-y-6 mt-8 py-6 px-8 border rounded-xl w-full md:w-[60%] mx-auto" onSubmit={(e: React.FormEvent) => handleSubmit(e, paramsId)}>
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
                Enregistrer
            </button>
          </div>
        </form>
    </div>
  )
}

export default EditPlane
