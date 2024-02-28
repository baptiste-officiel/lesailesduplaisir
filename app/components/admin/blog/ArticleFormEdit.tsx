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
    console.log("🚀 ~ EditPlane ~ params:", params.id)
    
    const router = useRouter();  

    const markdown = `Rédigez l\'article ici`;

  const [ articleData, setArticleData ] = useState<articleType>({
    title: '',
    imageUrl: '',
    })
    console.log("🚀 ~ ArticleFormEdit ~ articleData:", articleData)

    const ref = useRef<MDXEditorMethods>(null);
  
  const getPost = async(paramsId: string, cache: RequestCache) => {

      
      try {
     const res = await fetch(`/api/post/${paramsId}`, {cache: cache})
  
    const data = await res.json()
    // .then((res) => res.json())
    console.log("🚀 ~ getPost ~ data:", data)

    if (data) {
        setArticleData({
            title: data.title,
            imageUrl: data.imageUrl,
        })
        if(ref.current){
            ref.current.setMarkdown(data.contentMDX)
        }
    }
  
    return data;
    } catch (error) {
      console.log("🚀 ~ getPlanes ~ error:", error)
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
                const data = await res.json();
                setArticleData({
                    title: '',
                    imageUrl: ''
                });
                ref.current.setMarkdown('');
                // toast.success('Let\'s go')
                router.refresh();
                router.push(('/admin/blog'));
            } catch (error) {
                console.log("🚀 ~ error:", error);
            }
        }
    };

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