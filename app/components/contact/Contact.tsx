import { clash } from '@/app/fonts/fonts'
import React from 'react'
import { GrContact } from "react-icons/gr";
import FormInput from '../inputs/FormInput';
import ContactForm from './ContactForm';

const Contact = () => {
  return (
    <section id='contact' className={`${clash.variable} font-title px-4 py-16 bg-beige flex flex-wrap justify-between max-w-7xl`}>
        <h2 className='text-center font-semibold text-3xl uppercase mb-6 md:mb-16 w-full'>Contact</h2>
        <div className='w-full md:w-[40%]'>
        <p className='text-secondary-text gap-3 items-center hidden md:flex'><GrContact style={{color: 'C4C4C4'}} /> Contactez-nous</p>
        <p className={`my-6`}>Une question, un renseignement ? Contactez-nous au <a href="tel:+33661558029" className='font-medium'>06 61 55 80 29</a> ou via le formulaire de contact.</p>
        </div>
        <ContactForm />
    </section>
  )
}

export default Contact
