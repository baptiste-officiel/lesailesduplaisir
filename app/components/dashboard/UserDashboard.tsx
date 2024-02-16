import React from 'react'
import UserReservations from './UserReservations'

const getReservations = async(id: any) => {
  try {
    const res = await fetch('http://localhost:3000/api/reservations').then(res => res.json())
    const data = res.filter((item: any) => item.user.id === id)
    return data
  } catch (error) {
    console.log("🚀 ~ getResservations ~ error:", error)
    
  }
}

const UserDashboard = async({userId}: any) => {

  const reservations = await getReservations(userId)
  console.log("🚀 ~ UserDashboard ~ reservations:", reservations)

  return (
    <>
      <h3 className='text-2xl font-medium mb-8'>Réservations</h3>
      <ul className='flex flex-wrap gap-6'>
        {reservations && 
          reservations.map((item: any) => 
            <UserReservations key={item.id} reservation={item} />
          )
        }
      </ul>
    </>
  )
}

export default UserDashboard
