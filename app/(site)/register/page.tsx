'use client'

import FormInput from '@/app/components/inputs/FormInput'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";


function Register() {

  const { data: session } = useSession()
  const router = useRouter()
  
  session && router.push('/');


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
  
  const [passwordType, setPasswordType] = useState<string>('password') 

  const togglePasswordType = () => {
    passwordType === 'password' ? setPasswordType('text') : setPasswordType('password')
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    
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

    {/* -------------------------- REFACTO INPUT --------------------------  */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <p className='text-lg font-medium'>Vous êtes un :</p>
          <div className='flex justify-center gap-12'>
            {statusValues.map((status) =>
              <FormInput
                key={status.status}
                labelHtmlFor={status.status}
                labelContent={status.label}
                id={status.status}
                name="status"
                type="radio"
                autoComplete="status"
                required
                className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6"
                value={data.status}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setData({...data, status: status.status, aeroclubAddress: '', aeroclubName: ''})}
                />
            )}
          </div>

          {data.status === 'aeroclub' &&
            <>
              <FormInput
                labelHtmlFor="aeroclubName"
                labelContent="Nom de l&apos;aéroclub"
                id="aeroclubName"
                name="aeroclubName"
                type="text"
                autoComplete="aeroclubName"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={data.aeroclubName}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setData({...data, aeroclubName: e.currentTarget.value})}
                />

                <FormInput
                  labelHtmlFor="aeroclubAddress"
                  labelContent="Adresse de l&apos;aéroclub"
                  id="aeroclubAddress"
                  name="aeroclubAddress"
                  type="text"
                  autoComplete="aeroclubAddress"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={data.aeroclubAddress}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => setData({...data, aeroclubAddress: e.currentTarget.value})}
                  />
            </>
          }


                <FormInput 
                  labelHtmlFor="name"
                  labelContent="Votre nom"
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={data.name}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => setData({...data, name: e.currentTarget.value})}
                />

                <FormInput
                  labelHtmlFor="email"
                  labelContent="Adresse email"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={data.email}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => setData({...data, email: e.currentTarget.value})}
                />

                <div className='relative'>
                <FormInput
                  labelHtmlFor="password"
                  labelContent="Mot de passe"
                  id="password"
                  name="password"
                  type={passwordType}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={data.password}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => setData({...data, password: e.currentTarget.value})}
                />
                <div className="absolute bottom-3 right-4" onClick={togglePasswordType}><FaEye /></div>
                </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-text px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              M&apos;inscrire
            </button>
            <p className='text-center mt-2 text-sm'>Déjà inscrit ? <Link href={'/login'} className='font-medium text-sm'>Me connecter</Link></p>
          </div>
        </form>
      </div>
    </div>
    </div>
  </>
  )
}

export default Register
