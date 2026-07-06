import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const commentId = parseInt(id)

    // Check if the comment exists
    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
    })

    if (!existingComment) {
      return NextResponse.json({ error: 'Comment not found.' }, { status: 404 })
    }

    // Delete the comment
    await prisma.comment.delete({
      where: { id: commentId },
    })

    return NextResponse.json({ success: true, message: 'Comment deleted successfully!' })
  } catch (error) {
    console.error('Comment deletion error:', error)
    return NextResponse.json({ error: 'Failed to delete comment.' }, { status: 500 })
  }
}
