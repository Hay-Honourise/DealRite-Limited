import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const postId = parseInt(id)

    const updatedPost = await prisma.blogPost.update({
      where: { id: postId },
      data: {
        views: {
          increment: 1,
        },
      },
      select: {
        views: true,
      },
    })

    return NextResponse.json({ success: true, views: updatedPost.views })
  } catch (error) {
    console.error('Views increment error:', error)
    return NextResponse.json({ error: 'Failed to record page view.' }, { status: 500 })
  }
}
