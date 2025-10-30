'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  slug: string
  content: string
  created_at: string
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error) console.error('Error fetching post:', error)
      else setPost(data)
      setLoading(false)
    }

    if (slug) fetchPost()
  }, [slug])

  if (loading) return <div className="text-center py-10 text-slate-400">Loading...</div>
  if (!post) return <div className="text-center py-10 text-slate-400">Post not found 😢</div>

  return (
    <article className="max-w-3xl mx-auto px-4 py-10 prose dark:prose-invert prose-img:rounded-lg">
      <Link href="/blog" className="text-sm text-blue-500 hover:underline">
        ← Back to all posts
      </Link>
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <p className="text-slate-500 text-sm mb-6">
        {new Date(post.created_at).toLocaleDateString()}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
