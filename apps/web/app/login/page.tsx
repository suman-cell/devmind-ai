"use client"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleLogin() {
    if (!email || !password) return setError("All fields are required")
    setLoading(true)
    setError("")
    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) return setError(data.error || "Login failed")
      localStorage.setItem("devmind_token", data.token)
      localStorage.setItem("devmind_user", JSON.stringify(data.user))
      window.location.href = "/dashboard"
    } catch {
      setError("Could not connect to server")
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center font-bold text-xl mx-auto mb-4">D</div>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-gray-400 mt-1">Sign in to your DevMind account</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-4">
          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-400 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500"
              onKeyDown={e => e.key === "Enter" && handleLogin()}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 py-3 rounded-xl font-medium transition mt-2"
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="/register" className="text-purple-400 hover:text-purple-300">Register free</a>
          </p>
        </div>
      </div>
    </main>
  )
}