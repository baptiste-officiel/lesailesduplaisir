import { clash } from '@/app/fonts/fonts'
import React from 'react'
import Menu from './Menu'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { SessionType } from '@/app/(site)/dashboard/page'



const Navbar = async() => {

  const session: SessionType | null = await getServerSession(authOptions)!;
  const status = session?.user?.status;
  console.log("🚀 ~ Dashboard ~ status:", status)

  if (session?.user?.status === 'admin') {
    return (
      <nav className={`${clash.variable} fixed top-0 mx-4 mt-4 z-20 font-title w-[calc(100%-2rem)] max-w-screen-xl py-4 px-6 rounded-full bg-white flex justify-between items-center text-text lg:mx-0 lg:left-[50%] lg:-translate-x-[50%] xl:w-full`}>
        <h2 className='text-xl font-medium text-red-500 border border-red-500 px-3 rounded-lg'><Link href={'/'}>LADP ADMIN</Link></h2>
        <Menu />
      </nav>
    )
  }

  return (
    <nav className={`${clash.variable} fixed top-0 mx-4 mt-4 z-20 font-title w-[calc(100%-2rem)] max-w-screen-xl py-4 px-6 rounded-full bg-white flex justify-between items-center text-text lg:mx-0 lg:left-[50%] lg:-translate-x-[50%] xl:w-full`}>
      <h2 className='text-xl font-medium'><Link href={'/'}>LADP</Link></h2>
      <Menu />
    </nav>
  )
}

export default Navbar
