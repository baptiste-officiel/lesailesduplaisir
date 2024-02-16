import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import React from 'react'

type SessionType = {
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    status?: string | null | undefined;
    id?: number | null | undefined;
  };
  // Autres propriétés de session si nécessaire
};

const Dashboard = async() => {

  const session: SessionType | null = await getServerSession(authOptions)!;
  const status = session?.user?.status;
  console.log("🚀 ~ Dashboard ~ status:", status)

  if (status === 'admin') {
    return (
      <div className='margin-top-navbar flex-1 bg-white min-h-screen'>
        Dashboard Admin
      </div>
    )
  }

  return (
    <div className='margin-top-navbar flex-1 bg-white min-h-screen'>
      Dashboard
    </div>
  )
}

export default Dashboard
