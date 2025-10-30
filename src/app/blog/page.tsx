'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Post {
  id: string
  title: string
  slug: string
  content: string
  thumbnail_url?: string
  author_name?: string
  author_avatar?: string
  excerpt?: string
  created_at: string
}

export default function BlogFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) console.error('Error fetching posts:', error)
      else setPosts(data)
      setLoading(false)
    }

    fetchPosts()
  }, [])

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-slate-400 text-lg">
        Loading your feed...
      </div>
    )

  if (posts.length === 0)
    return (
      <div className="text-center text-slate-400 py-20">
        No posts yet 😢
      </div>
    )

  // Featured = first 3 posts
  const featured = posts.slice(0, 3)
  const rest = posts.slice(3)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-16">
      {/* 🌟 Featured Slider */}
      <section className="overflow-x-auto flex gap-6 pb-4 snap-x snap-mandatory">
        {featured.map((post, i) => (
          <motion.div
            key={post.id}
            className="relative min-w-[90%] sm:min-w-[60%] md:min-w-[45%] lg:min-w-[33%] snap-center rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
            whileHover={{ scale: 1.02 }}
          >
            <Link href={`/blog/${post.slug}`}>
              <Image
                src={post.thumbnail_url || '/placeholder.png'}
                alt={post.title}
                width={800}
                height={500}
                className="w-full h-64 object-cover group-hover:opacity-80 transition"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <p className="text-sm opacity-80">
                  {new Date(post.created_at).toLocaleDateString()} — {post.author_name || 'Unknown'}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* 📰 Main Feed */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rest.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ y: -4 }}
            className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
          >
            <Link href={`/blog/${post.slug}`}>
              {post.thumbnail_url && (
                <Image
                  src={post.thumbnail_url}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{post.title}</h3>
                <p className="text-slate-500 text-sm mb-3">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
                <p className="text-slate-600 dark:text-slate-300 line-clamp-3">
                  {post.excerpt || 'No excerpt available.'}
                </p>
                {post.author_avatar && (
                  <div className="flex items-center gap-2 mt-4">
                    <Image
                      src={post.author_avatar}
                      alt={post.author_name || 'Author'}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    <span className="text-sm text-slate-500">{post.author_name}</span>
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </section>
    </div>
  )
}
