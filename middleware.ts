import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/sales", "/inventory", "/payroll", "/admin", "/config"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!isProtected) return NextResponse.next();

  const hasSession = Boolean(request.cookies.get("sb-access-token")?.value);
  if (hasSession) return NextResponse.next();

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/dashboard/:path*", "/sales/:path*", "/inventory/:path*", "/payroll/:path*", "/admin/:path*", "/config/:path*"]
};
