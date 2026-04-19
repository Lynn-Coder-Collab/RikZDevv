import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Simple rate limiting middleware base or auth check can go here
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/(user)/:path*", "/(admin)/:path*"],
};
