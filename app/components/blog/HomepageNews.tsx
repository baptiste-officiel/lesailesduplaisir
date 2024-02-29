import { clash, montserrat } from '@/app/fonts/fonts'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Article from './Article'
import { z } from 'zod'


// export const articles = [
//     {
//         id: 1,
//         img: '/img/news-1.jpg',
//         title: 'Nouvelle hélice pour le VL3 !',
//         description: 'L’hélice du VL3 a été changée récemment à l’occasion des 2000 heures de vol.',
//     },
//     {
//         id: 2,
//         img: '/img/news-1.jpg',
//         title: 'Dernier article VL3 !',
//         description: 'Article test.',
//     },
//     {
//         id: 3,
//         img: '/img/news-1.jpg',
//         title: 'Nouvelle hélice pour le VL3 !',
//         description: 'L’hélice du VL3 a été changée récemment à l’occasion des 2000 heures de vol.',
//     },
// ]

const PostScheme = z.object({
    id: z.number(),
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

  
  const HomepageNews = async() => {
      
      const posts = await getPosts()
      const postsByNewest = posts?.reverse()

      const lastNew = postsByNewest?.slice(0, 1)
      const lastTwoNews = postsByNewest?.slice(0, 2)
      const lastThreeNews = postsByNewest?.slice(0, 3)

  return (
    <section className={` px-4 my-8`}>
        <h2 className={`${clash.variable} font-title text-center font-semibold text-3xl uppercase mb-4`}>Actualités</h2>
        <p className={`${montserrat.variable} font-main my-12 text-center`}>Retrouvez ici les actualités concernant la formation, l’avion et tout ce qui touche à l’aviation !</p>

        {/* mobile display */}
        <div className='flex justify-center gap-8 sm:hidden'>
            {lastNew &&
                lastNew.map((item) =>
                <article key={item.id} className='w-full rounded-2xl shadow-md pb-8 flex flex-col justify-between min-w-[45%]'>
                    <Article img={item.imageUrl} title={item.title} description={item.description} content={item.contentMDX} id={item.id} />
                </article>
                )
            }
        </div>

        {/* tablette display */}
        <div className='hidden justify-center gap-8 sm:flex lg:hidden'>
            {lastTwoNews &&
                lastTwoNews.map((item) =>
                    <article key={item.id} className='w-full rounded-2xl shadow-md pb-8 max-w-sm flex flex-col justify-between min-w-[45%]'>
                        <Article img={item.imageUrl} title={item.title} description={item.description} content={item.contentMDX} id={item.id} />
                    </article>
                )
            }
        </div>

        {/* desktop display */}
        <div className='hidden justify-center gap-8 lg:flex'>
            {lastThreeNews &&
                lastThreeNews.map((item) =>
                    <article key={item.id} className='w-full rounded-2xl shadow-md pb-8 max-w-sm flex flex-col justify-between min-w-[30%]'>
                        <Article img={item.imageUrl} title={item.title} description={item.description} content={item.contentMDX} id={item.id} />
                    </article>
                )
            }
        </div>
        <Link href={`/blog`} className='bg-black rounded-3xl text-white py-3 px-12 block text-center mt-12 text-sm sm:text-base lg:text-xl lg:px-20 max-w-sm mx-auto'>Voir les actus</Link>

    </section>
  )
}

export default HomepageNews
