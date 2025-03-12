// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Retrieve auth token from cookies
  const token = request.cookies.get('auth_token')?.value
  
  // Define protected routes
  const protectedRoutes = ['/account', '/orders']
  const currentPath = request.nextUrl.pathname
  
  // Check if the path is in protected routes
  const isProtectedRoute = protectedRoutes.some(route => 
    currentPath.startsWith(route)
  )
  
  // Redirect to login if accessing protected route without authentication
  if (isProtectedRoute && !token) {
    const url = new URL('/login', request.url)
    // Add a redirect parameter to return to this page after login
    url.searchParams.set('redirect', currentPath)
    return NextResponse.redirect(url)
  }
  
  return NextResponse.next()
}

// Configure middleware to run on specific paths
export const config = {
  matcher: ['/account/:path*', '/orders/:path*']
}