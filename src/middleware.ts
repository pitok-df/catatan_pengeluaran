import { getToken } from 'next-auth/jwt';
import { NextResponse, type NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        if (!req.nextUrl.pathname.startsWith("/auth/login")) {
            return NextResponse.redirect(new URL("/auth/login", req.nextUrl))
        }
    } else {
        if (!req.nextUrl.pathname.startsWith("/dashboard")) {
            return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
        }
    }
}

export const config = {
    matcher: ["/dashboard/:path*"]
}