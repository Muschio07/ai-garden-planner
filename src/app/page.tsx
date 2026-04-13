import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-garden-700">Il mio giardino</h1>
        <p className="text-stone-500 mt-1">Gestisci le tue piante e i task di cura</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/plants" className="bg-white rounded-2xl p-6 border border-sand-200 hover:border-garden-400 hover:shadow-sm transition-all">
          <div className="text-3xl mb-2">🌱</div>
          <h2 className="font-semibold text-stone-800">Le mie piante</h2>
          <p className="text-sm text-stone-400 mt-1">Schede e informazioni</p>
        </Link>

        <Link href="/tasks" className="bg-white rounded-2xl p-6 border border-sand-200 hover:border-garden-400 hover:shadow-sm transition-all">
          <div className="text-3xl mb-2">✅</div>
          <h2 className="font-semibold text-stone-800">Task di cura</h2>
          <p className="text-sm text-stone-400 mt-1">Priorità e scadenze</p>
        </Link>

        <Link href="/problems" className="bg-white rounded-2xl p-6 border border-sand-200 hover:border-garden-400 hover:shadow-sm transition-all">
          <div className="text-3xl mb-2">🔍</div>
          <h2 className="font-semibold text-stone-800">Problemi comuni</h2>
          <p className="text-sm text-stone-400 mt-1">Diagnosi e soluzioni</p>
        </Link>
      </div>
    </div>
  );
}