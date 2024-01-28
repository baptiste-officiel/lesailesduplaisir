import { clash } from '@/app/fonts/fonts'
import React from 'react'
import Menu from './Menu'
import Link from 'next/link'

const Navbar = () => {
  
  return (
    <nav className={`${clash.variable} fixed top-0 mx-4 mt-4 z-20 font-title w-[calc(100%-2rem)] max-w-screen-xl py-4 px-6 rounded-full bg-white flex justify-between items-center text-text xl:w-full`}>
      <h2 className='text-xl font-medium'><Link href={'/'}>LADP</Link></h2>
      <Menu />
    </nav>
  )
}

export default Navbar
