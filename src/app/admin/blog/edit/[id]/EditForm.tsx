'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Send, Eye, Edit2, Loader2, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import Image from 'next/image'

type PostData = {
  id: number
  title: string
  category: string
  coverImage: string
  excerpt: string
  content: string
}

type EditFormProps = {
  post: PostData
}

type CategoryType = {
  id: number
  name: string
}

export default function EditForm({ post }: EditFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: post.title,
    category: post.category,
    coverImage: post.coverImage,
    excerpt: post.excerpt,
    content: post.content,
  })

  const [categories, setCategories] = useState<CategoryType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')

  // Load available categories dynamically
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories')
        const data = await res.json()
        if (res.ok) {
          setCategories(data.data || [])
        }
      } catch (err) {
        console.error('Failed to load categories:', err)
      }
    }
    fetchCategories()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
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
        throw new Error(data.error || 'Something went wrong while updating the post.')
      }

      setSuccess(true)
      
      // Redirect back to Admin Dashboard after a short delay
      setTimeout(() => {
        router.push('/admin/blog/new') // Direct to tabbed manager suite
        router.refresh()
      }, 1500)
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      {/* Navigation back */}
      <Link 
        href="/admin/blog/new" 
        className="inline-flex items-center gap-2 text-slate-600 hover:text-orange-600 transition font-medium mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">Edit Blog Post</h1>
          <p className="text-slate-500 mt-1">Make modifications to the existing article &apos;{post.title}&apos;.</p>
        </div>
        <div className="flex border border-slate-200 bg-white rounded-xl overflow-hidden p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('edit')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'edit'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit2 className="w-4 h-4" /> Form Editor
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'preview'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-4 h-4" /> Live Preview
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      {activeTab === 'edit' ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-6">
          
          {/* Alerts */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Post Updated Successfully!</p>
                <p className="text-sm mt-0.5">Your updates have been saved to the database. Redirecting to admin dashboard...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Modification Failed</p>
                <p className="text-sm mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {/* Inputs grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-bold text-slate-800 mb-2">Article Title</label>
              <input
                type="text"
                id="title"
                name="title"
                required
                placeholder="e.g. Understanding Land Titles in Nigeria"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50/50 hover:bg-slate-50 transition text-slate-900 font-medium"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-bold text-slate-800 mb-2">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50/50 hover:bg-slate-50 transition text-slate-900 font-medium appearance-none cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Cover Image URL */}
            <div>
              <label htmlFor="coverImage" className="block text-sm font-bold text-slate-800 mb-2">Cover Image URL</label>
              <input
                type="url"
                id="coverImage"
                name="coverImage"
                required
                placeholder="e.g. https://images.unsplash.com/photo-..."
                value={formData.coverImage}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50/50 hover:bg-slate-50 transition text-slate-900 text-sm font-medium"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-bold text-slate-800 mb-2">Excerpt (Brief Summary)</label>
            <textarea
              id="excerpt"
              name="excerpt"
              required
              rows={3}
              maxLength={500}
              placeholder="Write a compelling summary of the article (maximum 500 characters)..."
              value={formData.excerpt}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50/50 hover:bg-slate-50 transition text-slate-950 font-normal leading-relaxed text-sm"
            />
            <p className="text-right text-xs text-slate-400 mt-1">{formData.excerpt.length}/500 characters</p>
          </div>

          {/* Content (HTML) */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="content" className="block text-sm font-bold text-slate-800">Article Content (Supports HTML Markup)</label>
              <span className="text-xs text-orange-600 bg-orange-50 font-semibold px-2 py-1 rounded-md">
                💡 Tips: Use &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, and &lt;strong&gt; tags
              </span>
            </div>
            <textarea
              id="content"
              name="content"
              required
              rows={12}
              placeholder="Write article details using structural tags..."
              value={formData.content}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50/50 hover:bg-slate-50 transition font-mono text-slate-950 leading-relaxed text-sm"
            />
          </div>

          {/* Form submit button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading || categories.length === 0}
              className="bg-slate-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-800 hover:shadow-lg transition flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Saving Changes...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* Realtime Preview Mode */
        <div className="space-y-12">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 uppercase tracking-wider font-bold">
              <FileText className="w-4 h-4 text-orange-500" /> Page View Sandbox
            </div>

            {/* Dynamic Simulated Details Page */}
            <article className="max-w-2xl mx-auto">
              <div className="mb-6">
                <span className="bg-orange-100 text-orange-700 px-3.5 py-1 rounded-full text-xs font-bold shadow-sm">
                  {formData.category || 'Category'}
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-4 leading-tight">
                  {formData.title || 'Your Article Title'}
                </h1>
                <p className="text-slate-400 text-xs mt-3">
                  Simulated Publication: Today • Author: DealRite Realty Admin
                </p>
              </div>

              <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden mb-8 shadow-md bg-slate-200 flex items-center justify-center">
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

              <p className="text-lg text-slate-700 italic border-l-4 border-orange-500 pl-4 py-1 mb-8 leading-relaxed">
                {formData.excerpt || 'Article summary preview...'}
              </p>

              <div 
                className="prose prose-slate prose-orange max-w-none text-slate-600 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ 
                  __html: formData.content || '<p className="text-slate-400 font-medium">Content preview...</p>' 
                }}
              />
            </article>
          </div>
        </div>
      )}
    </div>
  )
}
