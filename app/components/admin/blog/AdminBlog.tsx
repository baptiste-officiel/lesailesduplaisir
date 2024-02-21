import React from 'react'
import { articles } from '../../blog/HomepageNews'

const AdminBlog = () => {
  return (
    <>
      <h3 className='text-2xl font-medium mb-8'>Réservations</h3>
      <ul className='flex flex-wrap gap-6 justify-center'>
        {articles && 
          articles.map((item: any) => 
            <AdminReservations key={item.id} reservation={item} />
          )
        }
      </ul>
    </>
  )
}

export default AdminBlog
