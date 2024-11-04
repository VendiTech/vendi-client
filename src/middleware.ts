import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token_stg');

  const tokens = request.cookies.getAll();

  console.log(token, 'token', tokens);

  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
  return NextResponse.next();
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
