"use client"
import { useState, useEffect } from "react"

export default function Navbar() {
  const [user, setUser] = useState<{ email: string; role: string } | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("devmind_user")
    if (stored) setUser(JSON.parse(stored))
  }, [])

  function handleLogout() {
    localStorage.removeItem("devmind_token")
    localStorage.removeItem("devmind_user")
    window.location.href = "/login"
  }

  return (
    <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 bg-gray-950/90 backdrop-blur z-50">
      <a href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center font-bold text-sm">
          D
        </div>
        <span className="font-semibold text-lg">DevMind AI</span>
      </a>

      <div className="flex items-center gap-6">
        <a href="/generate" className="text-sm text-gray-400 hover:text-white transition">
          Generate
        </a>
        <a href="/debug" className="text-sm text-gray-400 hover:text-white transition">
          Debug
        </a>
        <a href="/docs" className="text-sm text-gray-400 hover:text-white transition">
          Docs
        </a>
        <a href="/dashboard" className="text-sm text-gray-400 hover:text-white transition">
          Dashboard
        </a>

        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
                {user.email[0].toUpperCase()}
              </div>
              <span className="text-sm text-gray-300">{user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-white transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <a
            href="/login"
            className="text-sm bg-purple-600 hover:bg-purple-500 px-4 py-1.5 rounded-lg transition"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  )
}