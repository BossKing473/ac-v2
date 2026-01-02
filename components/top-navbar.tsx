"use client"

import { createBrowserClient } from "@supabase/ssr"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Profile = {
  full_name: string | null
  email: string
}

export default function TopNavbar() {
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  )

  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data } = await supabase
        .from("profile")
        .select("full_name, email")
        .eq("user_id", user.id)
        .single()

      setProfile(data)
    }

    loadProfile()
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace("/auth/login")
  }

  return (
    <nav className="w-full border-b bg-white px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-800">
            {profile?.full_name || "User"}
          </span>
          <span className="text-xs text-gray-500">
            {profile?.email}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="rounded bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
