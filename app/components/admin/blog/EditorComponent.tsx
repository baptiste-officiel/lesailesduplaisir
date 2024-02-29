'use client'

import React, { useEffect } from 'react';
import { MDXEditor, MDXEditorMethods, headingsPlugin, listsPlugin, quotePlugin, thematicBreakPlugin, markdownShortcutPlugin, imagePlugin, toolbarPlugin, UndoRedo, BoldItalicUnderlineToggles, BlockTypeSelect, InsertImage } from "@mdxeditor/editor"

interface EditorProps {
    markdown: string;
    editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
    onReady?: () => void;
}

const Editor: React.FC<EditorProps> = ({ markdown, editorRef, onReady }) => {

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
        </>
    );
};

export default Editor;
