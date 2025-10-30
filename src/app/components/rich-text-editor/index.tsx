'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import React from 'react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import MenuBar from './menu-bar'
import BlogMenuBar from './BlogMenuBar'
import { supabase } from '@/lib/supabaseClient'

export default function Create() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: '<p>Hello World! 🌎️</p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'min-h-[600px] border rounded-md bg-slate-50 px-2 py-2 dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:outline-none',
      },
    },
  })

  // 🖼️ Image upload
  const handleImageUpload = async (file: File) => {
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(`public/${Date.now()}-${file.name}`, file)

    if (error) {
      console.error('Error uploading image:', error)
      alert('Image upload failed 😭')
      return
    }

    const { data: publicUrlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(data.path)

    const imageUrl = publicUrlData.publicUrl
    editor?.chain().focus().setImage({ src: imageUrl }).run()
  }

  // 📝 Publish post
  const handlePublish = async () => {
    if (!editor) return

    const html = editor.getHTML()
    const { error } = await supabase.from('posts').insert([
      {
        title: 'Untitled Post',
        content: html,
        created_at: new Date(),
      },
    ])

    if (error) {
      console.error('Error publishing:', error)
      alert('Failed to publish 😢')
    } else {
      alert('Post published successfully! 🎉')
      editor.commands.clearContent()
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 border rounded-md overflow-hidden shadow-sm">
      <BlogMenuBar
        onPublish={handlePublish}
        onImageUpload={handleImageUpload}
      />
      <div className="border-b">
        <MenuBar editor={editor} />
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
