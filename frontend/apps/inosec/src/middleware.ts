import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  
  // Extract tenant from subdomain
  const tenant = hostname.split('.')[0];
  
  // Skip middleware for localhost and main domain
  if (hostname.includes('localhost') || hostname === 'inosec.com') {
    return NextResponse.next();
  }
  
  // Handle tenant-specific routing
  if (tenant && tenant !== 'www' && tenant !== 'app') {
    // Add tenant to request headers for use in components
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-tenant', tenant);
    
    // Redirect to tenant-specific routes
    const url = request.nextUrl.clone();
    url.pathname = `/tenant/${tenant}${pathname}`;
    
    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
