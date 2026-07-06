'use client'

import { useState, useEffect } from 'react'
import { Heart, MessageSquare, Share2, Copy, Check, Send, User, Calendar, MessageCircle, Eye } from 'lucide-react'

type CommentType = {
  id: number
  authorName: string
  content: string
  createdAt: string | Date
}

type EngagementPanelProps = {
  postId: number
  postSlug: string
  postTitle: string
  initialLikes: number
  initialViews: number
  initialComments: CommentType[]
}

export default function EngagementPanel({
  postId,
  postSlug,
  postTitle,
  initialLikes,
  initialViews,
  initialComments,
}: EngagementPanelProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [views, setViews] = useState(initialViews)
  const [comments, setComments] = useState<CommentType[]>(initialComments)
  const [hasLiked, setHasLiked] = useState(false)
  const [copied, setCopied] = useState(false)
  
  // Comment Form state
  const [authorName, setAuthorName] = useState('')
  const [commentText, setCommentText] = useState('')
  const [submittingComment, setSubmittingComment] = useState(false)
  const [commentError, setCommentError] = useState<string | null>(null)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `/blog/${postSlug}`

  // 1. Record Page View Analytics on Mount
  useEffect(() => {
    const recordView = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}/views`, {
          method: 'POST',
        })
        if (response.ok) {
          const data = await response.json()
          setViews(data.views)
        }
      } catch (err) {
        console.error('Error tracking page views:', err)
      }
    }

    recordView()

    // Check if user has liked this post previously
    const likedStatus = localStorage.getItem(`liked_post_${postId}`)
    if (likedStatus === 'true') {
      setHasLiked(true)
    }
  }, [postId])

  // 2. Handle Like Increment
  const handleLike = async () => {
    if (hasLiked) return // Prevent multiple likes from the same browser

    // Optimistic update
    setLikes(prev => prev + 1)
    setHasLiked(true)
    localStorage.setItem(`liked_post_${postId}`, 'true')

    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
      })
      if (!response.ok) {
        // Rollback on error
        setLikes(prev => prev - 1)
        setHasLiked(false)
        localStorage.removeItem(`liked_post_${postId}`)
      }
    } catch (err) {
      console.error('Error sending like:', err)
      setLikes(prev => prev - 1)
      setHasLiked(false)
      localStorage.removeItem(`liked_post_${postId}`)
    }
  }

  // 3. Handle Clipboard Share Link Copy
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // 4. Handle Comment Form Submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!authorName.trim() || !commentText.trim()) return

    setSubmittingComment(true)
    setCommentError(null)

    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authorName: authorName.trim(),
          content: commentText.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit comment.')
      }

      // Append new comment to the state array
      setComments(prev => [data.data, ...prev])
      setCommentText('')
      setAuthorName('')
    } catch (err: any) {
      setCommentError(err.message || 'An error occurred.')
    } finally {
      setSubmittingComment(false)
    }
  }

  return (
    <div className="mt-16 space-y-12">
      {/* 1. Engagement Actions Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          {/* Like Button */}
          <button
            onClick={handleLike}
            disabled={hasLiked}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
              hasLiked
                ? 'bg-red-50 text-red-600 shadow-inner'
                : 'bg-slate-50 text-slate-600 hover:bg-red-50 hover:text-red-600 cursor-pointer'
            }`}
          >
            <Heart className={`w-5 h-5 ${hasLiked ? 'fill-red-600' : ''}`} />
            <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
          </button>

          {/* Views Indicator */}
          <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold bg-slate-50 px-5 py-3 rounded-2xl">
            <Eye className="w-5 h-5 text-orange-600" />
            <span>{views.toLocaleString()} Views</span>
          </div>
        </div>

        {/* Share Action Panel */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:inline">Share Article</span>
          
          {/* Direct Copy */}
          <button
            onClick={handleCopyLink}
            className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition rounded-2xl border border-slate-100"
            title="Copy Link to Clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Share on WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${postTitle} - Read more at: ${shareUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-green-50 hover:bg-green-100 text-green-600 transition rounded-2xl border border-green-100"
            title="Share via WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          {/* Share on Twitter/X */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(postTitle)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-900 hover:bg-slate-800 text-white transition rounded-2xl"
            title="Share on X"
          >
            <Share2 className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 2. Comments Module */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        
        {/* Comment form (left) */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Leave a Comment</h3>
            <p className="text-slate-500 text-xs mt-1">We value your thoughts and inquiries on this topic.</p>
          </div>

          <form onSubmit={handleCommentSubmit} className="space-y-4">
            {commentError && (
              <div className="bg-red-50 text-red-700 p-3 rounded-xl text-xs font-semibold">
                {commentError}
              </div>
            )}
            
            {/* Name */}
            <div>
              <input
                type="text"
                required
                placeholder="Your Name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white transition text-sm font-semibold"
              />
            </div>

            {/* Comment */}
            <div>
              <textarea
                required
                rows={4}
                placeholder="Share your thoughts or questions..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white transition text-sm font-medium leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={submittingComment || !authorName.trim() || !commentText.trim()}
              className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              <Send className="w-4 h-4" />
              {submittingComment ? 'Submitting...' : 'Post Comment'}
            </button>
          </form>
        </div>

        {/* Comments Listing (right) */}
        <div className="md:col-span-3 space-y-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-orange-600" />
            <h3 className="text-xl font-bold text-slate-900">Comments ({comments.length})</h3>
          </div>

          {comments.length > 0 ? (
            <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 scrollbar-thin">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-slate-800">
                      <User className="w-3.5 h-3.5 text-orange-600" /> {comment.authorName}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(comment.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line font-medium pl-5 pt-1">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-8 text-center text-slate-400">
              <MessageSquare className="w-8 h-8 mx-auto mb-3 opacity-60" />
              <p className="text-sm font-semibold">No comments posted yet.</p>
              <p className="text-xs mt-1">Be the first to share your thoughts!</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
