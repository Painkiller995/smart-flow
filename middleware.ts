import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { headers } from 'next/headers'

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)', '/api/workflows/(.*)*', '/api/webhooks/stripe'])

export default clerkMiddleware(async (auth, request) => {
    const headersList = await headers()

    if (!isPublicRoute(request)) {
        await auth.protect()
    }

    const authHeader = headersList.get("authorization")
    if (authHeader) { request.headers.set("authorization", authHeader) }

})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}