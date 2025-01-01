import NextAuth from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import auth_config from './auth_config';

const { auth } = NextAuth(auth_config);

export const config = {
  matcher: [
    "/@([^/]+)/settings",
    "/@([^/]+)/admin",
    "/@([^/]+)/products/add",
    "/@([^/]+)/products/edit/([^/]+)",
    "/auth"
  ],
};

const protectedRoutePatterns = [
  /^\/@[^\/]+\/products\/add$/,        // Matches /@user/products/add
  /^\/@[^\/]+\/products\/edit\/[^\/]+$/, // Matches /@user/products/edit/[id]
  /^\/@[^\/]+\/settings$/,            // Matches /@user/settings
];

export default auth(async (req) => {
  const { pathname } = req.nextUrl;
  const user = await getToken({ req, secret: process.env.NEXTAUTH_SECRET, raw: false, cookieName: "authjs.session-token-86768" });
  const isLogged = !!user;
  const authRoute = '/auth';
console.log(user)
  // Redirect to '/products' if accessing '/product'
  if (pathname === "/product") {
    return NextResponse.redirect(new URL('/products', req.url));
  }

  // If the user is logged in and visiting '/auth', redirect them to their profile
  if (isLogged && pathname === authRoute) {
    return NextResponse.redirect(new URL(`/@${user.username}`, req.url));
  }

  // Check if the current route is a protected route
  const isProtectedRoute = protectedRoutePatterns.some((pattern) => pattern.test(pathname));

  // Get the username from the URL path (e.g., /@username/settings)
  const usernameMatch = pathname.match(/(?<=\/@)([^/]+)/)?.[1];


  // If the user is not logged in and trying to access a protected route, redirect to auth
  if (!isLogged && isProtectedRoute) {
    return NextResponse.redirect(new URL(authRoute, req.url));
  }

  // If the logged-in user's username does not match the username in the URL, deny access
  if (isLogged && isProtectedRoute && usernameMatch && usernameMatch !== user.username) {
    return NextResponse.redirect(new URL(authRoute, req.url));
  }

  // if user is not admin then redirect to profile page
  if (pathname.includes("/admin") && (!isLogged ||  user?.role !== "admin")) {
    return NextResponse.redirect(new URL('/@' + user?.username, req.url));
  }

    // if user is admin and wants to access others admin pannel
    if (isLogged && pathname.includes("admin") && user?.role == "admin" && !pathname.includes(user?.username + "")) {
      return NextResponse.redirect(new URL('/@' + user?.username + "/admin", req.url));
    }

  return NextResponse.next();
});
