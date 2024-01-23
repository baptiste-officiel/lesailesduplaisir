import { clash } from '@/app/fonts/fonts'
import React from 'react'
import Menu from './Menu'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className={`${clash.variable} font-title w-[calc(100%-2rem)] max-w-screen-xl mx-auto py-4 px-6 my-4 rounded-full border flex justify-between items-center text-text xl:w-full`}>
      <h2 className='text-xl font-medium'><Link href={'/'}>LADP</Link></h2>
      <Menu />
    </nav>
  )
}

export default Navbar
