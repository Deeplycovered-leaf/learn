import { middleware1, middleware2 } from "middlewares"

export async function middleware(request) {
  await middleware1(request)
  await middleware2(request)
}

export const config = {
  matcher: [
    /*
     * 匹配所有的路径除了以这些作为开头的：
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
