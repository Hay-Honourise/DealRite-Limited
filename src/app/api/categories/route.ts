import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { z } from 'zod'

const categorySchema = z.object({
  name: z.string().trim().min(2, 'Category name must be at least 2 characters long.').max(30, 'Category name cannot exceed 30 characters.'),
})

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    })
    return NextResponse.json({ success: true, data: categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Failed to retrieve categories.' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validation = categorySchema.safeParse(body)
    
    if (!validation.success) {
      const errorMessage = validation.error.issues[0]?.message || 'Invalid input data.'
      return NextResponse.json({ error: errorMessage }, { status: 400 })
    }

    const { name } = validation.data

    // Check if category name is unique
    const existing = await prisma.category.findUnique({
      where: { name },
    })

    if (existing) {
      return NextResponse.json({ error: 'A category with this name already exists.' }, { status: 400 })
    }

    const category = await prisma.category.create({
      data: { name },
    })

    return NextResponse.json({ success: true, data: category }, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json({ error: 'Failed to create category.' }, { status: 500 })
  }
}
