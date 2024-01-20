import { clash } from '@/app/fonts/fonts'
import React from 'react'
import Menu from './Menu'

const Navbar = () => {
  return (
    <nav className={`${clash.variable} font-title w-full max-w-screen-xl mx-auto py-4 px-6 my-4 rounded-full border flex justify-between items-center`}>
      <h2 className='text-xl font-medium'>LADP</h2>
      <Menu />
    </nav>
  )
}

export default Navbar
