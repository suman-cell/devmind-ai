"use client"
import { useState } from "react"
import Navbar from "../../components/Navbar"

export default function DebugPage() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleDebug() {
    if (!code.trim() || !error.trim()) return
    setLoading(true)
    setOutput("")
    try {
      const res = await fetch("http://localhost:3001/api/debug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, error }),
      })
      const data = await res.json()
      setOutput(data.fix || data.error || "No output returned")
    } catch {
      setOutput("❌ Could not connect to backend.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-2">AI Debugger</h1>
        <p className="text-gray-400 mb-8">Paste your code and error — get the root cause and fix.</p>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Your Code</label>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="Paste your code here..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm h-36 resize-none focus:outline-none focus:border-red-500 font-mono"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Error Message</label>
            <textarea
              value={error}
              onChange={e => setError(e.target.value)}
              placeholder="Paste your error message here..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm h-24 resize-none focus:outline-none focus:border-red-500 font-mono"
            />
          </div>

          <button
            onClick={handleDebug}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-50 py-3 rounded-xl font-medium transition"
          >
            {loading ? "Analyzing..." : "Debug My Code →"}
          </button>
        </div>

        {output && (
          <div className="mt-6 bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-400">Analysis & Fix</span>
              <button
                onClick={() => navigator.clipboard.writeText(output)}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Copy
              </button>
            </div>
            <pre className="text-sm text-green-300 whitespace-pre-wrap font-mono">{output}</pre>
          </div>
        )}
      </main>
    </div>
  )
}