'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


function Register() {

  const statusValues = [
    {
      status: 'particulier',
      label: 'Particulier'
    },
    {
      status: 'aeroclub',
      label: 'Aéroclub'
    },
  ]

  const [data, setData] = useState({
    status: '',
    aeroclubName: '',
    aeroclubAddress: '',
    name: '',
    email: '',
    password: ''
  })
  console.log("🚀 ~ Register ~ data:", data)

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    // data.status !== 'aeroclub' && setData({...data, aeroclubName: '', aeroclubAddress: ''})
    if (data.status !== 'aeroclub') {
      setData({...data, aeroclubName: '', aeroclubAddress: ''})
      console.log(data);
    }
    
    try {
      const res = await fetch('api/register', {
        method: 'POST',
        body: JSON.stringify(data)
      }) 
      const userInfo = await res.json()
    } catch (error) {
    console.log("🚀 ~ file: page.tsx:28 ~ handleSubmit ~ error:", error)
    }  
  }

  return (
    <>
    <div className='bg-hero min-h-screen bg-cover bg-center pt-28'>
    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 mx-auto rounded-xl bg-white w-4/5 md:w-3/5 lg:w-2/5">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Inscription
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <p className='text-lg font-medium'>Vous êtes un :</p>
          <div className='flex justify-center gap-12'>
            {statusValues.map((status) =>
              <div className="-mt-2" key={status.status}>
              <label htmlFor={status.status} className="block text-md font-medium leading-6 text-gray-900 mb-2">
                {status.label}
              </label>
              <input
                id={status.status}
                name="status"
                type="radio"
                autoComplete="status"
                required
                className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6"
                value={data.status}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setData({...data, status: status.status})}
                />
            </div>
            )}
          </div>

          {data.status === 'aeroclub' &&
            <>
            <div>
            <label htmlFor="aeroclubName" className="block text-sm font-medium leading-6 text-gray-900">
              Nom de l&apos;aéroclub
            </label>
            <div className="mt-2">
              <input
                id="aeroclubName"
                name="aeroclubName"
                type="text"
                autoComplete="aeroclubName"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={data.aeroclubName}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setData({...data, aeroclubName: e.currentTarget.value})}
                />
            </div>
          </div>


              <div>
                <label htmlFor="aeroclubAddress" className="block text-sm font-medium leading-6 text-gray-900">
                  Adresse de l&apos;aéroclub
                </label>
                <div className="mt-2">
                  <input
                    id="aeroclubAddress"
                    name="aeroclubAddress"
                    type="text"
                    autoComplete="aeroclubAddress"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={data.aeroclubAddress}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => setData({...data, aeroclubAddress: e.currentTarget.value})}
                    />
                </div>
              </div>          
            </>
          }


          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Votre nom
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={data.name}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setData({...data, name: e.currentTarget.value})}
                />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Adresse email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={data.email}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setData({...data, email: e.currentTarget.value})}
                />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Mot de passe
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={data.password}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setData({...data, password: e.currentTarget.value})}
                />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              M&apos;inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  </>
  )
}

export default Register
