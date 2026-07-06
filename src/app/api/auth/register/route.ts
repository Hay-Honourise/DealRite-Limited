import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address.').toLowerCase(),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
  name: z.string().trim().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validation = registerSchema.safeParse(body)

    if (!validation.success) {
      const errorMessage = validation.error.issues[0]?.message || 'Invalid input data.'
      return NextResponse.json({ error: errorMessage }, { status: 400 })
    }

    const { email, password, name } = validation.data

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: 'A user with this email address already exists.' }, { status: 400 })
    }

    // Hash the password securely
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Save the user in the database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })

    return NextResponse.json(
      { success: true, data: user, message: 'User registered successfully!' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Failed to complete registration.' }, { status: 500 })
  }
}
