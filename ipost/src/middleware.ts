import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Public routes
  const isPublicPath = 
    path === '/auth/login' || 
    path === '/auth/register' || 
    path === '/auth/verifyemail';

  const token = request.cookies.get('token')?.value || '';
  const loggedInQuery = request.nextUrl.searchParams.get('logged_in');

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!isPublicPath && !token && !loggedInQuery) {
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
  }

  // Allow logged-in requests with query parameter
  if (loggedInQuery) {
    const url = request.nextUrl.clone();
    url.searchParams.delete('logged_in'); // Clean up query parameters
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    '/',
    '/auth/profile',
    '/auth/login',
    '/auth/register',
    '/blogs/create',
  ],
};
