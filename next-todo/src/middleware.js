import { middleware1, middleware2 } from "@/middlewares"

export async function middleware(request) {
  await middleware1(request)
  await middleware2(request)
}

export const config = {
  matcher: '/api/:path*',
}