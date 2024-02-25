import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import { SessionType } from '../dashboard/page'

const Admin = async() => {

  const session: SessionType | null = await getServerSession(authOptions)!;

  return (
    <div className='margin-top-navbar flex-1 bg-white min-h-screen px-8'>
      <h2 className="text-center text-xl font-medium">Bonjour <span className="text-xl font-semibold">{session?.user?.name}</span></h2>
            <div className="flex mx-auto gap-4 justify-center mt-12">
            <Link href={'/'} className="bg-text text-beige px-6 py-2 rounded-full">Accueil</Link>
            <Link href={'/dashboard'} className="bg-text text-beige px-6 py-2 rounded-full">Dashboard</Link>
            <Link href={'/admin/blog'} className="bg-text text-beige px-6 py-2 rounded-full">Blog</Link>
            <Link href={'/admin/planes'} className="bg-text text-beige px-6 py-2 rounded-full">Planes</Link>
            </div>
    </div>
  )
}

export default Admin
