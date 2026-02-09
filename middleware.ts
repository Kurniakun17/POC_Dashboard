import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // For now, let the dashboard layout handle authentication
  // This is a simple placeholder middleware
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"]
}
