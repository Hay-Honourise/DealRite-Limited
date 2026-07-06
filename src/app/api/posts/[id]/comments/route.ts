import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { z } from 'zod'

const commentCreateSchema = z.object({
  authorName: z.string().trim().min(2, 'Name must be at least 2 characters long.'),
  content: z.string().trim().min(3, 'Comment content must be at least 3 characters long.').max(1000, 'Comment content cannot exceed 1000 characters.'),
})

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const postId = parseInt(id)

    // Validate comment inputs
    const validation = commentCreateSchema.safeParse(body)
    if (!validation.success) {
      const errorMessage = validation.error.issues[0]?.message || 'Invalid comment data.'
      return NextResponse.json({ error: errorMessage }, { status: 400 })
    }

    const { authorName, content } = validation.data

    // Check if the blog post exists
    const postExists = await prisma.blogPost.findUnique({
      where: { id: postId },
    })

    if (!postExists) {
      return NextResponse.json({ error: 'Blog post not found.' }, { status: 404 })
    }

    // Save the comment
    const comment = await prisma.comment.create({
      data: {
        postId,
        authorName,
        content,
      },
    })

    return NextResponse.json({ success: true, data: comment }, { status: 201 })
  } catch (error) {
    console.error('Comment submission error:', error)
    return NextResponse.json({ error: 'Failed to post comment.' }, { status: 500 })
  }
}
