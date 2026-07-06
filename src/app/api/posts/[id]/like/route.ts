import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const postId = parseInt(id)

    const updatedPost = await prisma.blogPost.update({
      where: { id: postId },
      data: {
        likes: {
          increment: 1,
        },
      },
      select: {
        likes: true,
      },
    })

    return NextResponse.json({ success: true, likes: updatedPost.likes })
  } catch (error) {
    console.error('Like increment error:', error)
    return NextResponse.json({ error: 'Failed to record like.' }, { status: 500 })
  }
}
