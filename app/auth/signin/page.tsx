"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Shield,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  Fingerprint,
} from "lucide-react"

import { createClient } from "@/app/utils/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignInPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setIsLoading(false)

    if (error || !data.user) {
      setError("Invalid email or password.")
      return
    }

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-stretch bg-[#0f172a] font-sans">
      {/* LEFT BRANDING */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-16 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-20%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-primary-light flex items-center justify-center text-white font-bold text-xl shadow-lg">
              AC
            </div>
            <span className="text-2xl font-bold tracking-tight">
              Accessible Connections
            </span>
          </div>

          <h1 className="text-6xl font-extrabold leading-tight mb-6">
            One Account.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-accent">
              Secure Access.
            </span>
          </h1>

          <p className="text-xl text-blue-100/70 max-w-lg leading-relaxed">
            Sign in securely using your registered email and password to access
            services designed for Persons with Disabilities.
          </p>
        </div>

        <div className="w-[420px] h-[260px] rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl p-8 flex flex-col justify-between">
          <Fingerprint size={48} className="text-white/80" />
          <p className="text-white/70 text-sm">
            Identity verified via secure authentication
          </p>
        </div>

        <div className="relative z-10 text-sm text-blue-200/50">
          © 2025 Accessible Connections
        </div>
      </div>

      {/* SIGN IN FORM */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 md:p-12">
        <div className="max-w-md w-full">
          <div className="bg-card rounded-3xl p-8 shadow-xl border border-border">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-extrabold text-foreground">
                  Sign In
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Use your registered email
                </p>
              </div>
              <Shield size={28} className="text-primary/20" />
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 border border-red-100 flex gap-3">
                <AlertCircle size={20} />
                <p className="text-sm font-semibold">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* EMAIL */}
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="pl-10"
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="pl-10"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full text-white font-bold py-6 rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={20} />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t text-center space-y-2">
              <Link
                href="/auth/signup"
                className="text-primary font-bold hover:underline text-sm block"
              >
                Create New Account
              </Link>

              <Link
                href="/auth/forgot-password"
                className="text-muted-foreground hover:underline text-xs block"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
