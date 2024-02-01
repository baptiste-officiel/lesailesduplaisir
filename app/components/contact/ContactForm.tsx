'use client'

import React, { useState } from 'react'
import FormInput from '../inputs/FormInput'
import { clash } from '@/app/fonts/fonts'

const ContactForm = () => {

    const [ data, setData ] = useState({
        name: '',
        email: '',
        object: '',
        content: '',
    })
    console.log("🚀 ~ ContactForm ~ data:", data)
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("🚀 ~ ContactForm ~ data:", data)

        try {
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              }).then((res) => {
                if (res.status === 200) {
                  setData({
                    name: '',
                    email: '',
                    object: '',
                    content: '',
                  })
                }
              }).finally(() =>
              setData({
                name: '',
                email: '',
                object: '',
                content: '',
              })
              )
        } catch (error) {
        console.log("🚀 ~ handleSubmit ~ error:", error) 
        }
        
    }

  return (
    <form action="" className='flex flex-col w-full md:w-[50%]' onSubmit={handleSubmit}>
        <FormInput
            name='name'
            type='text'
            placeholder='Nom'
            className='px-4 py-2 border rounded-lg w-full'
            value={data.name}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setData({...data, name: e.currentTarget.value})}
        />
        <FormInput
            name='email'
            type='email'
            placeholder='E-mail'
            className='px-4 py-2 border rounded-lg w-full'
            value={data.email}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setData({...data, email: e.currentTarget.value})}
        />
        <FormInput
            name='object'
            type='text'
            placeholder='Objet'
            className='px-4 py-2 border rounded-lg w-full'
            value={data.object}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setData({...data, object: e.currentTarget.value})}
        />
        <textarea
            name='content'
            placeholder='Message'
            className='mt-2 px-4 py-2 border rounded-lg w-full'
            rows={6}
            value={data.content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData({...data, content: e.currentTarget.value})}
        />

        <button type="submit" className={`${clash.variable} font-title block bg-text text-beige py-2 mt-8 rounded-full`}>Envoyer</button>
    </form>
  )
}

export default ContactForm
