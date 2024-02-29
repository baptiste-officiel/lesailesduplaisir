import BlogPageArticle from '@/app/components/blog/BlogPageArticle';
import { clash } from '@/app/fonts/fonts'
import Link from 'next/link';
import React from 'react'
import { RiArrowLeftSLine } from 'react-icons/ri';
import { z } from 'zod';

const PostScheme = z.object({
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

const getPosts = async() => {
    try {
     const res = await fetch(`${process.env.URL}/api/post`, {cache: 'no-store'}).then((res) => res.json())
     .then((json) => PostsScheme.parse(json));
     return res;
    } catch (error) {
      console.log("🚀 ~ getArticles ~ error:", error)
      
    }
}

const News = async() => {

  const posts = await getPosts();
  const postsByNewest = posts?.reverse()

  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden mx-auto margin-top-navbar px-8">
      <Link href={'/'} className='flex items-center gap-2 mb-8'><RiArrowLeftSLine size={25} />Retour</Link>
      <h1 className={`${clash.variable} text-5xl font-bold text-center capitalize`}>Les actualités</h1>
      <p className='text-center text-primary-color-hover my-8 md:text-lg'>Restez au courant des dernières actualités des Ailes du Plaisir et de nos avions.</p>
      <div className='flex flex-wrap justify-between items-stretch lg:justify-around'>
      {postsByNewest &&
        postsByNewest.map((post) => 
          <BlogPageArticle key={post.id} img={post.imageUrl} title={post.title} description={post.description} content={post.contentMDX} id={post.id} author={post.author.name} createdAt={post.createdAt} /> 
        )
      }
      </div>
    </main>
  )
}

export default News
