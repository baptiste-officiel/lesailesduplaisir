'use client'

import { signIn } from "next-auth/react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"



const Login = () => {

    const router = useRouter();
    // const params = useParams();
    // console.log("🚀 ~ Login ~ params:", params)


    const [data, setData] = useState({
      email: '',
      password: ''
    })
  
    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();
  
      try {
        signIn('credentials', {...data, redirect: false})
        .then(() => router.back())
        .then(() => router.refresh());
      } catch (error) {
        console.log("🚀 ~ file: page.tsx:24 ~ handleSubmit ~ error:", error)
      }
    }

  return (
    <section className='margin-top-navbar'>
        <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 mx-auto rounded-xl bg-white w-4/5 md:w-3/5 lg:w-2/5">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Connexion
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
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
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={data.password}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setData({...data, password: e.currentTarget.value})}
                />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-text px-3 py-1.5 text-sm font-semibold leading-6 text-beige shadow-sm duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Connexion
            </button>
          </div>
        </form>
        <p className="mt-8 font-light text-center w-full text-sm">Pas encore de compte ? <Link href={'/register'} className="text-center font-normal text-sm">Créer un compte</Link></p>
        
      </div>
    </div>
    </section>
  )
}

export default Login
