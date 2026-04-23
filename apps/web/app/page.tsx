export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center font-bold text-sm">D</div>
          <span className="font-semibold text-lg">DevMind AI</span>
        </div>
        <div className="flex gap-4">
          <a href="/generate" className="text-sm text-gray-400 hover:text-white transition">Generate</a>
          <a href="/debug" className="text-sm text-gray-400 hover:text-white transition">Debug</a>
          <a href="/docs" className="text-sm text-gray-400 hover:text-white transition">Docs</a>
          <a href="/dashboard" className="text-sm bg-purple-600 hover:bg-purple-500 px-4 py-1.5 rounded-lg transition">Dashboard</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
        <div className="inline-block bg-purple-900/40 border border-purple-700/50 text-purple-300 text-sm px-4 py-1.5 rounded-full mb-6">
          Powered by GPT-4o + LangChain RAG
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          AI-Powered Developer Productivity
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Generate code, auto-document your codebase, and debug errors instantly — all in one platform.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/generate" className="bg-purple-600 hover:bg-purple-500 px-8 py-3 rounded-xl font-medium transition">
            Start Generating →
          </a>
          <a href="/dashboard" className="border border-gray-700 hover:border-gray-500 px-8 py-3 rounded-xl font-medium transition text-gray-300">
            View Dashboard
          </a>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-5xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center text-blue-400 mb-4 text-xl">⚡</div>
          <h3 className="font-semibold text-lg mb-2">Code Generation</h3>
          <p className="text-gray-400 text-sm">Describe what you need and get production-ready code in any language instantly.</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="w-10 h-10 bg-green-900/50 rounded-lg flex items-center justify-center text-green-400 mb-4 text-xl">📄</div>
          <h3 className="font-semibold text-lg mb-2">Auto Documentation</h3>
          <p className="text-gray-400 text-sm">Paste your code and get clean JSDoc, README sections, or inline comments generated.</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="w-10 h-10 bg-red-900/50 rounded-lg flex items-center justify-center text-red-400 mb-4 text-xl">🐛</div>
          <h3 className="font-semibold text-lg mb-2">AI Debugger</h3>
          <p className="text-gray-400 text-sm">Paste your error message and code — get the root cause and a working fix.</p>
        </div>
      </section>
    </main>
  )
}