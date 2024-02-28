import { clash } from '@/app/fonts/fonts';
import Image from 'next/image';
import React from 'react'
import md from 'markdown-it';
import Link from 'next/link';

type PostDetailCompType = {
    id: number;
    createdAt: string;
    imageUrl?: string;
    title: string;
    content: string;
    author: string;
}

const PostDetailComp = ({ id, createdAt, imageUrl, title, content, author }: PostDetailCompType) => {

  // const dateString = '2024-02-28T18:39:51.405Z';
  const date = new Date(createdAt);
  
  // Formater la date
  const formattedDate = date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
  });
  console.log(formattedDate); // Output: "28 février 2024"

  const navTitle = title.split(' ');
  const smTitle = navTitle.slice(0, 3).join(' ');

  

  return (
    <article>
      <nav>
        <ul className='flex justify-center items-center gap-1 flex-wrap mb-8'>
          <li className='text-center'><Link href={'/'} className='flex gap-3 text-center font-medium'>Accueil <span className='mr-2'>/</span></Link></li>
          <li className='text-center'><Link href={'/blog'} className='flex gap-3 text-center font-medium'>Blog <span className='mr-2'>/</span></Link></li>
          <li className='text-center text-primary-color-hover capitalize'>{smTitle}</li>
        </ul>
      </nav>
      <p className='capitalize text-center text-primary-color-hover my-6'>{formattedDate}</p>
        {imageUrl &&    
          <Image src={imageUrl} alt={title} width={1200} height={400} className='w-full max-h-[300px] object-cover object-center rounded-lg' />
        }
        <h1 className={`font-bold text-3xl my-8 w-[95%] sm:text-4xl md:text-5xl md:my-12 lg:text-6xl lg:font-semibold `}>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
        <p className='mt-16 capitalize text-secondary-text text-right'>{author}</p>
    </article>
  )
}

export default PostDetailComp
