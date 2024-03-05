'use client'

import { articleType } from '@/app/components/admin/blog/ArticleForm'
import dynamic from 'next/dynamic'
import { useParams, useRouter } from 'next/navigation'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import Uploader from './Uploader'
import { MDXEditorMethods } from '@mdxeditor/editor'

const EditorComp = dynamic(() => import('./EditorComponent').then((module) => module.default), { ssr: false });



const ArticleFormEdit = () => {
    
    const params = useParams()
    const paramsId = params.id as unknown as string
    
    const router = useRouter();  

    const markdown = `Rédigez l\'article ici`;

  const [ articleData, setArticleData ] = useState<articleType>({
    title: '',
    description: '',
    imageUrl: '',
    })

    const ref = useRef<MDXEditorMethods>(null);
  
    const getPost = async(paramsId: string, cache: RequestCache) => {    
        try {
        const res = await fetch(`/api/post/${paramsId}`, {cache: cache})
    
        if ((res.ok)) {
            const data = await res.json()
            if (data) {
                setArticleData({
                    title: data.title,
                    description: data.description,
                    imageUrl: data.imageUrl,
                })
                if(ref.current){
                    ref.current.setMarkdown(data.contentMDX)
                }
            }   
            return data;
        } else {
            if (res.status === 404) throw new Error('404, Not found');
            if (res.status === 500) throw new Error('500, internal server error');
            // For any other server error
            throw new Error(`${res.status}`);
        }
        } catch (error) {
        alert(`Erreur ${error}`)
        }  
    }
  
    useEffect(() => {
      getPost(paramsId, 'no-store')
    }, [paramsId])

    const handleUploadImage = (data: string) => {
        setArticleData({...articleData, imageUrl: data })
    }

    const handleSubmit = async (e: React.FormEvent, id: string) => {
        e.preventDefault();

        if (!ref.current) return; // Vérifiez si la référence est définie

        const title = articleData.title;
        const imageUrl = articleData.imageUrl;
        const contentMDX = ref.current.getMarkdown();
        const body = { title, imageUrl, contentMDX };


        if (imageUrl) {
            try {
                const res = await fetch(`/api/post/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(body)
                });
            if (res.ok) {
                router.push('/admin/blog');
                setArticleData({
                    title: '',
                    description: '',
                    imageUrl: ''
                });
                ref.current.setMarkdown('');
                router.refresh()
                } else {
                if (res.status === 404) throw new Error('404, Not found');
                if (res.status === 500) throw new Error('500, internal server error');
                // For any other server error
                throw new Error(`${res.status}`);
                }
            } catch (error) {
                alert(`Erreur ${error}`)
            }  
    };
}

    return (
        <form onSubmit={(e: React.FormEvent) => handleSubmit(e, paramsId)}>
                    <div className="flex flex-col my-8">
                        <label htmlFor="title" className="font-semibold">Titre de l&apos;article</label>
                        <input value={articleData.title} type="text" name="title" id="title" className="border-2 border-black rounded-lg mt-2 px-3 py-1" onChange={(e) => setArticleData({...articleData, title: e.currentTarget.value})} />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold">Image</label>
                        <Uploader handleUploadImage={handleUploadImage} image={articleData.imageUrl} />
                    </div>
                    <Suspense fallback={null} >
                        <EditorComp markdown={markdown} editorRef={ref} /> {/* Passez la référence au composant EditorComp */}
                    </Suspense>
                <button className='px-3 py-1 bg-black text-white rounded-md' type='submit'>Enregistrer</button>
                </form>
    )
}

export default ArticleFormEdit