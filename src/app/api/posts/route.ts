import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/db'
import { z } from 'zod'

const blogPostSchema = z.object({
  title: z.string().trim().min(5, 'Title must be at least 5 characters long.'),
  category: z.string().trim().min(2, 'Category must be selected.'),
  coverImage: z.string().trim().url('Please provide a valid cover image URL.'),
  excerpt: z.string().trim().min(10, 'Excerpt must be at least 10 characters long.').max(500, 'Excerpt cannot exceed 500 characters.'),
  content: z.string().trim().min(20, 'Content must be at least 20 characters long.'),
  published: z.boolean().default(true),
})

// Utility function to generate a URL-friendly slug from the title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')     // Remove non-alphanumeric, spaces, and hyphens
    .replace(/[\s_-]+/g, '-')      // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, '')       // Trim hyphens from beginning and end
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate request inputs using Zod
    const validation = blogPostSchema.safeParse(body)
    if (!validation.success) {
      const errorMessage = validation.error.issues[0]?.message || 'Invalid input data.'
      return NextResponse.json({ error: errorMessage }, { status: 400 })
    }

    const { title, category, coverImage, excerpt, content, published } = validation.data

    // Generate unique slug
    let slug = generateSlug(title)
    let slugExists = await prisma.blogPost.findUnique({
      where: { slug },
    })

    let counter = 1
    const baseSlug = slug
    while (slugExists) {
      slug = `${baseSlug}-${counter}`
      slugExists = await prisma.blogPost.findUnique({
        where: { slug },
      })
      counter++
    }

    // Save blog post to database
    const post = await prisma.blogPost.create({
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

    // Clear Next.js cache so the new post shows up immediately
    revalidatePath('/blog')

    return NextResponse.json(
      { success: true, data: post, message: 'Blog post created successfully!' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Blog post creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post. Please check details and try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    })

    return NextResponse.json({ success: true, data: posts })
  } catch (error) {
    console.error('Error fetching admin blog posts:', error)
    return NextResponse.json({ error: 'Failed to retrieve blog posts.' }, { status: 500 })
  }
}
