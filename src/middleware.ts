import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Paths that don't require authentication
const publicPaths = ['/login'];

// Paths that are completely excluded from middleware processing
const excludedPaths = ['/api/auth'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Check if the path is excluded from middleware processing
  if (excludedPaths.some(excludedPath => path.startsWith(excludedPath))) {
    return NextResponse.next();
  }
  
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;
  
  // Get the base URL for redirects
  const baseUrl = request.nextUrl.origin;
  
  // Check if the path is public or requires authentication
  const isPublicPath = publicPaths.includes(path);
  
  // Redirect authenticated users away from public pages
  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", baseUrl));
  }
  
  // Redirect unauthenticated users to login from protected pages
  if (!isPublicPath && !isAuthenticated && path !== '/') {
    return NextResponse.redirect(new URL("/login", baseUrl));
  }
  
  // Redirect root to dashboard if authenticated, otherwise to login
  if (path === "/" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", baseUrl));
  } else if (path === "/" && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", baseUrl));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
}; 