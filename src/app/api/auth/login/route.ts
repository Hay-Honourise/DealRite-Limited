import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address.').toLowerCase(),
  password: z.string().min(1, 'Password is required.'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validation = loginSchema.safeParse(body)

    if (!validation.success) {
      const errorMessage = validation.error.issues[0]?.message || 'Invalid login details.'
      return NextResponse.json({ error: errorMessage }, { status: 400 })
    }

    const { email, password } = validation.data

    // Query user by email
    let user = await prisma.user.findUnique({
      where: { email },
    })

    // Auto-seed default user if database has no registered accounts
    const userCount = await prisma.user.count()
    if (userCount === 0 && email === 'admin@dealriterealty.com') {
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash('adminpassword', saltRounds)
      user = await prisma.user.create({
        data: {
          email: 'admin@dealriterealty.com',
          password: hashedPassword,
          name: 'DealRite Admin',
        }
      })
    }

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    // Verify hashed password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    // Create a secure JWT token using jose library (Edge compatible)
    const secretKey = new TextEncoder().encode(
      process.env.JWT_SECRET || 'dealrite-realty-super-secret-key-change-in-production'
    )
    const token = await new SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secretKey)

    // Set secure HttpOnly cookie response
    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful. Redirecting to admin console...',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    })

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day in seconds
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login auth error:', error)
    return NextResponse.json({ error: 'Internal server error occurred.' }, { status: 500 })
  }
}
