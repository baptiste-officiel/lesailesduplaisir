'use client'

import React from 'react'
import { links } from '../navbar/Menu'
import Link from 'next/link'

const FooterNav = () => {
  return (
    <ul className='my-10 w-full list-none text-center max-w-7xl md:flex md:justify-around'>
        {links && 
            links.map((item) =>
                <li key={item.id} className='mb-1'><Link href={item.link} className='text-lg'>{item.content}</Link></li>
            )
        }
    </ul>
  )
}

export default FooterNav
