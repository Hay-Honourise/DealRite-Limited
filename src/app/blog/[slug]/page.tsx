import prisma from '@/lib/db'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Tag, User } from 'lucide-react'
import EngagementPanel from './EngagementPanel'

type Props = {
  params: Promise<{ slug: string }>
}

// Generate dynamic metadata for SEO performance
export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
    })

    if (!post) {
      return {
        title: 'Article Not Found | DealRite Realty Limited',
        description: 'The requested blog post could not be found.',
      }
    }

    return {
      title: `${post.title} | DealRite Insights`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [{ url: post.coverImage }],
        type: 'article',
        publishedTime: post.createdAt.toISOString(),
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: [post.coverImage],
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'DealRite Insights',
    }
  }
}

// Helper to format date
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Helper to calculate reading time
const getReadTime = (content: string) => {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params

  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      comments: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  // Trigger 404 page if post doesn't exist
  if (!post || !post.published) {
    notFound()
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 w-full">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        
        {/* Navigation Link back */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-slate-600 hover:text-orange-600 transition font-medium mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>

        {/* Article Meta Header */}
        <header className="mb-8">
          <span className="bg-orange-100 text-orange-700 px-3.5 py-1 rounded-full text-xs font-bold shadow-sm inline-flex items-center gap-1.5 uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" />
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-5 leading-tight tracking-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-slate-500 font-medium border-y border-slate-200 py-4">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-orange-600" />
              <span>DealRite Editorial</span>
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-600" />
              <span>{formatDate(post.createdAt)}</span>
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <span>{getReadTime(post.content)}</span>
            </span>
          </div>
        </header>

        {/* Cover Image Wrapper */}
        <div className="relative h-64 md:h-[450px] w-full rounded-3xl overflow-hidden mb-12 shadow-xl border border-slate-200 bg-slate-100">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 800px"
            className="object-cover"
          />
        </div>

        {/* Excerpt Blockquote */}
        <div className="mb-10 bg-orange-50/50 border-l-4 border-orange-600 p-6 rounded-r-2xl shadow-sm">
          <p className="text-lg text-slate-700 italic leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Raw HTML Rich Content with Safe Scoped CSS Styling */}
        <div 
          className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-lg text-slate-700 text-base md:text-lg leading-relaxed space-y-6
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:pt-6 [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-slate-100
            [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:pt-4 [&_h3]:pb-1
            [&_p]:text-slate-600 [&_p]:leading-relaxed [&_p]:mb-4
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-4 [&_ul_li]:text-slate-600
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:my-4 [&_ol_li]:text-slate-600
            [&_strong]:text-slate-900 [&_strong]:font-bold [&_a]:text-orange-600 [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Dynamic Engagement and Comments Widget */}
        <EngagementPanel 
          postId={post.id} 
          postSlug={post.slug}
          postTitle={post.title}
          initialLikes={post.likes}
          initialViews={post.views}
          initialComments={post.comments}
        />

        {/* Divider and Footer */}
        <footer className="mt-16 border-t border-slate-200 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} DealRite Realty Limited. All rights reserved.
          </p>
        </footer>

      </div>
    </div>
  )
}
