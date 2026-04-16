import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

const PROTECTED_PATHS = ["/apply", "/apply/continue", "/transfer", "/status"];

function isProtectedPath(pathname: string): boolean {
  const withoutLocale = pathname.replace(/^\/(en|ru|ky)/, "");
  return PROTECTED_PATHS.some(
    (p) => withoutLocale === p || withoutLocale.startsWith(p + "/")
  );
}

export async function middleware(request: NextRequest) {
  const intlResponse = intlMiddleware(request);

  // Check for auth token cookie (set by FastAPI login)
  const token = request.cookies.get("access_token")?.value;

  if (!token && isProtectedPath(request.nextUrl.pathname)) {
    const localeMatch = request.nextUrl.pathname.match(/^\/(en|ru|ky)/);
    const locale = localeMatch ? localeMatch[1] : "en";
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return intlResponse;
}

export const config = {
  matcher: [
    "/",
    "/(en|ru|ky)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
