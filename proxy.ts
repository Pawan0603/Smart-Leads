import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  let cookies = request.cookies.get('token');

  if (cookies && (request.nextUrl.pathname.startsWith('/auth') ||  request.nextUrl.pathname === '/')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!cookies && (request.nextUrl.pathname.startsWith('/dashboard'))){
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }  
}

export const config = {
  matcher: [
    '/auth/:path*',
    '/dashboard/:path*',
    '/',
  ],
}