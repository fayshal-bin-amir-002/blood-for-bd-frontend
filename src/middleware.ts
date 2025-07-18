import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/auth";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/auth"];

const roleBasedPrivateRoutes = {
  USER: [/^\/become-donor/, /^\/profile/],
  ADMIN: [/^\/dashboard/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/auth?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: ["/auth", "/become-donor", "/profile", "/dashboard/:page"],
};
