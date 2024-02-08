import CalendarPicker from '@/app/components/calendar/Calendar'
import React from 'react'

const Calendar = () => {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center overflow-hidden mb-12 mx-auto margin-top-navbar max-w-7xl">
      <h2 className='text-xl font-semibold'>Réservation</h2>
      <CalendarPicker />
    </main>
  )
}

export default Calendar
