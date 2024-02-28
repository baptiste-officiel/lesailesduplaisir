'use client'

import React, { useState, useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { MDXEditorMethods } from '@mdxeditor/editor';
import Uploader from './Uploader';
import { useRouter } from 'next/navigation';
import toast from 'sonner';

export type articleType = {
    title: string;
    imageUrl: string;
}

const EditorComp = dynamic(() => import('./EditorComponent').then((module) => module.default), { ssr: false });

const markdown = `Hello`;

const ArticleForm = ({authorId}: any) => {

    const [ articleData, setArticleData ] = useState<articleType>({
        title: '',
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
        const imageUrl = articleData.imageUrl;
        const contentMDX = ref.current.getMarkdown();
        const body = { title, imageUrl, contentMDX, authorId };


        if (imageUrl) {
            try {
                const res = await fetch('/api/post', {
                    method: 'POST',
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
                // console.log("🚀 ~ error:", error);
            }
        }
    };

    return (
        <div>
            {/* {(title !== '' && editorReady) && ( */}
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col my-8">
                        <label htmlFor="title" className="font-semibold">Titre de l&apos;article</label>
                        <input type="text" name="title" id="title" className="border-2 border-black rounded-lg mt-2 px-3 py-1" onChange={(e) => setArticleData({...articleData, title: e.currentTarget.value})} />
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
