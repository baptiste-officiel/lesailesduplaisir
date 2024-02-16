import React from 'react'
import AdminReservations from './AdminReservations'



const getReservations = async() => {
  try {
    const res = await fetch('http://localhost:3000/api/reservations')
    return res.json()
  } catch (error) {
    console.log("🚀 ~ getResservations ~ error:", error)
    
  }
}

const AdminDashboard = async() => {

  const reservations = await getReservations()
  // console.log("🚀 ~ AdminDashboard ~ reservations:", reservations)

  return (
    <>
      <h3 className='text-2xl font-medium mb-8'>Réservations</h3>
      <ul className='flex flex-wrap gap-6 justify-center'>
        {reservations && 
          reservations.map((item: any) => 
            <AdminReservations key={item.id} reservation={item} />
          )
        }
      </ul>
    </>
  )
}

export default AdminDashboard
