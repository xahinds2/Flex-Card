/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export function middleware(request: NextRequest, event: any) {
  // If Clerk Publishable Key is not set, run in Demo Mode and bypass auth middleware entirely
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return NextResponse.next();
  }

  const clerkHandler = clerkMiddleware(async (auth: any, req: any) => {
    if (isProtectedRoute(req)) {
      await auth.protect();
    }
  });

  return clerkHandler(request, event);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html|css|js|jpeg|jpg|png|gif|svg|ttf|woff2?|ico|csv|docx|xlsx|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

