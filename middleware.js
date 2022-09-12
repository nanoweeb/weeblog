import { NextResponse } from "next/server";

export async function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/admin/auth/login")) {
    const token = await req.cookies.get("token");

    if (token) {
      return NextResponse.redirect(
        new URL("/admin/dashboard", req.nextUrl.origin)
      );
    }
  }

  if (req.nextUrl.pathname.startsWith("/admin/home")) {
    const token = await req.cookies.get("token");

    if (!token) {
      return NextResponse.redirect(
        new URL("/admin/auth/login", req.nextUrl.origin)
      );
    }
  }
}
