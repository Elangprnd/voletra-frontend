import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // TEMPORARY: Bypassing auth check for development
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}
