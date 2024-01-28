'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

const Menu = () => {

  const { data: session } = useSession()

  const links = [
    {
      id: 1,
      link: '/about',
      content: 'À propos'
    },
    {
      id: 2,
      link: '/location',
      content: 'Location'
    },
    {
      id: 3,
      link: '/formation',
      content: 'Formation'
    },
    {
      id: 4,
      link: '/calendar',
      content: 'Disponibilités'
    },
    {
      id: 5,
      link: '/news',
      content: 'Actualités'
    },
    {
      id: 6,
      link: '/#contact',
      content: 'Contact'
    },
  ]

  const connexionButton = (
    !session ? 
    // <button onClick={() => signIn('google')} className='border border-black py-2 px-4 rounded-full text-xl lg:text-base'>Connexion avec Google</button>
    // :
    <Link href={`/login`} className='border border-black py-2 px-4 rounded-full text-xl lg:text-base'>Connexion</Link>
    : 
    <button onClick={() => signOut()} className='border border-black py-2 px-4 rounded-full text-xl lg:text-base'>Déconnexion</button>

  )

  const [toggleMenu, setToggleMenu] = useState(false);


const handleClick = () => {
  setToggleMenu(!toggleMenu)
}


return (
  <>
    {/* Desktop navbar  */}
    <ul className='gap-8 justify-between items-center font-medium hidden lg:flex'>
      {links && 
        links.map((item) =>
          <li key={item.id}><Link href={item.link}>{item.content}</Link></li>
        )
      }
      {connexionButton}
    </ul>
    {/* Mobile Navbar  */}
    <div className='flex relative z-30 flex-col gap-1 cursor-pointer lg:hidden' onClick={handleClick}>
      <span className='w-8 h-1.5 bg-text rounded-full'></span>
      <span className='w-8 h-1.5 bg-text rounded-full'></span>
      <span className='w-8 h-1.5 bg-text rounded-full'></span>
    </div>
    <div className={`${toggleMenu ? 'translate-x-0' : '-translate-x-[100%]'} overflow-x-hidden fixed top-0 left-0 w-full h-screen z-20 bg-white flex justify-center items-center transition duration-500 lg:hidden`} onClick={handleClick}>
      <ul className={`list-none gap-6 flex flex-col font-medium justify-between items-center`}>
      {links && 
        links.map((item) =>
          <li key={item.id} className='px-4 py-2'><Link href={item.link} className='text-xl'>{item.content}</Link></li>
        )
      }
      {connexionButton}
      </ul>
    </div>
  </>
  )
  
}

export default Menu
