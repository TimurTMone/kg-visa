import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { createServerClient } from "@supabase/ssr";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

// Pages that require authentication
const PROTECTED_PATHS = ["/apply", "/apply/continue", "/transfer", "/status"];

function isProtectedPath(pathname: string): boolean {
  // Strip locale prefix
  const withoutLocale = pathname.replace(/^\/(en|ru|ky)/, "");
  return PROTECTED_PATHS.some(
    (p) => withoutLocale === p || withoutLocale.startsWith(p + "/")
  );
}

export async function middleware(request: NextRequest) {
  // Run intl middleware first to get the response with locale handling
  const intlResponse = intlMiddleware(request);

  // Refresh Supabase session on every request
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          cookiesToSet.forEach(({ name, value, options }) =>
            intlResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If accessing a protected route without being logged in, redirect to login
  if (!user && isProtectedPath(request.nextUrl.pathname)) {
    // Determine the locale from the URL
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
