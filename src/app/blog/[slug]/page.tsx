// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

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
  params: {
    slug: string
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
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

// Generate static paths for better performance
export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from('posts')
    .select('slug')

  return posts?.map((post) => ({
    slug: post.slug,
  })) || []
}

export default async function BlogPostPage({ params }: PageProps) {
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!post) {
    notFound()
  }

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

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
              {post.author_name && (
                <>
                  <div className="flex items-center gap-2">
                    <span>{post.author_name}</span>
                  </div>
                  <span>•</span>
                </>
              )}
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

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold transition"
            >
              ← Back to all posts
            </Link>
          </div>
        </article>
      </div>
      <Footer />
    </>
  )
}