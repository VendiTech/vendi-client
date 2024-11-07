import { NextRequest, NextResponse } from 'next/server';

const cookieName = process.env.NEXT_PUBLIC_COOKIE as string;

export async function middleware(request: NextRequest) {
  // const token = request.cookies.get(cookieName);
  // if (!token) {
  //   return NextResponse.redirect(new URL('/sign-in', request.url));
  // }
  // return NextResponse.next();
}

export const config = {
  matcher: [
    '/account',
    '/admin',
    '/advertising',
    '/comparison',
    '/export-data',
    '/sales',
    '/dashboard',
  ],
};
