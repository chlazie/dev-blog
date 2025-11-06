// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { incrementReadCount } from '@/lib/readTracker'

interface Post {
  id: string
  title: string
  slug: string
  content: string
  created_at: string
  thumbnail_url?: string
  author_name?: string
  author_avatar?: string
  excerpt?: string
}

interface PageProps {
  params: Promise<{ slug: string }>
}



export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!post) {
    return {
      title: 'Post Not Found - DevHood'
    }
  }

  return {
    title: `${post.title} - DevHood`,
    description: post.excerpt || `Read ${post.title} on DevHood community blog`,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  
  const { slug } = await params
  
  if (!slug) {
    notFound()
  }

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!post) {
    notFound()
  }


  await incrementReadCount(post.id)

  

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-slate-900">
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
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8 dark:text-white text-center">More Articles You Might Like</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* You can fetch related posts here if needed */}
            <div className="text-center py-12 text-slate-500">
              <p>More articles coming soon...</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-linear-to-r from-orange-500 to-orange-600 rounded-3xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Enjoyed this article?</h2>
            <p className="text-orange-100 mb-6">
              Join DevHood to write your own articles and share your knowledge with the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/create"
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