"use client"
import { useState } from "react"
import Link from "next/link"

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("")
  const [language, setLanguage] = useState("TypeScript")
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleGenerate() {
    if (!prompt.trim()) return
    setLoading(true)
    setOutput("")
    try {
      const res = await fetch("http://localhost:3001/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, language }),
      })
      const data = await res.json()
      setOutput(data.code || data.error || "No output returned")
    } catch {
      setOutput("❌ Could not connect to backend. Make sure the API server is running.")
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-gray-500 hover:text-white text-sm mb-6 inline-block">← Back</Link>
        <h1 className="text-3xl font-bold mb-2">Code Generator</h1>
        <p className="text-gray-400 mb-8">Describe what you want to build and get production-ready code.</p>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
          <div>
            <label htmlFor="language-select" className="text-sm text-gray-400 mb-1 block">Language</label>
            <select
              id="language-select"
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:border-purple-500"
            >
              {["TypeScript","JavaScript","Python","Go","Java","Rust"].map(l => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">What do you want to build?</label>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="e.g. A REST API endpoint that accepts a username and returns their GitHub repos..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm h-32 resize-none focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 py-3 rounded-xl font-medium transition"
          >
            {loading ? "Generating..." : "Generate Code →"}
          </button>
        </div>

        {output && (
          <div className="mt-6 bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-400">Generated Code</span>
              <button
                onClick={() => navigator.clipboard.writeText(output)}
                className="text-xs text-purple-400 hover:text-purple-300"
              >Copy</button>
            </div>
            <pre className="text-sm text-green-300 whitespace-pre-wrap overflow-x-auto">{output}</pre>
          </div>
        )}
      </div>
    </main>
  )
}