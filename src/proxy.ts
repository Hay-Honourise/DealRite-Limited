import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value

  // If the admin token cookie is missing, redirect immediately to login
  if (!token) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  try {
    const secretKey = new TextEncoder().encode(
      process.env.JWT_SECRET || 'dealrite-realty-super-secret-key-change-in-production'
    )
    
    // Verify the JWT token signature using jose (pure Edge Runtime compatible)
    await jwtVerify(token, secretKey)
    return NextResponse.next()
  } catch (error) {
    console.error('Admin proxy token verification failed:', error)
    
    // If the token is expired or invalid, clear the token and redirect to login
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    const response = NextResponse.redirect(url)
    response.cookies.delete('admin_token')
    return response
  }
}

// Intercept all admin routes under /admin/...
export const config = {
  matcher: ['/admin/:path*'],
}
