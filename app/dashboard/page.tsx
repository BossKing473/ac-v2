"use client"

import type React from "react"
import { useEffect, useState } from "react"
import {
  User,
  Mail,
  Accessibility,
  Calendar,
  MapPin,
  BadgeCheck,
  ImageIcon,
  Shield,
  Fingerprint,
  Star,
} from "lucide-react"
import { createClient } from "../utils/client"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface Profile {
  user_id: string
  full_name: string
  email: string
  disability_type: string
  sex: string
  birthdate: string
  address: string
  pwd_id: string | null
  pwd_id_image_url: string | null
  status?: "pending" | "approved" | "rejected"
  created_at: string
}

export default function UserDashboard() {
  const supabase = createClient()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
    const router = useRouter();
     
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return setLoading(false)

      const { data } = await supabase
        .from("profile")
        .select("*")
        .eq("user_id", user.id)
        .single()

      setProfile(data as Profile)
      setLoading(false)
    }

    fetchProfile()
  }, [supabase])

   useEffect(() => {
    router.refresh(); // refresh server data when Dashboard mounts
  }, [router]);
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="h-12 w-12 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-neutral-400">
        Profile not found
      </div>
    )
  }

  const statusStyles = {
    approved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    rejected: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  }



  return (
    <><Navbar/>
    <div className="min-h-screen bg-neutral-950 pt-10 text-white">
      {/* HEADER */}
      <div className="relative border-b border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-32 left-1/3 w-96 h-96 bg-emerald-500/20 blur-3xl rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-wrap justify-between items-center gap-8">
            <div>
              <h1 className="text-5xl font-extrabold mb-3">
                Hello,
                <span className="block text-emerald-400">{profile.full_name} </span>
              </h1>
              <p className="text-neutral-400">
                AccessPWD · Personal Dashboard
              </p>
            </div>

            {/* STATUS */}
            <div
              className={`px-6 py-4 rounded-2xl border backdrop-blur-md ${
                statusStyles[profile.status || "pending"]
              }`}
            >
              <div className="flex items-center gap-3">
                <BadgeCheck />
                <div>
                  <p className="text-xs uppercase font-bold tracking-widest opacity-70">
                    Status
                  </p>
                  <p className="text-xl font-bold capitalize">
                    {profile.status || "pending"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
        {/* PWD ID CARD */}
        <div className="relative bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/30 rounded-3xl p-8">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-emerald-500/20 text-emerald-400">
              <Fingerprint className="h-8 w-8" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-widest text-neutral-400">
                PWD ID Number
              </p>
              <p className="text-3xl font-mono font-bold text-emerald-400 tracking-widest">
                {profile.pwd_id || "Not provided"}
              </p>
            </div>
          </div>
        </div>

        {/* PROFILE INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Info icon={<User />} label="Full Name" value={profile.full_name} />
          <Info icon={<Mail />} label="Email" value={profile.email} />
          <Info icon={<Accessibility />} label="Disability Type" value={profile.disability_type} />
          <Info
            icon={<Calendar />}
            label="Birthdate"
            value={new Date(profile.birthdate).toLocaleDateString()}
          />
          <Info icon={<MapPin />} label="Address" value={profile.address} />
          <Info icon={<Shield />} label="Account Created" value={new Date(profile.created_at).toLocaleDateString()} />
        </div>

        {/* ID IMAGE */}
        {profile.pwd_id_image_url && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <ImageIcon className="text-emerald-400" />
              <h2 className="text-2xl font-bold">PWD ID Image</h2>
            </div>
            <img
              src={profile.pwd_id_image_url}
              alt="PWD ID"
              className="rounded-xl max-w-2xl border border-neutral-700"
            />
          </div>
        )}
      </div>
        <Footer />
    </div>
    </>
  )
}

/* ---------- INFO CARD ---------- */

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-emerald-500/40 transition">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-neutral-800 text-emerald-400">
          {icon}
        </div>
        <div>
          <p className="text-xs uppercase font-bold tracking-widest text-neutral-500 mb-1">
            {label}
          </p>
          <p className="text-lg font-semibold break-words">
            {value}
          </p>
        </div>
      </div>
    
    </div>
  )
}
