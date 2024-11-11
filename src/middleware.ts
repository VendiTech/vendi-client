import { NextRequest, NextResponse } from 'next/server';
import { Routes } from '@/lib/constants/routes';

const cookieName = process.env.NEXT_PUBLIC_COOKIE as string;

export async function middleware(
  request: NextRequest
) {
  const token = request.cookies.get(cookieName);
  if (!token) {
    // return NextResponse.redirect(new URL(Routes.SignIn, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    Routes.Account,
    Routes.Admin,
    Routes.Advertising,
    Routes.Comparison,
    Routes.ExportData,
    Routes.Sales,
    Routes.Dashboard,
  ],
};
