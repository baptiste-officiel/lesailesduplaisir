import React from 'react'
import UserReservations from './UserReservations'
import { toast } from 'sonner';
import { error } from 'console';

const getReservations = async(id: any) => {
  try {
    const res = await fetch(`${process.env.URL}/api/reservations`)
    if (res.ok) {
      const response = await res.json();
      const data = response.filter((item: any) => item.user.id === id)
      return data
    } else {
      if (res.status === 404) throw new Error('404, Not found');
      if (res.status === 500) throw new Error('500, internal server error');
      // For any other server error
      throw new Error(`${res.status}`);
    } 
    } catch (error) {
      Error(`${error}`)
    } 
}

const UserDashboard = async({userId}: any) => {

  const reservations = await getReservations(userId);
  
  if (!reservations) {
    return(
      <h1>Erreur lors du chargement des réservations</h1>
    )
  }

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
