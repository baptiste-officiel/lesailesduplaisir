import PostDetailComp from '@/app/components/blog/PostDetailComp'
import React from 'react'
import { PostScheme } from '../../admin/blog/page'
import { RiArrowLeftSLine } from "react-icons/ri";
import Link from 'next/link';


type ParamsType = {
    params: {
        id: string
    }
}

const getPost = async(postId: string, cache: RequestCache) => {

    try {
        const res = await fetch(`${process.env.URL}/api/post/${postId}`, {cache: cache})
        .then((res) => res.json())
        .then((json) => PostScheme.parse(json));
        return res;
    } catch (error) {
        console.log("🚀 ~ getPlanes ~ error:", error)
    }
}

const PostDetail = async({params}: ParamsType) => {

    const postId = params.id;

    const post = await getPost(postId, 'default')
    console.log("🚀 ~ PostDetail ~ post:", post)
    
  return (
    <div className='margin-top-navbar flex-1 bg-white min-h-screen px-8 max-w-7xl mx-auto'>
        <Link href={'/blog'} className='flex items-center gap-2 mb-8'><RiArrowLeftSLine size={25} />Retour</Link>
        {post && 
            <PostDetailComp id={post.id} createdAt={post.createdAt} imageUrl={post.imageUrl} title={post.title} content={post.contentMDX} author={post.author.name} />
        }
    </div>
  )
}

export default PostDetail
