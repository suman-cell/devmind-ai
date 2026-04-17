export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-bold mb-6">DevMind AI</h1>
      <p className="text-gray-400 text-xl mb-8 text-center max-w-2xl">
        AI-powered developer productivity platform for code generation,
        debugging, and documentation.
      </p>

      <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
        Get Started
      </button>
      <a href="/dashboard">Dashboard</a>
<a href="/login">Login</a>
    </main>
  );
}