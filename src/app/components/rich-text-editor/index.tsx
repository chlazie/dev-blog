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
import { toast } from 'sonner'

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

  const handleImageUpload = async (file: File): Promise<void> => {
    const uploadToast = toast.loading('Uploading image...', {
      description: 'Please wait while we upload your image'
    })

    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Invalid file type. Please select an image file (JPEG, PNG, GIF, etc.)')
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File too large. Please select an image smaller than 5MB')
      }

      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(`public/${Date.now()}-${file.name}`, file)

      if (error) {
        throw new Error(`Upload failed: ${error.message}`)
      }

      const { data: publicUrlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(data.path)

      const imageUrl = publicUrlData.publicUrl
      editor?.chain().focus().setImage({ src: imageUrl }).run()

      toast.success('Image uploaded successfully!', {
        description: 'Your image has been added to the editor',
        id: uploadToast
      })
    } catch (error) {
      toast.error('Upload failed', {
        description: error instanceof Error ? error.message : 'Failed to upload image',
        id: uploadToast
      })
      console.error('Image upload error:', error)
      throw error // Re-throw to be handled in BlogMenuBar
    }
  }

  // 📝 Publish with title + slug
  const handlePublish = async (): Promise<void> => {
    if (!editor) {
      throw new Error('Editor not available')
    }

    if (!title.trim()) {
      throw new Error('Please add a title for your article')
    }

    // Validate content length
    const html = editor.getHTML()
    const textContent = editor.getText()
    if (textContent.trim().length < 50) {
      throw new Error('Article content seems too short. Please write at least 50 characters.')
    }

    const publishToast = toast.loading('Publishing your article...', {
      description: 'This may take a moment'
    })

    try {
      // Get the user
      const { data: userData, error: userError } = await supabase.auth.getUser()
      const user = userData?.user

      if (userError || !user) {
        throw new Error('You must be logged in to publish articles')
      }

      const slug = slugify(title)
      const excerpt = getExcerpt(html, 180)

      // Extract first image for thumbnail if any
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = html
      const firstImg = tempDiv.querySelector('img')
      const thumbnail_url = firstImg?.getAttribute('src') || null

      // Check if slug already exists
      const { data: existingPost } = await supabase
        .from('posts')
        .select('slug')
        .eq('slug', slug)
        .single()

      if (existingPost) {
        throw new Error('A post with this title already exists. Please choose a different title.')
      }

      const { error } = await supabase.from('posts').insert([
        {
          title: title.trim(),
          content: html,
          slug,
          excerpt,
          thumbnail_url,
          author_id: user.id,
          author_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous',
          author_avatar: user.user_metadata?.avatar_url || '/default-avatar.png',
          created_at: new Date().toISOString(),
          read_count: 0,
        },
      ])

      if (error) {
        console.error('Supabase error:', error)
        throw new Error(`Failed to publish: ${error.message}`)
      }

      // Success - clear form and show success message
      setTitle('')
      editor.commands.clearContent()
      
      toast.success('Article published successfully! 🎉', {
        description: 'Your article is now live on the blog',
        id: publishToast,
        duration: 6000,
        action: {
          label: 'View Blog',
          onClick: () => window.open('/blog', '_blank')
        }
      })

      // Optional: Redirect to blog after successful publish
      setTimeout(() => {
        window.location.href = '/blog'
      }, 3000)

    } catch (error) {
      toast.error('Failed to publish', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        id: publishToast
      })
      console.error('Publish error:', error)
      throw error // Re-throw to be handled in BlogMenuBar
    }
  }

  // Handle title change with character limit
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length <= 100) { // Limit title to 100 characters
      setTitle(value)
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 border rounded-md overflow-hidden shadow-sm bg-white dark:bg-slate-900">
      {/* Title Section */}
      <div className="p-4 border-b bg-slate-50 dark:bg-slate-800">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter your post title... (max 100 characters)"
          className="w-full text-2xl font-semibold bg-transparent border-none outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-white"
          maxLength={100}
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {title.length}/100 characters
          </span>
          {title.length > 80 && (
            <span className="text-sm text-orange-500">
              Getting long! Consider a shorter title for better SEO
            </span>
          )}
        </div>
      </div>

      {/* Menu Bars */}
      <BlogMenuBar onPublish={handlePublish} onImageUpload={handleImageUpload} />
      <div className="border-b bg-white dark:bg-slate-800">
        <MenuBar editor={editor} />
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />

      {/* Writing Tips */}
      <div className="p-4 border-t bg-slate-50 dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-400">
        <h4 className="font-semibold mb-2">💡 Writing Tips:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Use headings to structure your content</li>
          <li>Add images to make your article more engaging</li>
          <li>Keep paragraphs short and focused</li>
          <li>Use code blocks for technical examples</li>
        </ul>
      </div>
    </div>
  )
}