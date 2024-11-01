import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // const token = request.cookies.get('auth_token_stg');
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
