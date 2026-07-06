'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, Heart, MessageSquare, Plus, Trash2, Edit, ExternalLink, Calendar, Loader2, AlertTriangle } from 'lucide-react'
import Image from 'next/image'

type BlogPost = {
  id: number
  title: string
  slug: string
  excerpt: string
  coverImage: string
  category: string
  published: boolean
  views: number
  likes: number
  createdAt: Date
  _count?: {
    comments: number
  }
}

type AdminDashboardGridProps = {
  initialPosts: BlogPost[]
}

export default function AdminDashboardGrid({ initialPosts }: AdminDashboardGridProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you absolutely sure you want to delete this article? This action is permanent and will delete all linked comments.')) {
      return
    }

    setDeletingId(id)
    setError(null)

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete the post.')
      }

      // Optimistically update the local state array
      setPosts(prev => prev.filter(post => post.id !== id))
    } catch (err: any) {
      setError(err.message || 'An error occurred during deletion.')
    } finally {
      setDeletingId(null)
    }
  }

  // Calculate aggregates
  const totalViews = posts.reduce((sum, p) => sum + p.views, 0)
  const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0)
  const totalComments = posts.reduce((sum, p) => sum + (p._count?.comments || 0), 0)

  return (
    <div className="space-y-10">
      {/* Aggregate Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Posts */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Articles</p>
            <p className="text-3xl font-extrabold text-slate-900 mt-2">{posts.length}</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        {/* Total Views */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cumulative Views</p>
            <p className="text-3xl font-extrabold text-slate-900 mt-2">
              {totalViews.toLocaleString()}
            </p>
          </div>
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
            <Eye className="w-6 h-6" />
          </div>
        </div>

        {/* Total Likes */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Likes</p>
            <p className="text-3xl font-extrabold text-slate-900 mt-2">
              {totalLikes.toLocaleString()}
            </p>
          </div>
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shrink-0">
            <Heart className="w-6 h-6" />
          </div>
        </div>

        {/* Total Comments */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Visitor Comments</p>
            <p className="text-3xl font-extrabold text-slate-900 mt-2">
              {totalComments.toLocaleString()}
            </p>
          </div>
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shrink-0">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
          <p className="text-sm font-semibold">{error}</p>
        </div>
      )}

      {/* Articles Index Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Manage Published Articles</h2>
            <p className="text-xs text-slate-500 mt-0.5">Click actions to edit metadata details, view live links, or permanently delete files.</p>
          </div>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Create New Post
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  <th className="p-5">Article details</th>
                  <th className="p-5 text-center">Views</th>
                  <th className="p-5 text-center">Likes</th>
                  <th className="p-5 text-center">Comments</th>
                  <th className="p-5 text-center">Category</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {posts.map(post => (
                  <tr key={post.id} className="hover:bg-slate-50/50 transition duration-150">
                    {/* Article title & cover */}
                    <td className="p-5 max-w-sm">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200 shadow-inner bg-slate-100">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">{post.title}</p>
                          <p className="text-[10px] text-slate-400 mt-1 font-semibold">
                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Views */}
                    <td className="p-5 text-center font-bold text-sm text-slate-700">
                      {post.views}
                    </td>

                    {/* Likes */}
                    <td className="p-5 text-center font-bold text-sm text-slate-700">
                      {post.likes}
                    </td>

                    {/* Comments */}
                    <td className="p-5 text-center font-bold text-sm text-slate-700">
                      {post._count?.comments || 0}
                    </td>

                    {/* Category */}
                    <td className="p-5 text-center">
                      <span className="bg-orange-50 text-orange-600 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider border border-orange-100">
                        {post.category}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* View Post */}
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 text-slate-400 hover:text-orange-600 transition rounded-lg hover:bg-slate-100"
                          title="View Live Article"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        
                        {/* Edit Post */}
                        <Link
                          href={`/admin/blog/edit/${post.id}`}
                          className="p-2 text-slate-400 hover:text-blue-600 transition rounded-lg hover:bg-slate-100"
                          title="Edit Article"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        {/* Delete Post */}
                        <button
                          onClick={() => handleDelete(post.id)}
                          disabled={deletingId === post.id}
                          className="p-2 text-slate-400 hover:text-red-600 transition rounded-lg hover:bg-slate-100 disabled:opacity-50"
                          title="Delete Article"
                        >
                          {deletingId === post.id ? (
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
        ) : (
          <div className="text-center py-20 bg-white flex flex-col items-center justify-center">
            <p className="text-slate-500 font-bold text-lg">No articles currently published.</p>
            <Link
              href="/admin/blog/new"
              className="mt-4 bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm"
            >
              Add your first article
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
