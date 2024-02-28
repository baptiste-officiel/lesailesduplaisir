'use client'

import React, { useEffect } from 'react';
import { MDXEditor, MDXEditorMethods, headingsPlugin, listsPlugin, quotePlugin, thematicBreakPlugin, markdownShortcutPlugin, imagePlugin, toolbarPlugin, UndoRedo, BoldItalicUnderlineToggles, BlockTypeSelect, InsertImage, Separator } from "@mdxeditor/editor"

interface EditorProps {
    markdown: string;
    editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
    onReady?: () => void;
}

const Editor: React.FC<EditorProps> = ({ markdown, editorRef, onReady }) => {
    console.log("🚀 ~ onReady:", onReady)
    console.log("🚀 ~ editorRef:", editorRef)
    console.log("🚀 ~ markdown:", markdown)
    // useEffect(() => {
    //     if (editorRef && editorRef.current && onReady) {
    //         onReady();
    //     }
            
    // }, [editorRef, onReady]);

    return (
        <>
            <MDXEditor
                ref={editorRef}
                markdown={markdown}
                className="my-8 border-2 rounded-lg border-black"
                contentEditableClassName="prose"
                plugins={[
                    headingsPlugin(),
                    listsPlugin(),
                    quotePlugin(),
                    thematicBreakPlugin(),
                    markdownShortcutPlugin(),
                    imagePlugin({
                        imageUploadHandler: () => {
                            return Promise.resolve('https://picsum.photos/200/300')
                        },
                        imageAutocompleteSuggestions: ['https://picsum.photos/200/300', 'https://picsum.photos/200']
                    }),
                    toolbarPlugin({
                        toolbarContents: () => (
                            <>
                                {' '}
                                <UndoRedo />
                                <BoldItalicUnderlineToggles />
                                <BlockTypeSelect />
                                <InsertImage />
                            </>
                        )
                    })
                ]}
            />
            {/* <button onClick={() => editorRef?.current?.setMarkdown('new markdown')}>Set new markdown</button>
            <button onClick={() => console.log(editorRef?.current?.getMarkdown())}>Get markdown</button> */}
        </>
    );
};

export default Editor;
