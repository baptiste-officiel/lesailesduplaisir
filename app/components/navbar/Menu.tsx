'use client'

import { signIn } from 'next-auth/react'

import React from 'react'

const Menu = () => {
  return (
    <ul className='flex gap-8'>
      <li>À propos</li>
      <li>Location</li>
      <li>Formation</li>
      <li>Disponibilités</li>
      <li>Actualités</li>
      <li>Contact</li>
      <button onClick={() => signIn('google')} className='bg-red-500 p-2'>Connexion avec Google</button>
    </ul>
  )
}

export default Menu
