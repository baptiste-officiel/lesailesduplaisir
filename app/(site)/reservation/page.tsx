import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import CalendarAeroclub from '@/app/components/calendar/CalendarAeroclub';
import CalendarParticulier from '@/app/components/calendar/CalendarParticulier';
import { getServerSession } from 'next-auth';
import React from 'react'

const Reservation = async() => {

  const session = await getServerSession(authOptions);
  // console.log("🚀 ~ Calendar ~ session:", session?.user)
  const status = session?.user?.status;
  console.log("🚀 ~ Calendar ~ status:", status)

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center overflow-hidden mb-12 mx-auto margin-top-navbar max-w-7xl">
      <h2 className='text-2xl font-semibold'>Réservation</h2>
      {status === 'particulier' &&        
        <CalendarParticulier />
      }
      {status === 'aeroclub' &&        
        <CalendarAeroclub />
      }
    </main>
  )
}

export default Reservation
