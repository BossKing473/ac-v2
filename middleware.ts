import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          response.cookies.set({ name, value: "", ...options })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // ✅ PUBLIC ROUTES
  const isPublic =
    pathname === "/" ||
    pathname.startsWith("/auth")

  // 🔒 PROTECTED ROUTES
  if (!isPublic && !user) {
    return NextResponse.redirect(
      new URL("/auth/signup", request.url)
    )
  }

  // 🚫 BLOCK AUTH PAGES WHEN LOGGED IN
  if (user && pathname.startsWith("/auth")) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    )
  }

  return response
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
}
