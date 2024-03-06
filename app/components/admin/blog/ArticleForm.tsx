'use client'

import React, { useState, useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { MDXEditorMethods } from '@mdxeditor/editor';
import Uploader from './Uploader';
import { useRouter } from 'next/navigation';
import toast from 'sonner';

export type articleType = {
    title: string;
    description: string;
    imageUrl: string;
}

const EditorComp = dynamic(() => import('./EditorComponent').then((module) => module.default), { ssr: false });

const markdown = `Hello`;

const ArticleForm = ({authorId}: {authorId: number}) => {

    const [ articleData, setArticleData ] = useState<articleType>({
        title: '',
        description: '',
        imageUrl: '',
    })

    const ref = useRef<MDXEditorMethods>(null);

    const router = useRouter();

    const handleUploadImage = (data: string) => {
        setArticleData({...articleData, imageUrl: data })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!ref.current) return; // Vérifiez si la référence est définie

        const title = articleData.title;
        const description = articleData.description;
        const imageUrl = articleData.imageUrl;
        const contentMDX = ref.current.getMarkdown();
        const body = { title, description, imageUrl, contentMDX, authorId };

        console.log("🚀 ~ handleSubmit ~ body:", body)

        if (imageUrl) {
            try {
                const res = await fetch('/api/post', {
                    method: 'POST',
                    body: JSON.stringify(body)
                });
                if (!res.ok) {
                    throw new Error(`${res.status}, ${res.statusText}`);
                }
                router.push('/admin/blog');
                setArticleData({
                title: '',
                description: '',
                imageUrl: ''
                });
                ref.current.setMarkdown('');
                router.refresh()
                } catch (error) {
                    if (error instanceof Error) {
                        throw new Error(`Error: ${error.message}`);
                    } else {
                        throw new Error('An unexpected error occurred');
                    }
                }
        }
    };

    const descriptionLength = articleData.description.length;

    return (
        <div>
            {/* {(title !== '' && editorReady) && ( */}
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col my-8">
                        <label htmlFor="title" className="font-semibold">Titre de l&apos;article</label>
                        <input type="text" name="title" id="title" className="border-2 border-black rounded-lg mt-2 px-3 py-1" onChange={(e) => setArticleData({...articleData, title: e.currentTarget.value})} />
                    </div>
                    <div className="flex flex-col my-8">
                        <label htmlFor="description" className="font-semibold flex justify-between">Description rapide de l&apos;article <span className='text-sm font-light'>{descriptionLength} / 100 caractères max</span></label>
                        <input type="text" maxLength={100} name="description" id="description" className="border-2 border-black rounded-lg mt-2 px-3 py-1" onChange={(e) => setArticleData({...articleData, description: e.currentTarget.value})} />
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
            {/* )} */}
        </div>
    );
};

export default ArticleForm;
