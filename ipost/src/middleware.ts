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

  // If user is logged in, prevent access to public routes
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // If user is not logged in and trying to access private routes
  if (!isPublicPath && !token && !loggedInQuery) {
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
  }

  // Handle the logged_in query parameter
  if (loggedInQuery) {
    const url = request.nextUrl.clone();
    url.searchParams.delete('logged_in'); // Remove the query parameter
    const response = NextResponse.redirect(url);
    response.cookies.set('token', token, { httpOnly: true }); // Ensure token is set if needed
    return response;
  }

  return NextResponse.next(); // Proceed as usual
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
