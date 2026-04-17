export default function Dashboard() {
  return (
    <main className="min-h-screen bg-black text-white flex">
      
      <aside className="w-64 bg-zinc-950 p-6 border-r border-zinc-800">
        <h1 className="text-2xl font-bold mb-8">DevMind AI</h1>

        <nav className="space-y-3">
          <div className="p-3 rounded bg-zinc-900">Dashboard</div>
          <div className="p-3 rounded hover:bg-zinc-900">Generate Code</div>
          <div className="p-3 rounded hover:bg-zinc-900">Debug</div>
          <div className="p-3 rounded hover:bg-zinc-900">Docs</div>
          <div className="p-3 rounded hover:bg-zinc-900">Settings</div>
        </nav>
      </aside>

      <section className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <button className="bg-white text-black px-5 py-2 rounded-xl font-semibold">
            Upgrade
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 p-6 rounded-2xl">
            <p className="text-gray-400">AI Requests</p>
            <h3 className="text-4xl font-bold mt-2">128</h3>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <p className="text-gray-400">Projects</p>
            <h3 className="text-4xl font-bold mt-2">6</h3>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <p className="text-gray-400">Saved Hours</p>
            <h3 className="text-4xl font-bold mt-2">42</h3>
          </div>
        </div>
      </section>

    </main>
  );
}