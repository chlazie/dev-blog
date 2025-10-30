'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import React, { useState } from 'react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import BlogMenuBar from './BlogMenuBar'
import MenuBar from './menu-bar'
import { supabase } from '@/lib/supabaseClient'

// 🌀 Helper to generate a clean slug from the title
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // replace spaces/punctuation
    .replace(/(^-|-$)+/g, '')     // trim hyphens
    .trim()

export default function Create() {
  const getExcerpt = (html: string, length = 150) => {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    const text = tmp.textContent || tmp.innerText || ''
    return text.substring(0, length) + (text.length > length ? '…' : '')
  }
  
  const editor = useEditor({
    extensions: [StarterKit, Underline, Image, TextAlign.configure({ types: ['heading', 'paragraph'] })],
    content: '<p>Start writing your masterpiece... ✨</p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'min-h-[600px] border rounded-md bg-slate-50 px-3 py-2 dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:outline-none',
      },
    },
  })

  const [title, setTitle] = useState('')

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

  // 📝 Publish with title + slug
  const handlePublish = async () => {
    if (!editor) return
    if (!title.trim()) return alert('Please add a title 📝')
  
    // get the user
    const { data: userData, error: userError } = await supabase.auth.getUser()
    const user = userData?.user
  
    if (userError || !user) {
      console.error('No user or error fetching user:', userError)
      return alert('You must be logged in to publish!')
    }
  
    const html = editor.getHTML()
    const slug = slugify(title)
    const excerpt = getExcerpt(html, 180)
  
    // extract first image for thumbnail if any
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    const firstImg = tempDiv.querySelector('img')
    const thumbnail_url = firstImg?.getAttribute('src') || null
  
    const { error } = await supabase.from('posts').insert([
      {
        title,
        content: html,
        slug,
        excerpt,
        thumbnail_url,
        author_id: user.id,
        author_name: user.user_metadata?.full_name || user.email,
        author_avatar: user.user_metadata?.avatar_url || '/default-avatar.png',
        created_at: new Date(),
      },
    ])
  
    if (error) {
      console.error('Error publishing:', error)
      alert('Failed to publish 😢')
    } else {
      alert('Post published successfully! 🎉')
      setTitle('')
      editor.commands.clearContent()
    }
  }
  
  
  return (
    <div className="max-w-3xl mx-auto mt-10 border rounded-md overflow-hidden shadow-sm">
      <div className="p-4 border-b bg-slate-50 dark:bg-slate-800">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your post title..."
          className="w-full text-2xl font-semibold bg-transparent border-none outline-none placeholder:text-slate-400"
        />
      </div>

      <BlogMenuBar onPublish={handlePublish} onImageUpload={handleImageUpload} />
      <div className="border-b">
        <MenuBar editor={editor} />
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
