import { clash } from '@/app/fonts/fonts'
import React from 'react'
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import FooterNav from './FooterNav';
import Link from 'next/link';
import FooterLinks from './FooterLinks';

const Footer = () => {

  return (
    <footer className='bg-text bottom-0 w-full px-4 pt-8 flex flex-col justify-between items-center text-white'>
      <h4><Link href={'/'} className={`${clash.variable} font-title font-semibold text-3xl text-center`}>LADP</Link></h4>
      <span className='w-4 h-4 bg-beige rounded-full my-4'></span>
      <div className='flex gap-8'>
        <FaInstagram style={{color: 'white'}} size={30} />
        <FaFacebook style={{color: 'white'}} size={30} />
      </div>
      <FooterNav />
      <FooterLinks />
      <p className='mt-14 py-3 text-[0.7rem]'>Made with 💜 by <a href="https://baptistelejeune.fr" className='text-[0.7rem] font-semibold'>Baptiste Lejeune</a></p>
    </footer>
  )
}

export default Footer
