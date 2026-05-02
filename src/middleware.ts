import { NextResponse } from 'next/server'

export function middleware() {
  // TEMPORARY: Bypassing auth check for development
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}
