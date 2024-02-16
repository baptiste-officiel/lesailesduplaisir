import React from 'react'

const UserReservations = ({reservation}: any) => {
  return (
    <li className='border rounded-2xl py-3 flex flex-col px-6 w-[35%]'>
      <h5 className='text-lg font-semibold capitalize mb-2'>{reservation.user.name}</h5>
      <div className='flex gap-2 justify-between items-center flex-wrap'>
      <span className={`${reservation.activity === 'location' ? 'bg-text text-beige' : reservation.activity === 'formation' ? 'bg-beige' : 'bg-none' } px-3 py-1 rounded-lg capitalize`}>{reservation.activity}</span><span className={`${reservation.withPilot === 'avec' ? 'bg-green-200' : reservation.withPilot === 'sans' ? 'bg-red-200' : 'bg-none' } px-3 py-1 rounded-lg capitalize`}>{reservation.withPilot ? `${reservation.withPilot} pilote` : ''}</span>
      </div>
    </li>
  )
}

export default UserReservations
