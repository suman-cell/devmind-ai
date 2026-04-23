"use client"
import { useState } from "react"
import Navbar from "../../components/Navbar"

export default function DocsPage() {
  const [code, setCode] = useState("")
  const [style, setStyle] = useState("JSDoc")
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleGenerate() {
    if (!code.trim()) return
    setLoading(true)
    setOutput("")
    try {
      const res = await fetch("http://localhost:3001/api/docs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, style }),
      })
      const data = await res.json()
      setOutput(data.documented || data.error || "No output returned")
    } catch {
      setOutput("❌ Could not connect to backend.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-2">Documentation Generator</h1>
        <p className="text-gray-400 mb-8">Paste your code and get clean documentation instantly.</p>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Documentation Style</label>
            <select
              value={style}
              onChange={e => setStyle(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:border-green-500"
            >
              {["JSDoc", "TSDoc", "Inline Comments", "README Section"].map(s => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Your Code</label>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="Paste your function, class, or module here..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm h-48 resize-none focus:outline-none focus:border-green-500 font-mono"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-50 py-3 rounded-xl font-medium transition"
          >
            {loading ? "Generating docs..." : "Generate Documentation →"}
          </button>
        </div>

        {output && (
          <div className="mt-6 bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-400">Generated Documentation</span>
              <button
                onClick={() => navigator.clipboard.writeText(output)}
                className="text-xs text-green-400 hover:text-green-300"
              >Copy</button>
            </div>
            <pre className="text-sm text-green-300 whitespace-pre-wrap overflow-x-auto font-mono">{output}</pre>
          </div>
        )}
      </main>
    </div>
  )
}