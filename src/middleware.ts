import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Protected routes — belum login redirect ke home dengan parameter auth
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      const homeUrl = new URL('/', request.url);
      homeUrl.searchParams.set('auth', 'login');
      homeUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(homeUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};