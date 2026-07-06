import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { z } from 'zod'

const categorySchema = z.object({
  name: z.string().trim().min(2, 'Category name must be at least 2 characters long.').max(30, 'Category name cannot exceed 30 characters.'),
})

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const categoryId = parseInt(id)
    const body = await request.json()

    const validation = categorySchema.safeParse(body)
    if (!validation.success) {
      const errorMessage = validation.error.issues[0]?.message || 'Invalid input data.'
      return NextResponse.json({ error: errorMessage }, { status: 400 })
    }

    const { name } = validation.data

    // Check if the category exists
    const existing = await prisma.category.findUnique({
      where: { id: categoryId },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Category not found.' }, { status: 404 })
    }

    // Check if the new name clashes with another category
    const clash = await prisma.category.findFirst({
      where: { name, id: { not: categoryId } },
    })

    if (clash) {
      return NextResponse.json({ error: 'A category with this name already exists.' }, { status: 400 })
    }

    // Rename the category and bulk-update associated blog post tags in a transaction
    await prisma.$transaction([
      prisma.category.update({
        where: { id: categoryId },
        data: { name },
      }),
      prisma.blogPost.updateMany({
        where: { category: existing.name },
        data: { category: name },
      }),
    ])

    return NextResponse.json({ success: true, message: 'Category renamed successfully!' })
  } catch (error) {
    console.error('Error renaming category:', error)
    return NextResponse.json({ error: 'Failed to rename category.' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const categoryId = parseInt(id)

    // Check if the category exists
    const existing = await prisma.category.findUnique({
      where: { id: categoryId },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Category not found.' }, { status: 404 })
    }

    // Delete the category (posts under it retain their category string value)
    await prisma.category.delete({
      where: { id: categoryId },
    })

    return NextResponse.json({ success: true, message: 'Category deleted successfully!' })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json({ error: 'Failed to delete category.' }, { status: 500 })
  }
}
