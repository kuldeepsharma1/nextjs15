import { NextRequest, NextResponse } from "next/server";


export function middleware(request: NextRequest){
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/auth/login' || path === '/auth/register'|| path === '/auth/register'

    const token = request.cookies.get('token')?.value || ''
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/',request.nextUrl))
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/auth/login',request.nextUrl))
    }
}

export const config = { matcher:[
    '/',
    '/auth/profile',
    '/auth/login',
    '/auth/register'
]
}