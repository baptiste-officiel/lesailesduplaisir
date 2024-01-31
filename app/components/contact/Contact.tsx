import { clash } from '@/app/fonts/fonts'
import React from 'react'
import { GrContact } from "react-icons/gr";
import FormInput from '../inputs/FormInput';

const Contact = () => {
  return (
    <section className={`${clash.variable} font-title px-4 py-12 mt-8 bg-beige`}>
        <h2 className='text-center font-semibold text-3xl uppercase mb-4'>Contact</h2>
        <p className='text-secondary-text gap-3 items-center hidden md:flex'><GrContact style={{color: 'C4C4C4'}} /> Contactez-nous</p>
        <p className={`my-6`}>Une question, un renseignement ? Contactez-nous au <a href="tel:+33661558029" className='font-medium'>06 61 55 80 29</a> ou via le formulaire de contact ci-dessous.</p>
        <form action="" className='flex flex-col w-full'>
            <FormInput
                name='name'
                type='text'
                placeholder='Nom'
                className='px-4 py-2 border rounded-lg w-full'
            />
            <FormInput
                name='email'
                type='email'
                placeholder='E-mail'
                className='px-4 py-2 border rounded-lg w-full'
            />
            <FormInput
                name='object'
                type='text'
                placeholder='Nom'
                className='px-4 py-2 border rounded-lg w-full'
            />
            <textarea
                name='content'
                placeholder='Message'
                className='mt-2 px-4 py-2 border rounded-lg w-full'
                rows={6}
            />

            <button type="submit" className={`${clash.variable} font-title block bg-text text-beige py-2 mt-8 rounded-full`}>Envoyer</button>
        </form>

    </section>
  )
}

export default Contact
