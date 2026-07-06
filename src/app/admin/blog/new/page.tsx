'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, Send, Eye, Edit2, Loader2, FileText, CheckCircle, 
  AlertCircle, MessageSquare, PlusCircle, Trash2, Heart, ExternalLink, Calendar, Tag, Check, X, Sun, Moon 
} from 'lucide-react'
import Image from 'next/image'

type CommentType = {
  id: number
  postId: number
  authorName: string
  content: string
  createdAt: string
  postTitle?: string
  postSlug?: string
}

type BlogPost = {
  id: number
  title: string
  slug: string
  excerpt: string
  coverImage: string
  content: string
  category: string
  published: boolean
  views: number
  likes: number
  createdAt: string
  comments: CommentType[]
  _count?: {
    comments: number
  }
}

type CategoryType = {
  id: number
  name: string
}

export default function NewBlogPostPage() {
  const router = useRouter()
  
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  
  // Dashboard & Editor states
  const [currentView, setCurrentView] = useState<'create' | 'manage' | 'comments' | 'categories'>('create')
  const [activePreviewTab, setActivePreviewTab] = useState<'edit' | 'preview'>('edit')
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    coverImage: '',
    excerpt: '',
    content: '',
  })

  // CRUD actions state
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null)

  // Category management input states
  const [newCategoryName, setNewCategoryName] = useState('')
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null)
  const [editingCategoryName, setEditingCategoryName] = useState('')
  const [categoryLoading, setCategoryLoading] = useState(false)

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('admin_theme') as 'light' | 'dark'
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    localStorage.setItem('admin_theme', nextTheme)
  }

  // Fetch admin blog posts, comments, and categories
  const fetchData = async () => {
    try {
      const [postsRes, categoriesRes] = await Promise.all([
        fetch('/api/posts'),
        fetch('/api/categories')
      ])
      
      const postsData = await postsRes.json()
      const categoriesData = await categoriesRes.json()
      
      if (postsRes.ok) setPosts(postsData.data || [])
      if (categoriesRes.ok) setCategories(categoriesData.data || [])
    } catch (err) {
      console.error('Error loading admin dashboard data:', err)
    } finally {
      setLoadingData(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Auto-set the first category as the default in our form once loaded
  useEffect(() => {
    if (categories.length > 0 && !formData.category) {
      setFormData(prev => ({ ...prev, category: categories[0].name }))
    }
  }, [categories, formData.category])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Create article POST
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          published: true,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong while publishing the post.')
      }

      setSuccess(true)
      setFormData({
        title: '',
        category: categories[0]?.name || '',
        coverImage: '',
        excerpt: '',
        content: '',
      })
      
      // Refresh local list state
      fetchData()
      
      setTimeout(() => {
        setSuccess(false)
        setCurrentView('manage') // Redirect to list view
      }, 1500)
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  // Delete article
  const handlePostDelete = async (postId: number) => {
    if (!window.confirm('Are you sure you want to delete this article? All associated comments will also be permanently deleted.')) return
    
    setActionLoadingId(postId)
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        setPosts(prev => prev.filter(p => p.id !== postId))
      } else {
        const errData = await res.json()
        alert(errData.error || 'Failed to delete post.')
      }
    } catch (err) {
      console.error(err)
      alert('Failed to delete post.')
    } finally {
      setActionLoadingId(null)
    }
  }

  // Delete comment
  const handleCommentDelete = async (commentId: number) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return
    
    setActionLoadingId(commentId)
    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        // Optimistically remove the comment from the posts state
        setPosts(prev => prev.map(post => ({
          ...post,
          comments: post.comments.filter(c => c.id !== commentId),
          _count: {
            ...post._count,
            comments: Math.max(0, (post._count?.comments || 1) - 1)
          }
        })))
      } else {
        const errData = await res.json()
        alert(errData.error || 'Failed to delete comment.')
      }
    } catch (err) {
      console.error(err)
      alert('Failed to delete comment.')
    } finally {
      setActionLoadingId(null)
    }
  }

  // Add category POST
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCategoryName.trim()) return

    setCategoryLoading(true)
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName.trim() })
      })

      const data = await res.json()
      if (res.ok) {
        setCategories(prev => [...prev, data.data].sort((a, b) => a.name.localeCompare(b.name)))
        setNewCategoryName('')
      } else {
        alert(data.error || 'Failed to add category.')
      }
    } catch (err) {
      console.error(err)
      alert('Failed to add category.')
    } finally {
      setCategoryLoading(false)
    }
  }

  // Rename category PUT
  const handleRenameCategory = async (categoryId: number) => {
    if (!editingCategoryName.trim()) return

    setCategoryLoading(true)
    try {
      const res = await fetch(`/api/categories/${categoryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editingCategoryName.trim() })
      })

      const data = await res.json()
      if (res.ok) {
        setCategories(prev => 
          prev.map(cat => cat.id === categoryId ? { ...cat, name: editingCategoryName.trim() } : cat)
            .sort((a, b) => a.name.localeCompare(b.name))
        )
        fetchData()
        setEditingCategoryId(null)
        setEditingCategoryName('')
      } else {
        alert(data.error || 'Failed to rename category.')
      }
    } catch (err) {
      console.error(err)
      alert('Failed to rename category.')
    } finally {
      setCategoryLoading(false)
    }
  }

  // Delete category DELETE
  const handleDeleteCategory = async (categoryId: number) => {
    if (!window.confirm('Are you sure you want to delete this category? (Articles under this category will retain their category name tag but new articles cannot select it).')) return

    setCategoryLoading(true)
    try {
      const res = await fetch(`/api/categories/${categoryId}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setCategories(prev => prev.filter(cat => cat.id !== categoryId))
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to delete category.')
      }
    } catch (err) {
      console.error(err)
      alert('Failed to delete category.')
    } finally {
      setCategoryLoading(false)
    }
  }

  // Flatten and sort all comments across all articles
  const allComments: CommentType[] = posts.flatMap(post => 
    post.comments.map(comment => ({
      ...comment,
      postTitle: post.title,
      postSlug: post.slug,
    }))
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  // Dynamic class configurations based on theme selection
  const themeClasses = {
    background: theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900',
    card: theme === 'dark' ? 'bg-slate-900 border-slate-800 shadow-slate-950/20' : 'bg-white border-slate-100 shadow-xl',
    headerText: theme === 'dark' ? 'text-slate-100' : 'text-slate-900',
    bodyText: theme === 'dark' ? 'text-slate-400' : 'text-slate-600',
    labelText: theme === 'dark' ? 'text-slate-300' : 'text-slate-800',
    border: theme === 'dark' ? 'border-slate-800' : 'border-slate-200',
    inputBg: theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-slate-50/50 border-slate-200 text-slate-900 placeholder-slate-400',
    tableHeader: theme === 'dark' ? 'bg-slate-950 border-slate-850 text-slate-500' : 'bg-slate-50 border-slate-100 text-slate-400',
    tableBorder: theme === 'dark' ? 'divide-slate-800 border-slate-800' : 'divide-slate-50 border-slate-100',
    tableRowHover: theme === 'dark' ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50/50',
    textMuted: theme === 'dark' ? 'text-slate-500' : 'text-slate-400',
    linkBack: theme === 'dark' ? 'text-slate-400 hover:text-orange-500' : 'text-slate-600 hover:text-orange-600',
    tabActive: 'border-orange-600 text-orange-600',
    tabInactive: theme === 'dark' ? 'border-transparent text-slate-500 hover:text-slate-300' : 'border-transparent text-slate-400 hover:text-slate-600',
  }

  return (
    <div className={`pt-32 pb-24 min-h-screen transition-colors duration-300 w-full ${themeClasses.background}`}>
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        {/* Navigation & Theme Toggle */}
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/blog" 
            className={`inline-flex items-center gap-2 transition font-medium ${themeClasses.linkBack}`}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-xl border transition cursor-pointer ${
              theme === 'dark'
                ? 'bg-slate-900 border-slate-800 text-yellow-400 hover:bg-slate-800/80 shadow-lg'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm'
            }`}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Unified Portal Navigation Tabs */}
        <div className={`mb-10 border-b ${themeClasses.border}`}>
          <div className="flex flex-wrap gap-4 -mb-px">
            <button
              onClick={() => setCurrentView('create')}
              className={`pb-4 px-2 font-bold text-sm flex items-center gap-2 border-b-2 transition ${
                currentView === 'create' ? themeClasses.tabActive : themeClasses.tabInactive
              }`}
            >
              <PlusCircle className="w-4 h-4" /> Create Article
            </button>
            <button
              onClick={() => setCurrentView('manage')}
              className={`pb-4 px-2 font-bold text-sm flex items-center gap-2 border-b-2 transition ${
                currentView === 'manage' ? themeClasses.tabActive : themeClasses.tabInactive
              }`}
            >
              <FileText className="w-4 h-4" /> Manage Articles ({posts.length})
            </button>
            <button
              onClick={() => setCurrentView('comments')}
              className={`pb-4 px-2 font-bold text-sm flex items-center gap-2 border-b-2 transition ${
                currentView === 'comments' ? themeClasses.tabActive : themeClasses.tabInactive
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Moderate Comments ({allComments.length})
            </button>
            <button
              onClick={() => setCurrentView('categories')}
              className={`pb-4 px-2 font-bold text-sm flex items-center gap-2 border-b-2 transition ${
                currentView === 'categories' ? themeClasses.tabActive : themeClasses.tabInactive
              }`}
            >
              <Tag className="w-4 h-4" /> Manage Categories ({categories.length})
            </button>
          </div>
        </div>

        {/* View 1: Create Article Form */}
        {currentView === 'create' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className={`text-3xl font-extrabold leading-tight ${themeClasses.headerText}`}>Create Blog Post</h1>
                <p className={`mt-1 text-sm ${themeClasses.bodyText}`}>Publish insightful real estate content, tutorials, or documentation updates.</p>
              </div>
              <div className={`flex border rounded-xl overflow-hidden p-1 shadow-sm shrink-0 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <button
                  onClick={() => setActivePreviewTab('edit')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition ${
                    activePreviewTab === 'edit'
                      ? 'bg-orange-600 text-white shadow-sm'
                      : `${theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'}`
                  }`}
                >
                  <Edit2 className="w-4 h-4" /> Form Editor
                </button>
                <button
                  onClick={() => setActivePreviewTab('preview')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition ${
                    activePreviewTab === 'preview'
                      ? 'bg-orange-600 text-white shadow-sm'
                      : `${theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'}`
                  }`}
                >
                  <Eye className="w-4 h-4" /> Live Preview
                </button>
              </div>
            </div>

            {activePreviewTab === 'edit' ? (
              <form onSubmit={handleSubmit} className={`rounded-3xl p-8 border space-y-6 ${themeClasses.card}`}>
                
                {/* Alerts */}
                {success && (
                  <div className={`border rounded-2xl p-4 flex items-start gap-3 ${theme === 'dark' ? 'bg-green-950/40 border-green-800/60 text-green-200' : 'bg-green-50 border-green-200 text-green-800'}`}>
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Post Published Successfully!</p>
                      <p className="text-sm mt-0.5">Your article has been saved. Loading manager dashboard...</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className={`border rounded-2xl p-4 flex items-start gap-3 ${theme === 'dark' ? 'bg-red-950/40 border-red-800/60 text-red-200' : 'bg-red-50 border-red-200 text-red-800'}`}>
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Publication Failed</p>
                      <p className="text-sm mt-0.5">{error}</p>
                    </div>
                  </div>
                )}

                {/* Inputs grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <label htmlFor="title" className={`block text-xs font-bold uppercase tracking-wider mb-2 ${themeClasses.labelText}`}>Article Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      placeholder="e.g. Understanding Land Titles in Nigeria"
                      value={formData.title}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-sm font-semibold ${themeClasses.inputBg}`}
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor="category" className={`block text-xs font-bold uppercase tracking-wider mb-2 ${themeClasses.labelText}`}>Category</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-sm font-semibold appearance-none cursor-pointer ${themeClasses.inputBg}`}
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name} className={theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Cover Image URL */}
                  <div>
                    <label htmlFor="coverImage" className={`block text-xs font-bold uppercase tracking-wider mb-2 ${themeClasses.labelText}`}>Cover Image URL</label>
                    <input
                      type="url"
                      id="coverImage"
                      name="coverImage"
                      required
                      placeholder="e.g. https://images.unsplash.com/photo-..."
                      value={formData.coverImage}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-sm font-medium ${themeClasses.inputBg}`}
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label htmlFor="excerpt" className={`block text-xs font-bold uppercase tracking-wider mb-2 ${themeClasses.labelText}`}>Excerpt (Brief Summary)</label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    required
                    rows={3}
                    maxLength={500}
                    placeholder="Write a compelling summary of the article..."
                    value={formData.excerpt}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-sm font-medium leading-relaxed ${themeClasses.inputBg}`}
                  />
                  <p className={`text-right text-xs mt-1 ${themeClasses.textMuted}`}>{formData.excerpt.length}/500 characters</p>
                </div>

                {/* Content (HTML) */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="content" className={`text-xs font-bold uppercase tracking-wider ${themeClasses.labelText}`}>Article Content (Supports HTML Markup)</label>
                    <span className="text-xs text-orange-600 bg-orange-50/50 font-semibold px-2 py-1 rounded-md">
                      💡 Tips: Use &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, and &lt;strong&gt; tags
                    </span>
                  </div>
                  <textarea
                    id="content"
                    name="content"
                    required
                    rows={12}
                    placeholder="Write article details using structural HTML tags..."
                    value={formData.content}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 transition font-mono text-sm leading-relaxed ${themeClasses.inputBg}`}
                  />
                </div>

                {/* Form submit button */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading || categories.length === 0}
                    className="bg-slate-900 dark:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-800 dark:hover:bg-orange-700 hover:shadow-lg transition flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Publishing...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" /> Publish Article
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Realtime Preview Mode */
              <div className={`rounded-3xl p-8 border ${themeClasses.card}`}>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 uppercase tracking-wider font-bold">
                  <FileText className="w-4 h-4 text-orange-500" /> Page View Sandbox
                </div>

                <article className="max-w-2xl mx-auto">
                  <div className="mb-6">
                    <span className="bg-orange-100 text-orange-700 px-3.5 py-1 rounded-full text-xs font-bold shadow-sm">
                      {formData.category || 'Category'}
                    </span>
                    <h1 className={`text-3xl md:text-4xl font-extrabold mt-4 leading-tight ${themeClasses.headerText}`}>
                      {formData.title || 'Your Article Title'}
                    </h1>
                    <p className={`text-xs mt-3 flex items-center gap-4 ${themeClasses.textMuted}`}>
                      <span>Simulated Publication: Today</span>
                      <span>•</span>
                      <span>Author: DealRite Realty Admin</span>
                    </p>
                  </div>

                  <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden mb-8 shadow-md bg-slate-200 flex items-center justify-center border border-slate-700/20">
                    {formData.coverImage ? (
                      <Image
                        src={formData.coverImage}
                        alt="Simulated cover"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <span className="text-slate-400 text-sm font-semibold">No Cover Image Loaded</span>
                    )}
                  </div>

                  <p className={`text-lg italic border-l-4 border-orange-500 pl-4 py-1 mb-8 leading-relaxed ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                    {formData.excerpt || 'Article summary preview...'}
                  </p>

                  <div 
                    className={`prose prose-slate prose-orange max-w-none leading-relaxed space-y-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}
                    dangerouslySetInnerHTML={{ 
                      __html: formData.content || '<p className="text-slate-500 font-medium">Article body content...</p>' 
                    }}
                  />
                </article>
              </div>
            )}
          </div>
        )}

        {/* View 2: Manage Articles */}
        {currentView === 'manage' && (
          <div className="space-y-6">
            <div>
              <h2 className={`text-2xl font-extrabold ${themeClasses.headerText}`}>Manage Published Articles</h2>
              <p className={`mt-1 text-sm ${themeClasses.bodyText}`}>Review live links, update content, delete articles, or monitor visitor statistics.</p>
            </div>

            {loadingData ? (
              <div className={`rounded-3xl border p-20 flex justify-center items-center shadow-lg ${themeClasses.card}`}>
                <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
              </div>
            ) : posts.length > 0 ? (
              <div className={`rounded-3xl border overflow-hidden ${themeClasses.card}`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className={`border-b text-[10px] font-extrabold uppercase tracking-widest ${themeClasses.tableHeader}`}>
                        <th className="p-5">Article</th>
                        <th className="p-5 text-center">Views</th>
                        <th className="p-5 text-center">Likes</th>
                        <th className="p-5 text-center">Comments</th>
                        <th className="p-5 text-center">Category</th>
                        <th className="p-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${themeClasses.tableBorder}`}>
                      {posts.map(post => (
                        <tr key={post.id} className={`transition ${themeClasses.tableRowHover}`}>
                          <td className="p-5 max-w-sm">
                            <div className="flex items-center gap-4">
                              <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-700/20 bg-slate-800">
                                <Image
                                  src={post.coverImage}
                                  alt={post.title}
                                  fill
                                  className="object-cover"
                                  sizes="64px"
                                />
                              </div>
                              <div>
                                <p className={`font-bold text-sm line-clamp-2 leading-snug ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{post.title}</p>
                                <p className={`text-[10px] mt-1 font-semibold ${themeClasses.textMuted}`}>
                                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className={`p-5 text-center font-bold text-sm ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>{post.views}</td>
                          <td className={`p-5 text-center font-bold text-sm ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>{post.likes}</td>
                          <td className={`p-5 text-center font-bold text-sm ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>{post._count?.comments || 0}</td>
                          <td className="p-5 text-center">
                            <span className={`font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider border ${
                              theme === 'dark' 
                                ? 'bg-orange-950/40 border-orange-800/30 text-orange-400' 
                                : 'bg-orange-50 border-orange-100 text-orange-600'
                            }`}>
                              {post.category}
                            </span>
                          </td>
                          <td className="p-5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                className={`p-2 transition rounded-lg hover:bg-slate-800/40 ${theme === 'dark' ? 'text-slate-400 hover:text-orange-500' : 'text-slate-400 hover:text-orange-600'}`}
                                title="View Live"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Link>
                              <Link
                                href={`/admin/blog/edit/${post.id}`}
                                className={`p-2 transition rounded-lg hover:bg-slate-800/40 ${theme === 'dark' ? 'text-slate-400 hover:text-blue-400' : 'text-slate-400 hover:text-blue-600'}`}
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => handlePostDelete(post.id)}
                                disabled={actionLoadingId === post.id}
                                className={`p-2 transition rounded-lg hover:bg-slate-800/40 ${theme === 'dark' ? 'text-slate-400 hover:text-red-400' : 'text-slate-400 hover:text-red-600'}`}
                                title="Delete"
                              >
                                {actionLoadingId === post.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className={`rounded-3xl border p-20 text-center shadow-lg ${themeClasses.card}`}>
                <p className={`font-semibold text-lg ${themeClasses.bodyText}`}>No articles currently published.</p>
              </div>
            )}
          </div>
        )}

        {/* View 3: Moderate Comments */}
        {currentView === 'comments' && (
          <div className="space-y-6">
            <div>
              <h2 className={`text-2xl font-extrabold ${themeClasses.headerText}`}>Comment Moderation</h2>
              <p className={`mt-1 text-sm ${themeClasses.bodyText}`}>Audit responses, track reader engagement, and delete negative or spam comments immediately.</p>
            </div>

            {loadingData ? (
              <div className={`rounded-3xl border p-20 flex justify-center items-center shadow-lg ${themeClasses.card}`}>
                <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
              </div>
            ) : allComments.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {allComments.map(comment => (
                  <div 
                    key={comment.id} 
                    className={`rounded-3xl p-6 border flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${themeClasses.card}`}
                  >
                    <div className="space-y-2 flex-grow">
                      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                        <span className={`px-3 py-1 rounded-full ${theme === 'dark' ? 'bg-slate-950 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                          👤 {comment.authorName}
                        </span>
                        <span className={themeClasses.textMuted}>
                          {new Date(comment.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        <span className={themeClasses.textMuted}>|</span>
                        <Link 
                          href={`/blog/${comment.postSlug}`} 
                          target="_blank"
                          className="text-orange-500 hover:underline flex items-center gap-1"
                        >
                          Under: {comment.postTitle} <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                      <p className={`text-sm leading-relaxed whitespace-pre-line ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                        {comment.content}
                      </p>
                    </div>

                    <button
                      onClick={() => handleCommentDelete(comment.id)}
                      disabled={actionLoadingId === comment.id}
                      className={`inline-flex items-center gap-2 border hover:bg-red-50/10 font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition shrink-0 cursor-pointer disabled:opacity-50 ${
                        theme === 'dark' ? 'border-red-900/60 text-red-400 hover:text-red-300' : 'border-red-200 text-red-600 hover:text-red-700'
                      }`}
                    >
                      {actionLoadingId === comment.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                      Delete Comment
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`rounded-3xl border p-20 text-center shadow-lg ${themeClasses.card}`}>
                <p className={`font-semibold text-lg ${themeClasses.bodyText}`}>No comments currently posted.</p>
              </div>
            )}
          </div>
        )}

        {/* View 4: Moderate Categories */}
        {currentView === 'categories' && (
          <div className="space-y-8">
            <div>
              <h2 className={`text-2xl font-extrabold ${themeClasses.headerText}`}>Manage Blog Categories</h2>
              <p className={`mt-1 text-sm ${themeClasses.bodyText}`}>Configure available category tags, rename them dynamically, or add new selectors.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Add New Category form (left) */}
              <div className={`rounded-3xl p-6 border space-y-4 h-fit ${themeClasses.card}`}>
                <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>Add New Category</h3>
                <form onSubmit={handleAddCategory} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Market Analysis"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-sm font-semibold ${themeClasses.inputBg}`}
                  />
                  <button
                    type="submit"
                    disabled={categoryLoading || !newCategoryName.trim()}
                    className="w-full bg-slate-900 dark:bg-orange-600 text-white font-bold py-3 rounded-xl hover:bg-slate-800 dark:hover:bg-orange-700 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-xs uppercase tracking-wider"
                  >
                    {categoryLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
                    Add Category
                  </button>
                </form>
              </div>

              {/* Categories list table (right) */}
              <div className={`md:col-span-2 rounded-3xl border shadow-xl overflow-hidden ${themeClasses.card}`}>
                <div className={`p-5 border-b ${theme === 'dark' ? 'border-slate-800' : 'border-slate-50'}`}>
                  <h3 className={`font-bold text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-850'}`}>Available Category Tags</h3>
                </div>

                {loadingData ? (
                  <div className="p-10 flex justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
                  </div>
                ) : categories.length > 0 ? (
                  <div className={`divide-y ${theme === 'dark' ? 'divide-slate-800' : 'divide-slate-50'}`}>
                    {categories.map(cat => (
                      <div key={cat.id} className={`p-4 flex items-center justify-between transition ${themeClasses.tableRowHover}`}>
                        
                        {editingCategoryId === cat.id ? (
                          /* Inline edit inputs */
                          <div className="flex items-center gap-2 flex-grow">
                            <input
                              type="text"
                              value={editingCategoryName}
                              onChange={(e) => setEditingCategoryName(e.target.value)}
                              className={`px-3 py-1.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-semibold flex-grow max-w-xs ${
                                theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                              }`}
                            />
                            <button
                              onClick={() => handleRenameCategory(cat.id)}
                              disabled={categoryLoading}
                              className="p-2 text-green-600 hover:bg-green-50/10 rounded-lg transition"
                              title="Save Name"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingCategoryId(null)
                                setEditingCategoryName('')
                              }}
                              className="p-2 text-red-600 hover:bg-red-50/10 rounded-lg transition"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          /* Display Name */
                          <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0" />
                            <span className={`font-bold text-sm ${theme === 'dark' ? 'text-slate-200' : 'text-slate-850'}`}>{cat.name}</span>
                          </div>
                        )}

                        {editingCategoryId !== cat.id && (
                          /* Action controls */
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setEditingCategoryId(cat.id)
                                setEditingCategoryName(cat.name)
                              }}
                              className="p-2 text-slate-400 hover:text-blue-500 transition rounded-lg hover:bg-slate-800/40"
                              title="Rename Category"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(cat.id)}
                              className="p-2 text-slate-400 hover:text-red-500 transition rounded-lg hover:bg-slate-800/40"
                              title="Delete Category"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-10 text-center text-slate-400 text-sm">
                    No categories registered.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
