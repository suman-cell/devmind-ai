export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <input className="w-full p-3 mb-4 rounded bg-zinc-800" placeholder="Email" />
        <input className="w-full p-3 mb-4 rounded bg-zinc-800" placeholder="Password" type="password" />
        <button className="w-full bg-white text-black p-3 rounded font-semibold">
          Sign In
        </button>
      </div>
    </main>
  );
}