import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Article from '@/app/components/admin/blog/Article'
import ArticleForm from '@/app/components/admin/blog/ArticleForm'
import { getServerSession } from 'next-auth'
import React from 'react'
import { SessionType } from '../../dashboard/page'
import { z } from 'zod'
import Link from 'next/link'
import { FaPlus } from 'react-icons/fa6'
// import Error from './error'
// import Error from './Error'


export const PostScheme = z.object({
  id: z.number(),
  createdAt: z.string(),
  imageUrl: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  contentMDX: z.string(),
  published: z.boolean(),
  authorId: z.number(),
  author: z.object({
    id: z.number(),
    name: z.string()
  })
})

const PostsScheme = z.array(PostScheme);

type PostType = z.infer<typeof PostScheme>;

const getArticles = async() => {
    try {
     const res = await fetch(`${process.env.URL}/api/post`, {cache: 'no-store'});

     if (!res.ok) {
      throw new Error(`${res.status}, ${res.statusText}`);
    }
     const data = await res.json();
     const verifiedData = PostsScheme.parse(data);
     return verifiedData;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error: ${error.message}`);
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
}

const AdminBlogPage = async() => {


  const posts = await getArticles();
  posts?.reverse()
 
  return (
    <section className='margin-top-navbar bg-white min-h-screen px-8 my-12'>
    <div className='px-8 flex items-center gap-8'>
      <h1 className='text-2xl font-semibold'>Blog</h1>
      <Link href={'/admin/blog/create'} className='flex justify-between gap-2 items-center border-2 border-text px-4 py-1 rounded-full'><FaPlus />Ajouter un article</Link>
    </div>
    <div className='flex mt-8 flex-wrap gap-4'>
    {posts && 
      posts.map((item) => 
        <Article key={item.id} id={item.id} title={item.title} description={item.description} image={item.imageUrl} contentMDX={item.contentMDX} />
      )
    }
    </div>
    </section>
  )
}

export default AdminBlogPage
