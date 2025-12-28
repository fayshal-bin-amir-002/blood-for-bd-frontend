import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from './services/auth';

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ['/auth'];

const roleBasedPrivateRoutes = {
  USER: [/^\/become-donor/, /^\/profile/, /^\/organization\/[^\/]+/],
  ADMIN: [
    /^\/dashboard/,
    /^\/become-donor/,
    /^\/profile/,
    /^\/organization\/[^\/]+/,
  ],
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
          `${process.env.BASE_FRONT_END}/auth?redirectPath=${pathname}`,
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

  return NextResponse.redirect(new URL('/', request.url));
};

export const config = {
  matcher: [
    '/auth',
    '/become-donor',
    '/profile',
    '/dashboard',
    '/dashboard/:page*',
    '/organization/:id',
  ],
};
