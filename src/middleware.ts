import { getToken } from 'next-auth/jwt';
import { NextResponse, type NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log(token);

    if (!token) {
        // jika user mengkases halaman login, biarkan mereka dihalam tersebut
        if (req.nextUrl.pathname.startsWith("/auth/login")) {
            return NextResponse.next();
        }
        // jika user belum login, arahkan ke halaman login
        return NextResponse.redirect(new URL("/auth/login", req.nextUrl))
    }
    if (token) {
        if (req.nextUrl.pathname.startsWith("/auth/login")) {
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