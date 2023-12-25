import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: ["/api/webhook", "/", "/browse", "/courses/(.*)"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};

// A list of routes that should return 401 if the user is not logged in. You can use glob patterns to match multiple routes or a function to match against the request object. For example: ['/foo', '/bar(.*)'] or [/^/foo/.*$/]
