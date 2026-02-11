import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest) {
  const response = intlMiddleware(req);

  const token = req.cookies.get("auth_token")?.value;

  const pathname = req.nextUrl.pathname.replace(/^\/(en|ar)/, "");

  const protectedRoutes = ["/profile", "/orders"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected && !token) {
    const locale = req.nextUrl.pathname.split("/")[1];
    const loginUrl = new URL(`/${locale}/login`, req.url);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/", "/(en|ar)/:path*"],
};
