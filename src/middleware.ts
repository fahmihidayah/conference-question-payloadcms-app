import { NextRequest, NextResponse } from 'next/server';
import { getMeUser } from './utilities/getMeUser';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin/* routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  try {
    // Get the payload token from cookies
    const payloadToken = request.cookies.get('payload-token');
    
    if (!payloadToken?.value) {
      // No token found, redirect to login
      const loginUrl = new URL('/admin', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Get the base URL for API calls
    const baseUrl = request.nextUrl.origin;
    const token = await getMeUser();

    // Check if user is a super user
    if (token.user.isSuperUser) {
      // User is not a super user, redirect to home with error
      const homeUrl = new URL('/', request.url);
      homeUrl.searchParams.set('error', 'unauthorized');
      homeUrl.searchParams.set('message', 'You do not have permission to access the admin panel');
      return NextResponse.redirect(homeUrl);
    }

    // User is authorized, continue to admin
    return NextResponse.next();

  } catch (error) {
    console.error('Middleware error:', error);
    
    // On any error, redirect to login
    const loginUrl = new URL('/auth', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    const response = NextResponse.redirect(loginUrl);
    // Clear potentially corrupted token
    response.cookies.delete('payload-token');
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all admin paths except for API routes and static files
     */
    '/admin/:path*',
  ],
};