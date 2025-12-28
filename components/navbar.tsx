"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  LogOut,
  Accessibility,
  UserCircle,
} from "lucide-react"
import { createClient } from "@/app/utils/client"
import Image from "next/image"
import logo from "@/public/Accessible Connections.png"
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [fullName, setFullName] = useState<string | null>(null)
  const pathname = usePathname()
  const supabase = createClient()

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Library", path: "/library" },
    { name: "Training", path: "/training" },
    { name: "Community", path: "/community" },
    { name: "Contact", path: "/contact" }
  ]

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data } = await supabase
        .from("profile")
        .select("full_name")
        .eq("user_id", user.id)
        .single()

      if (data) setFullName(data.full_name)
    }

    fetchUser()
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/auth/signup"
  }

  return (
    <header className="sticky top-0 z-50">
      <nav className="backdrop-blur-xl bg-white/80 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-3">
            <div>
              <Image src={logo} alt="Logo" width={50} height={50} />
            </div>
            <div className="leading-none">
              <p className="font-extrabold text-lg text-gray-900">
                Accessible
                <span className="text-purple-600">Connections</span>
              </p>
              <span className="text-xs text-gray-500">
                AccessPWD Platform
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map(link => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-sm font-semibold transition ${
                  pathname === link.path
                    ? "text-purple-600"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Profile */}
            <div className="flex items-center gap-3 pl-6 border-l border-neutral-200">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100">
                <UserCircle className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-semibold text-gray-800">
                  {fullName ? `Hello, ${fullName}` : "Welcome"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 rounded-full text-gray-500 hover:text-rose-600 hover:bg-rose-50 transition"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-neutral-100"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white border-b border-neutral-200"
          >
            <div className="px-6 py-6 space-y-4">
              {links.map(link => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-base font-semibold ${
                    pathname === link.path
                      ? "text-purple-600"
                      : "text-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-neutral-200">
                <p className="text-sm text-gray-600 mb-3">
                  {fullName ? `Signed in as ${fullName}` : "Signed in"}
                </p>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-rose-600 font-semibold"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
