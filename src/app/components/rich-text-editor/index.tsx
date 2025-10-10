'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import React from 'react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './menu-bar'

export default function Create() {
   const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'min-h-[900px] border rounded-md bg-slate-50 px-2 py-2 dark:bg-slate-800 text-slate-900 dark:text-slate-50',
      },
    }
  })

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} /> 
    </div>
  )
}


