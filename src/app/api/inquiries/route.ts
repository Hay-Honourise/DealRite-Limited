import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendInquiryEmail } from '@/lib/mail';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, propertyId } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Name, email, and phone are required.' }, { status: 400 });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone,
        message: message || '',
        propertyId: propertyId || null,
        status: 'Pending',
      },
    });

    // Send email notification to operations team
    try {
      await sendInquiryEmail(inquiry);
    } catch (mailError) {
      console.error('Failed to send notification email:', mailError);
    }

    return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}
