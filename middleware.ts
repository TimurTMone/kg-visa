import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match root
    "/",
    // Match locale prefixed paths (excluding api, _next, and static files)
    "/(en|ru|ky)/:path*",
    // Match all other paths that are not api, _next, or static files
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
