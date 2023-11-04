import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, NextRequest } from 'next/server'

export async function middleware (req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } }: any = await supabase.auth.getSession()

  const isStaticFile = /\.(ico|svg|png|jpg|jpeg|gif|webp)$/
    .test(req.nextUrl.pathname)

  const isNotLoginPage = !req.nextUrl.pathname.startsWith('/_next') &&
    !isStaticFile &&
    req.nextUrl.pathname !== '/login' &&
    req.nextUrl.pathname !== '/manifest.json' &&
    !req.nextUrl.searchParams.has('code')

  if (req.url.endsWith('/login') &&
    session?.user?.role === 'authenticated') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (session === null && isNotLoginPage) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}
