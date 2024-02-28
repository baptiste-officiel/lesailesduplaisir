import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Article from '@/app/components/admin/blog/Article'
import ArticleForm from '@/app/components/admin/blog/ArticleForm'
import { getServerSession } from 'next-auth'
import React from 'react'
import { SessionType } from '../../dashboard/page'
import { z } from 'zod'
import Link from 'next/link'
import { FaPlus } from 'react-icons/fa6'


export const PostScheme = z.object({
  id: z.number(),
  createdAt: z.string(),
  imageUrl: z.string().optional(),
  title: z.string(),
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
     const res = await fetch(`${process.env.URL}/api/post`, {cache: 'no-store'}).then((res) => res.json())
     .then((json) => PostsScheme.parse(json));
     return res;
    } catch (error) {
      console.log("🚀 ~ getArticles ~ error:", error)
      
    }
}

const AdminBlogPage = async() => {


  const posts = await getArticles();
  console.log("🚀 ~ AdminBlogPage ~ articles:", posts)

  return (
    <section className='margin-top-navbar bg-white min-h-screen px-8 my-12'>
    <div className='px-8 flex items-center gap-8'>
      <h1 className='text-2xl font-semibold'>Blog</h1>
      <Link href={'/admin/blog/create'} className='flex justify-between gap-2 items-center border-2 border-text px-4 py-1 rounded-full'><FaPlus />Ajouter un article</Link>
    </div>
    <div className='flex justify-around mt-8 flex-wrap gap-4'>
    {posts && 
      posts.map((item) => 
        <Article key={item.id} id={item.id} title={item.title} image={item.imageUrl} contentMDX={item.contentMDX} />
      )
    }
    </div>
    </section>
  )
}

export default AdminBlogPage
