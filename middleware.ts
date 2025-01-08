import NextAuth from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import auth_config from './auth_config';

const { auth } = NextAuth(auth_config);

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};

export default auth(async (req) => {
  const { pathname } = req.nextUrl;
  const user = await getToken({ req, secret: process.env.NEXTAUTH_SECRET, raw: false, cookieName: "user" });
  const isLogged = !!user;
  const authRoute = '/auth';

  // Redirect to '/products' if accessing '/product'
  if (pathname === "/product") {
    return NextResponse.redirect(new URL('/products', req.url));
  }
  if (pathname === "/course") {
    return NextResponse.redirect(new URL('/courses', req.url));
  }
  if (pathname === "/blog") {
    return NextResponse.redirect(new URL('/blogs', req.url));
  }
  // If the user is logged in and visiting '/auth', redirect them to their profile
  if (isLogged && pathname === authRoute) {
    return NextResponse.redirect(new URL(`/courses}`, req.url));
  }
  
  // If the user is not logged in and trying to access a protected route, redirect to auth
  if (!isLogged || user?.role != "admin" && /^\/admin\/?.*/.test(pathname)) {
    return NextResponse.redirect(new URL("/courses", req.url));
  }

  return NextResponse.next();
});
