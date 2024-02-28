import { articleType } from '@/app/components/admin/blog/ArticleForm'
import ArticleFormEdit from '@/app/components/admin/blog/ArticleFormEdit'
import dynamic from 'next/dynamic'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'


const EditPost = () => {

    return (
        <div className='margin-top-navbar flex-1 bg-white min-h-screen px-8'>
            <h1 className='text-xl font-semibold'>Modifier l&apos;article</h1>
            <ArticleFormEdit />
        </div>
    )
}

export default EditPost