import { NextResponse } from 'next/server'

export async function middleware2(request) {
  console.log(request.url)
  return NextResponse.next()
}