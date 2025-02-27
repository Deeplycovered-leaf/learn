import { NextResponse } from 'next/server'

export async function middleware1(request) {
  console.log(request.url)
  return NextResponse.next()
}