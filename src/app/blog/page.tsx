// app/blog/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

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
  read_count?: number
}

export default function BlogFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('read_count', { ascending: false })
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching posts:', error)
      } else {
        setPosts(data || [])
      }
      setLoading(false)
    }

    fetchPosts()
  }, [])

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.min(mostReadPosts.length, 3))
    }, 5000)
    return () => clearInterval(interval)
  }, [posts])

  const filteredPosts = posts.filter(post =>
    post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author_name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Get top 3 most read posts (or most recent if no read_count)
  const mostReadPosts = posts
    .sort((a, b) => (b.read_count || 0) - (a.read_count || 0))
    .slice(0, 3)

  if (loading) return (
    <div>
      <Header />
      <div className="flex justify-center items-center min-h-screen text-slate-400 text-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mr-3"></div>
        Loading articles...
      </div>
    </div>
  )

  return (
    <>
      <Header />
      
      {/* Hero Section - Keep your existing design */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Developer Blog</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Discover articles, tutorials, and insights from the DevHood community
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <div className="absolute right-3 top-3 text-slate-400">
                🔍
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Most Read Articles Banner Slider */}
      {mostReadPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold dark:text-white flex items-center">
              <span className="bg-red-500 text-white p-2 rounded-lg mr-3">🔥</span>
              Most Read Articles
            </h2>
            <div className="flex space-x-2">
              {mostReadPosts.slice(0, 3).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition ${
                    currentSlide === index ? 'bg-orange-500' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl overflow-hidden shadow-2xl">
            {/* Slider Container */}
            <div className="relative h-80 md:h-96">
              {mostReadPosts.slice(0, 3).map((post, index) => (
                <div
                  key={post.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    currentSlide === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="grid md:grid-cols-2 h-full">
                    {/* Text Content */}
                    <div className="flex flex-col justify-center p-8 md:p-12 text-white">
                      <div className="mb-4">
                        <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                          🔥 Most Read
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 line-clamp-3">
                        {post.title}
                      </h3>
                      <p className="text-orange-100 mb-6 line-clamp-3">
                        {post.excerpt || 'No excerpt available.'}
                      </p>
                      <div className="flex items-center gap-4 text-orange-100 mb-6">
                        <div className="flex items-center gap-2">
                          <Image
                            src={post.author_avatar || '/default-avatar.png'}
                            alt={post.author_name || 'Author'}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <span>{post.author_name || 'Unknown Author'}</span>
                        </div>
                        <span>•</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        {post.read_count && (
                          <>
                            <span>•</span>
                            <span>👁️ {post.read_count} reads</span>
                          </>
                        )}
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="bg-white text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 transition font-semibold inline-flex items-center gap-2 w-fit"
                      >
                        Read Article →
                      </Link>
                    </div>

                    {/* Image */}
                    <div className="relative hidden md:block">
                      <Image
                        src={post.thumbnail_url || '/placeholder.png'}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-l from-orange-500/50 to-transparent" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition backdrop-blur-sm"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition backdrop-blur-sm"
            >
              →
            </button>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Latest Articles */}
        {filteredPosts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8 dark:text-white flex items-center">
              <span className="bg-orange-500 text-white p-2 rounded-lg mr-3">📰</span>
              Latest Articles
            </h2>
            <div className="grid lg:grid-cols-3 gap-6">
              {filteredPosts.slice(0, 3).map((post, index) => (
                <article
                  key={post.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative overflow-hidden">
                      <Image
                        src={post.thumbnail_url || '/placeholder.png'}
                        alt={post.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-orange-500 transition dark:text-white">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                        {post.excerpt || 'No excerpt available.'}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Image
                            src={post.author_avatar || '/default-avatar.png'}
                            alt={post.author_name || 'Author'}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {post.author_name || 'Unknown Author'}
                          </span>
                        </div>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <h2 className="text-3xl font-bold mb-8 dark:text-white flex items-center">
            <span className="bg-slate-500 text-white p-2 rounded-lg mr-3">📚</span>
            All Articles
            {searchQuery && (
              <span className="text-lg font-normal ml-4 text-slate-500 dark:text-slate-400">
                ({filteredPosts.length} results)
              </span>
            )}
          </h2>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">😢</div>
              <h3 className="text-2xl font-bold mb-2 dark:text-white">No posts found</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {searchQuery ? 'Try adjusting your search terms' : 'Be the first to write a post!'}
              </p>
              {!searchQuery && (
                <Link
                  href="/create"
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
                >
                  Write Your First Post
                </Link>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.slice(3).map((post) => (
                <article
                  key={post.id}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-lg transition-all group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <Image
                      src={post.thumbnail_url || '/placeholder.png'}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="p-5">
                      <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-orange-500 transition dark:text-white">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 line-clamp-2">
                        {post.excerpt || 'No excerpt available.'}
                      </p>
                      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                        <span>{post.author_name || 'Unknown Author'}</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Share Your Knowledge?</h2>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already writing articles, sharing tutorials, and helping others grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/create"
              className="bg-white text-orange-600 px-8 py-4 rounded-xl hover:bg-orange-50 transition font-semibold"
            >
              Write Your First Article
            </Link>
            <Link
              href="/join"
              className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-orange-600 transition font-semibold"
            >
              Join DevHood
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}