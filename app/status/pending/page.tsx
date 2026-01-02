"use client"

import { createBrowserClient } from "@supabase/ssr"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

type Profile = {
  full_name: string | null
  email: string
}


export default function PendingStatusPage() {
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
      router.replace("/auth/signup")
    }
  return (
    <>
      {/* <TopNavbar /> */}

      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md rounded-lg bg-white p-6 text-center shadow">

           <span className="text-sm text-gray-700">
        Hello, <strong>{profile?.full_name}</strong>
      </span>
          <h1 className="mb-4 text-2xl font-semibold text-gray-800">
            Account Pending Approval
          </h1>

          <p className="mb-6 text-gray-600">
            Your account has been created successfully and is currently under
            review by an administrator.
          </p>

          <p className="text-sm text-gray-500">
            You may log out and check back later once approved.
          </p>
          <Button onClick={handleLogout} variant="destructive">Logout</Button>
        </div>
      </div>
    </>
  )
}
