import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// add for bug
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  // add for bug
  const cookieStore = await cookies();

  const { pathname } = request.nextUrl;
  // Get the token from cookies

  const token = cookieStore.get("token")?.value;
  const isAdminValue = cookieStore.get("isAdmin")?.value;
  // console.log(token, isAdminValue);
  const isLoggedIn: boolean = !!token;
  const isAdmin: boolean = isAdminValue === "admin" ? true : false;
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
