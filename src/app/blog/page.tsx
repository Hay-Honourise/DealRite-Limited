'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, Clock, ArrowRight, Search, Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Understanding Land Titles in Nigeria: C of O vs. Governor’s Consent',
    excerpt: 'Before purchasing land in Nigeria, you must understand the legal documentation. Here is a breakdown of the differences between Certificate of Occupancy and Governor’s Consent.',
    category: 'Documentation',
    date: 'June 28, 2026',
    author: 'Adewale Alao',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Why Agricultural Real Estate is the Smartest Passive Income in 2026',
    excerpt: 'Agricultural real estate is fast becoming the go-to for secure long-term investments. Learn how platforms like DealRite OwnFarm are helping investors earn solid annual ROIs.',
    category: 'Investment',
    date: 'June 22, 2026',
    author: 'Femi Johnson',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: '5 Crucial Things to Look Out for During a Real Estate Physical Inspection',
    excerpt: 'Never buy property blindly. When attending inspections, there are critical elements from layout to topography and access roads you must inspect. Read our checklists.',
    category: 'Buying Tips',
    date: 'June 15, 2026',
    author: 'Sarah Nwachukwu',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Moniya and Fiditi: The New Investment Hotspots of Oyo State',
    excerpt: 'With infrastructure projects like the Lagos-Ibadan rail line and road expansions, the corridors of Moniya and Fiditi are experiencing massive appreciation. Here is why you should buy now.',
    category: 'Hotspots',
    date: 'May 30, 2026',
    author: 'Adewale Alao',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  }
]

const CATEGORIES = ['All', 'Investment', 'Documentation', 'Buying Tips', 'Hotspots']

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 w-full">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-orange-600 font-semibold text-sm tracking-wider uppercase">DealRite Insights</span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-2 mb-4">Latest Blog & Articles</h1>
          <p className="text-slate-600">Stay informed with expert advice on real estate investing, land laws, documentation, and market trends.</p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                  selectedCategory === category
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white transition text-sm"
            />
          </div>
        </div>

        {/* Blog Post Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-orange-600 text-white px-3.5 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    {post.category}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" /> {post.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-orange-600 transition duration-300 mb-3 leading-snug">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed mb-6 text-sm flex-grow">
                    {post.excerpt}
                  </p>

                  <Link href={`#`} className="inline-flex items-center gap-2 text-orange-600 font-bold hover:gap-3 transition-all mt-auto group/btn">
                    Read Article <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
            <p className="text-slate-500 text-lg">No articles found matching your criteria.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-4 text-orange-600 font-bold hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
