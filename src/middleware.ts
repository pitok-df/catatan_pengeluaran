import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        // jika user mengakses halaman login, biarkan mereka di halaman tersebut
        if (pathname.startsWith("/auth/login")) {
            return NextResponse.next();
        }
        // jika user belum login, arahkan ke halaman login
        return NextResponse.redirect(new URL("/auth/login", req.nextUrl))
    }

    if (token) {
        if (pathname.startsWith("/auth/login")) {
            return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
        }
        if (!pathname.startsWith("/dashboard")) {
            return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
        }
    }
}

export const config = {
    matcher: ["/auth/login", "/dashboard/:path*"]
}
