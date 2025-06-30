import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const path = request.nextUrl.pathname;
  const isPublic = path==="/" || path==="/sign-in" || path==="/sign-up" || path==="/verify" ||  path.startsWith("/verify/")  ;

   // Skip middleware for static assets, API routes, and Next.js internals
  if (
    path.startsWith('/_next/') ||
    path.startsWith('/api/') ||
    path.startsWith('/static/') ||
    path.includes('.') // This catches .css, .js, .png, .jpg, etc.
  ) {
    return NextResponse.next();
  }

  if (token && isPublic) {

    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
    
    if(!token && !isPublic){
         return NextResponse.redirect(new URL('/sign-in', request.url))
    }


    };

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/:path*", "/"],
};
