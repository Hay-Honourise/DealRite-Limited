'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Search, Tag, Inbox } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type BlogPost = {
  id: number
  title: string
  slug: string
  excerpt: string
  coverImage: string
  content: string
  category: string
  published: boolean
  createdAt: Date
  updatedAt: Date
}

type CategoryType = {
  id: number
  name: string
}

type BlogGridProps = {
  initialPosts: BlogPost[]
  categories: CategoryType[]
}

export default function BlogGrid({ initialPosts, categories }: BlogGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categoriesList = ['All', ...categories.map(c => c.name)]

  // Client-side search and category filtering
  const filteredPosts = initialPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Format date cleanly
  const formatDate = (dateValue: Date | string) => {
    const date = new Date(dateValue)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Calculate dynamic reading time
  const getReadTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  return (
    <div className="w-full">
      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
        {/* Categories Selector */}
        <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
          {categoriesList.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 relative ${
                selectedCategory === category
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white transition text-xs font-semibold"
          />
        </div>
      </div>

      {/* Grid container */}
      <AnimatePresence mode="popLayout">
        {filteredPosts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post) => (
              <motion.article 
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={post.id} 
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group border border-slate-100/50"
              >
                {/* Image wrapper */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </div>
                </div>
                
                {/* Details */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-orange-600" /> {formatDate(post.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-orange-600" /> {getReadTime(post.content)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition duration-300 mb-3 leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed mb-6 text-xs font-medium line-clamp-3">
                    {post.excerpt}
                  </p>

                  <Link 
                    href={`/blog/${post.slug}`} 
                    className="inline-flex items-center gap-1.5 text-orange-600 font-extrabold text-xs uppercase tracking-wider hover:gap-2.5 transition-all mt-auto group/btn"
                  >
                    Read Article <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center"
          >
            <div className="p-4 bg-slate-50 text-slate-400 rounded-full mb-4">
              <Inbox className="w-8 h-8" />
            </div>
            <p className="text-slate-500 text-lg font-bold">No articles found matching your criteria.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-3 text-orange-600 font-bold text-sm hover:underline"
            >
              Reset all filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
