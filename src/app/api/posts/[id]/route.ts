import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/db'
import { z } from 'zod'

const blogPostUpdateSchema = z.object({
  title: z.string().trim().min(5, 'Title must be at least 5 characters long.'),
  category: z.string().trim().min(2, 'Category must be selected.'),
  coverImage: z.string().trim().url('Please provide a valid cover image URL.'),
  excerpt: z.string().trim().min(10, 'Excerpt must be at least 10 characters long.').max(500, 'Excerpt cannot exceed 500 characters.'),
  content: z.string().trim().min(20, 'Content must be at least 20 characters long.'),
  published: z.boolean().default(true),
})

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')     // Remove non-alphanumeric, spaces, and hyphens
    .replace(/[\s_-]+/g, '-')      // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, '')       // Trim hyphens from beginning and end
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    // Validate inputs using Zod
    const validation = blogPostUpdateSchema.safeParse(body)
    if (!validation.success) {
      const errorMessage = validation.error.issues[0]?.message || 'Invalid input data.'
      return NextResponse.json({ error: errorMessage }, { status: 400 })
    }

    const { title, category, coverImage, excerpt, content, published } = validation.data
    const postId = parseInt(id)

    // Check if the post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { id: postId },
    })

    if (!existingPost) {
      return NextResponse.json({ error: 'Blog post not found.' }, { status: 404 })
    }

    // Determine if slug needs to be updated (if title changed)
    let slug = existingPost.slug
    if (existingPost.title !== title) {
      slug = generateSlug(title)
      let slugExists = await prisma.blogPost.findFirst({
        where: { slug, id: { not: postId } },
      })
      
      let counter = 1
      const baseSlug = slug
      while (slugExists) {
        slug = `${baseSlug}-${counter}`
        slugExists = await prisma.blogPost.findFirst({
          where: { slug, id: { not: postId } },
        })
        counter++
      }
    }

    // Update blog post in the database
    const updatedPost = await prisma.blogPost.update({
      where: { id: postId },
      data: {
        title,
        slug,
        category,
        coverImage,
        excerpt,
        content,
        published,
      },
    })

    // Clear Next.js cache for the listing and individual post pages
    revalidatePath('/blog')
    revalidatePath(`/blog/${existingPost.slug}`)
    revalidatePath(`/blog/${updatedPost.slug}`)

    return NextResponse.json({ success: true, data: updatedPost })
  } catch (error) {
    console.error('Blog post edit error:', error)
    return NextResponse.json({ error: 'Failed to update post.' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const postId = parseInt(id)

    // Verify post existence
    const existingPost = await prisma.blogPost.findUnique({
      where: { id: postId },
    })

    if (!existingPost) {
      return NextResponse.json({ error: 'Blog post not found.' }, { status: 404 })
    }

    // Delete post (comments will cascade delete)
    await prisma.blogPost.delete({
      where: { id: postId },
    })

    // Clear Next.js cache for the listing and individual post pages
    revalidatePath('/blog')
    revalidatePath(`/blog/${existingPost.slug}`)

    return NextResponse.json({ success: true, message: 'Blog post deleted successfully!' })
  } catch (error) {
    console.error('Blog post deletion error:', error)
    return NextResponse.json({ error: 'Failed to delete post.' }, { status: 500 })
  }
}
