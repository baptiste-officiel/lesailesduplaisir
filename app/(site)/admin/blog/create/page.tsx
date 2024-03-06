import { SessionType } from '@/app/(site)/dashboard/page';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ArticleForm from '@/app/components/admin/blog/ArticleForm'
import { getServerSession } from 'next-auth';
import React from 'react'

const CreateBlog = async() => {

    const session: SessionType | null = await getServerSession(authOptions)!;
    const authorId = session?.user?.id!

  return (
    <div className='margin-top-navbar bg-white min-h-screen px-8 my-12'>
      <ArticleForm authorId={authorId} />
    </div>
  )
}

export default CreateBlog
