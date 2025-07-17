import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Get the token from cookies
  const token = request.cookies.get("token")?.value;
  const isAdminValue = request.cookies.get("isAdmin")?.value;
  // console.log(token, isAdmin);
  const isLoggedIn: boolean = !!token;
  const isAdmin: boolean = isAdminValue === "true";
  const authRoutes: string[] = ["/login", "/sign-up"];
  const protectedRoutes: string[] = ["/home", "/form", "/inbox", "/dashboard"];
  if (isLoggedIn && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/home", request.nextUrl));
  }
  if (!isLoggedIn && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  if (!isAdmin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/home", request.nextUrl));
  }
  if ((isLoggedIn && pathname === "/") || (!isLoggedIn && pathname === "/")) {
    return NextResponse.redirect(new URL("/home", request.nextUrl));
  }
  console.log(`allow the path ${pathname}`);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
