import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AdminDashboard from '@/app/components/admin/dashboard/AdminDashboard';
import UserDashboard from '@/app/components/dashboard/UserDashboard';
import { getServerSession } from 'next-auth';
import React from 'react'

export type SessionType = {
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
      <div className='margin-top-navbar flex-1 bg-white min-h-screen px-8'>
        <AdminDashboard />
      </div>
    )
  }

    return (
      <div className='margin-top-navbar flex-1 bg-white min-h-screen px-8 mx-auto'>
        <UserDashboard userId={session?.user?.id} />
      </div>
    )
}

export default Dashboard
