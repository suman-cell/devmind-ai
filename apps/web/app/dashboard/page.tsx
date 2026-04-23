"use client"
import { useState, useEffect } from "react"
import Navbar from "../../components/Navbar"

interface User {
  email: string
  role: string
  name?: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("devmind_user")
    if (stored) {
      setUser(JSON.parse(stored))
    } else {
      window.location.href = "/login"
    }
  }, [])

  if (!mounted) return null

  if (!user) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <p className="text-gray-400">Loading...</p>
    </div>
  )

  const stats = [
    { label: "Code Generations", value: "24", change: "+12 this week" },
    { label: "Bugs Debugged", value: "8", change: "+3 this week" },
    { label: "Docs Generated", value: "15", change: "+7 this week" },
    { label: "Time Saved", value: "4.2h", change: "this week" },
  ]

  const quickActions = [
    { label: "Generate Code", desc: "Describe what you need", href: "/generate", icon: "⚡" },
    { label: "Debug Code", desc: "Paste code + error", href: "/debug", icon: "🐛" },
    { label: "Generate Docs", desc: "Auto-document your code", href: "/docs", icon: "📄" },
  ]

  const recentActivity = [
    { action: "Generated", desc: "REST API endpoint in TypeScript", time: "2 mins ago", icon: "⚡" },
    { action: "Debugged", desc: "TypeError in React component", time: "1 hour ago", icon: "🐛" },
    { action: "Documented", desc: "Authentication middleware", time: "3 hours ago", icon: "📄" },
    { action: "Generated", desc: "MongoDB schema for users", time: "Yesterday", icon: "⚡" },
    { action: "Debugged", desc: "CORS error in Express.js", time: "Yesterday", icon: "🐛" },
  ]

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-10">

        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            Welcome back{user.name ? `, ${user.name}` : ""} 👋
          </h1>
          <p className="text-gray-400 mt-1">Here is what is happening with your workspace.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map(stat => (
            <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="md:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map(action => (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-4 bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-xl p-4 transition group"
                >
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-xl group-hover:bg-gray-700 transition">
                    {action.icon}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{action.label}</p>
                    <p className="text-xs text-gray-500">{action.desc}</p>
                  </div>
                  <span className="ml-auto text-gray-600 group-hover:text-gray-400 transition">→</span>
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl divide-y divide-gray-800">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-sm">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">
                      <span className="text-purple-400">{item.action}</span>{" "}
                      <span className="text-gray-300">{item.desc}</span>
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Your Role</p>
            <p className="font-semibold mt-1 capitalize">{user.role}</p>
          </div>
          <div className="bg-purple-900/40 border border-purple-700/50 text-purple-300 text-sm px-4 py-2 rounded-full capitalize">
            {user.role}
          </div>
        </div>

      </main>
    </div>
  )
}