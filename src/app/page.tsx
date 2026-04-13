export default function Home() {
  return (
    <main className="min-h-screen bg-sand-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-sand-200">
        <h1 className="text-3xl font-bold text-garden-700">🌿 AI Garden Planner</h1>
        <p className="text-sand-600 mt-2">Palette funzionante!</p>
        <div className="flex gap-2 mt-4">
          <span className="bg-garden-100 text-garden-700 px-3 py-1 rounded-full text-sm">verde</span>
          <span className="bg-sand-200 text-sand-700 px-3 py-1 rounded-full text-sm">sabbia</span>
        </div>
      </div>
    </main>
  )
}