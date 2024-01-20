'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

const Menu = () => {

  const { data: session } = useSession()
  console.log("🚀 ~ Menu ~ data:", session)

  return (
    <ul className='flex gap-8'>
      <li>À propos</li>
      <li>Location</li>
      <li>Formation</li>
      <li>Disponibilités</li>
      <li>Actualités</li>
      <li>Contact</li>
      {!session ? 
        <button onClick={() => signIn('google')} className='bg-red-500 p-2'>Connexion avec Google</button>
        :
        <button onClick={() => signOut()} className='bg-red-500 p-2'>Déconnexion</button>        
      }
    </ul>
  )
}

export default Menu
