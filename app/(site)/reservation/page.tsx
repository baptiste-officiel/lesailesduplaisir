import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import CalendarAeroclub from '@/app/components/calendar/CalendarAeroclub';
import CalendarParticulier from '@/app/components/calendar/CalendarParticulier';
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

const Reservation = async() => {

  const session: SessionType | null = await getServerSession(authOptions)!;
  const status = session?.user?.status;
  console.log("🚀 ~ Calendar ~ status:", status)

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center overflow-hidden mb-12 mx-auto margin-top-navbar max-w-7xl">
      <h2 className='text-2xl font-semibold'>Réservation</h2>
      {status === 'particulier' &&        
        <CalendarParticulier userId={session?.user?.id} />
      }
      {status === 'aeroclub' &&        
        <CalendarAeroclub userId={session?.user?.id} />
      }
    </main>
  )
}

export default Reservation
