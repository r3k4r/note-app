import { NextResponse } from "next/server"


export default async function middleware(req) {
    const { pathname } = req.nextUrl
    const isAuth = req.cookies.get('id')?.value
    console.log('isAuth:', isAuth, 'pathname:', pathname)
    

    
    // Routes that are always public (accessible to everyone)
    const publicRoutes = ['/Frame.svg', '/Logo.svg',]
    
    // Public routes when logged out, private when logged in
    const authRoutes = ['/login', '/signup']


    // If the current path is a public route, allow access regardless of auth status
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next()
    }

    
    if (isAuth && authRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/', req.url))
    }
    
    if (!isAuth && !authRoutes.includes(pathname) && !publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
  }


// Protect all routes except static files and api routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}