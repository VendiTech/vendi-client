import { NextRequest, NextResponse } from 'next/server';
import { Routes } from '@/lib/constants/routes';

const cookieName = process.env.NEXT_PUBLIC_COOKIE as string;

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(cookieName);
  
  const isAuthPage = [
    Routes.SignIn,
    Routes.ResetPassword,
    Routes.ForgotPassword,
  ].includes(request.nextUrl.pathname as Routes);
  
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL(Routes.SignIn, request.nextUrl));
  }
  
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL(Routes.Dashboard, request.nextUrl));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
};
