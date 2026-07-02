import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const subscriptionSchema = z.object({
  firstName: z.string().trim().nullable().optional().or(z.literal('')),
  email: z.string().trim().email('Please provide a valid email address.').toLowerCase(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate request inputs using Zod
    const validation = subscriptionSchema.safeParse(body)
    if (!validation.success) {
      const errorMessage = validation.error.issues[0]?.message || 'Invalid input data.'
      return NextResponse.json({ error: errorMessage }, { status: 400 })
    }

    const { firstName, email } = validation.data

    // Check if the email is already subscribed
    const existing = await prisma.newsletterSubscription.findUnique({
      where: { email },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'This email address is already subscribed to our exclusive updates.' },
        { status: 400 }
      )
    }

    // Save subscription to the database
    const subscription = await prisma.newsletterSubscription.create({
      data: {
        firstName: firstName || null,
        email,
      },
    })

    return NextResponse.json(
      { success: true, data: subscription, message: 'Thank you for subscribing!' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to process your subscription. Please try again later.' },
      { status: 500 }
    )
  }
}
