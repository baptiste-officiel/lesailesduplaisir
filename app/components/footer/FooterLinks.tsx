import Link from 'next/link'
import React from 'react'

const FooterLinks = () => {
  return (
    <div className='mt-4 font-light text-sm flex flex-wrap justify-center px-8 gap-4'>
      <Link href={'/mentionslegales'} className=''>Mentions légales</Link>
      <Link href={'/confidentialite'} className=''>Confidentialité</Link>
      <Link href={'/cgv'} className=''>CGV</Link>
    </div>
  )
}

export default FooterLinks
