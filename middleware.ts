import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const pathname = request.nextUrl.pathname

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

  // ✅ PUBLIC ROUTES
  const isPublic =
    pathname === "/" ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/status")

  // 🔒 AUTH REQUIRED
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

  // ⛔ FETCH PROFILE ONLY WHEN LOGGED IN
  let profile: { status: string; user_type: string } | null = null

  if (user) {
    const { data } = await supabase
      .from("profile")
      .select("status, user_type")
      .eq("user_id", user.id)
      .single()

    profile = data
  }

  // 🕒 PENDING USERS → STATUS PAGE (NON-ADMINS ONLY)
  if (
    user &&
    profile?.user_type !== "admin" &&
    profile?.status === "pending" &&
    !pathname.startsWith("/status")
  ) {
    return NextResponse.redirect(
      new URL("/status/pending", request.url)
    )
  }

  // 🚫 ACTIVE USERS → BLOCK /status/pending
  if (
    user &&
    profile?.status === "active" &&
    pathname === "/status/pending"
  ) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    )
  }

  // 🛑 ADMIN-ONLY: /review
  if (
    user &&
    pathname.startsWith("/review") &&
    profile?.user_type !== "admin"
  ) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    )
  }

  return response
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
}
