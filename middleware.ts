import { NextRequest, NextResponse } from "next/server";

const PRIVATE_PREFIXES = ["/profile", "/notes"];
const AUTH_PATHS = ["/sign-in", "/sign-up"];

function isPrivatePath(pathname: string): boolean {
  return PRIVATE_PREFIXES.some((p) => pathname.startsWith(p));
}

function isAuthPath(pathname: string): boolean {
  return AUTH_PATHS.some((p) => pathname.startsWith(p));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Read token cookie – adjust the name to match what your backend sets
  const token =
    req.cookies.get("accessToken")?.value ||
    req.cookies.get("refreshToken")?.value;

  const isLoggedIn = Boolean(token);

  // Unauthenticated user tries to access a private page
  if (isPrivatePath(pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Authenticated user tries to access auth pages
  if (isAuthPath(pathname) && isLoggedIn) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};