import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('role')?.value;
  const { pathname } = request.nextUrl;

  // Protected routes — belum login redirect ke /login
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // User sudah login, coba akses halaman auth
  if (token && ['/login', '/register', '/pilih-role'].includes(pathname)) {
    // Sudah punya role → langsung ke dashboard yang sesuai
    if (role === 'volunteer') {
      return NextResponse.redirect(new URL('/dashboard/relawan', request.url));
    }
    if (role === 'lembaga') {
      return NextResponse.redirect(new URL('/dashboard/pelapor', request.url));
    }
    // Token ada tapi belum pilih role → biarkan masuk /pilih-role
    if (pathname !== '/pilih-role') {
      return NextResponse.redirect(new URL('/pilih-role', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register', '/pilih-role'],
};