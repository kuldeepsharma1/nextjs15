import { NextRequest, NextResponse } from "next/server";

const publicPaths = [
  '/',
  '/about',
  '/faq',
  '/contact',
  '/community',
  '/login',
  '/register',
  '/forgot',
  '/reset',
];

const protectedPaths = [
  '/profile',
  '/blogs/write',
  '/blogs/[slug]',
  '/blogs/[slug]/edit',
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || '';

  // If the user is authenticated and tries to access the public path, redirect to /home
  if (publicPaths.includes(path) && token) {
    return NextResponse.redirect(new URL('/home', request.nextUrl));
  }

  // If the user is not authenticated and tries to access protected paths, redirect to /login
  if (protectedPaths.some(route => path.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/', '/about', '/faq', '/contact', '/community', '/profile',
    '/login', '/register', '/forgot', '/reset',
    '/blogs/write', '/blogs', '/blogs/[slug]', '/blogs/[slug]/edit',
    '/home'
  ],
};
