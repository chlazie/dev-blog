'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
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
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPostAndRelated = async () => {
      if (!slug) {
        console.log('No slug found')
        setLoading(false)
        return
      }

      console.log('Fetching post for slug:', slug)

      try {
        // Fetch the main post
        const { data: postData, error: postError } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .single()

        if (postError) {
          console.error('Error fetching post:', postError)
        } else {
          setPost(postData)

          // Fetch related posts (excluding current post)
          const { data: relatedData, error: relatedError } = await supabase
            .from('posts')
            .select('*')
            .neq('slug', slug)
            .order('created_at', { ascending: false })
            .limit(3)

          if (relatedError) console.error('Error fetching related posts:', relatedError)
          else setRelatedPosts(relatedData || [])
        }
      } catch (error) {
        console.error('Unexpected error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPostAndRelated()
  }, [slug])

  if (loading) return (
    <div>
      <Header />
      <div className="flex justify-center items-center min-h-screen text-slate-400 text-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mr-3"></div>
        Loading article...
      </div>
    </div>
  )

  if (!post) return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">😢</div>
        <h1 className="text-4xl font-bold mb-4 dark:text-white">Post Not Found</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          The article you're looking for doesn't exist or may have been moved.
        </p>
        <Link
          href="/blog"
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
        >
          Back to Blog
        </Link>
      </div>
      <Footer />
    </div>
  )

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-slate-900">
        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
            <Link href="/" className="hover:text-orange-500 transition">Home</Link>
            <span>→</span>
            <Link href="/blog" className="hover:text-orange-500 transition">Blog</Link>
            <span>→</span>
            <span className="text-slate-700 dark:text-slate-300">Article</span>
          </nav>

          {/* Featured Image */}
          {post.thumbnail_url && (
            <div className="mb-8 rounded-2xl overflow-hidden">
              <Image
                src={post.thumbnail_url}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          )}

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Image
                  src={post.author_avatar || '/default-avatar.png'}
                  alt={post.author_name || 'Author'}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span>{post.author_name || 'Unknown Author'}</span>
              </div>
              <span>•</span>
              <time dateTime={post.created_at}>
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none
                      prose-headings:text-slate-900 dark:prose-headings:text-white
                      prose-p:text-slate-700 dark:prose-p:text-slate-300
                      prose-a:text-orange-500 hover:prose-a:text-orange-600
                      prose-code:bg-slate-100 dark:prose-code:bg-slate-800
                      prose-code:text-slate-800 dark:prose-code:text-slate-200
                      prose-pre:bg-slate-900 prose-pre:text-slate-200
                      prose-img:rounded-lg prose-img:shadow-md
                      prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50 dark:prose-blockquote:bg-slate-800"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src={post.author_avatar || '/default-avatar.png'}
                  alt={post.author_name || 'Author'}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold dark:text-white">{post.author_name || 'Unknown Author'}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">DevHood Community Member</p>
                </div>
              </div>
              
              <Link
                href="/blog"
                className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition font-semibold"
              >
                ← Back to Blog
              </Link>
            </div>
          </footer>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold mb-8 dark:text-white text-center">More Articles You Might Like</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-lg transition group"
                >
                  <Image
                    src={relatedPost.thumbnail_url || '/placeholder.png'}
                    alt={relatedPost.title}
                    width={400}
                    height={200}
                    className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-orange-500 transition dark:text-white">
                      {relatedPost.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                      <span>{relatedPost.author_name || 'Unknown Author'}</span>
                      <span>{new Date(relatedPost.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Enjoyed this article?</h2>
            <p className="text-orange-100 mb-6">
              Join DevHood to write your own articles and share your knowledge with the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contribute"
                className="bg-white text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 transition font-semibold"
              >
                Write an Article
              </Link>
              <Link
                href="/join"
                className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-orange-600 transition font-semibold"
              >
                Join Community
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}