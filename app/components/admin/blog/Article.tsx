'use client'

import md from 'markdown-it';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RxCross2, RxPencil1 } from 'react-icons/rx';

type ArticleType = {
  id: number;
  title: string,
  description?: string,
  image?: string,
  contentMDX: string
}

export default function Article({ id, title, description, image, contentMDX }: ArticleType) {

  const router = useRouter();

  const [ deleteValidation, setDeleteValidation ] = useState(false)

  const handleDelete = async(id: number) => {
    console.log(id);
    try {
      await fetch(`http://localhost:3000/api/post/${id}`, {
          method: 'DELETE',
          cache: 'no-store'
      },
      ).then(res => res.json())
      .finally(() => {
        router.refresh()
      })
    } catch (error) {
        console.log("🚀 ~ file: PostsList.tsx:20 ~ handleDelete ~ error:", error)
    }
  }

  return (
    <div className='border rounded-2xl px-4 py-4 w-[45%] relative'>
        <RxCross2 size={20} className='absolute top-2 right-2 border border-text bg-white box-content p-1 cursor-pointer rounded-md' onClick={() => setDeleteValidation(true)} />
        <Link href={`/admin/blog/edit/${id}`}><RxPencil1 size={20} className='absolute top-11 right-2 border border-text bg-white box-content p-1 cursor-pointer rounded-md' /></Link>
      {image && 
        <Image src={image} alt={title} width={500} height={500} className='w-full h-[200px] object-cover object-center rounded-lg' />
      }
      <h4 className='capitalize font-semibold text-2xl mt-5 overflow-x-hidden whitespace-nowrap text-ellipsis'>{title}</h4>
      {/* Utiliser une div vide avec un identifiant pour injecter le contenu MDX compilé */}
      {/* <div dangerouslySetInnerHTML={{ __html: md().render(contentMDX) }} /> */}
      {description &&
        <p className='my-1'>{description}</p>
      }
      {deleteValidation && 
          <div className='absolute top-0 left-0 w-full h-full bg-slate-100 backdrop-blur-sm bg-white/30 rounded-lg flex flex-col justify-center items-center gap-2'>
            <button onClick={() => handleDelete(id)} className='bg-red-500 w-[50%] py-2 rounded-lg text-slate-100 shadow-sm'>Supprimer</button>
            <button onClick={() => setDeleteValidation(false)} className='bg-black w-[50%] py-2 rounded-lg text-slate-100 shadow-sm'>Annuler</button>
          </div>
        }
    </div>
  );
}

