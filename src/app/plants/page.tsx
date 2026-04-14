import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function PlantsPage() {
  const plants = await prisma.plant.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-garden-700">Le mie piante</h1>
          <p className="text-stone-500 mt-1">{plants.length} piante nel tuo giardino</p>
        </div>
        <Link
          href="/plants/new"
          className="bg-garden-600 hover:bg-garden-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          + Aggiungi pianta
        </Link>
      </div>

      {plants.length === 0 ? (
        <div className="bg-white rounded-2xl border border-sand-200 p-12 text-center">
          <div className="text-5xl mb-4">🌱</div>
          <h2 className="font-semibold text-stone-700">Nessuna pianta ancora</h2>
          <p className="text-stone-400 text-sm mt-1">Aggiungi la tua prima pianta per iniziare</p>
          <Link
            href="/plants/new"
            className="inline-block mt-4 bg-garden-600 hover:bg-garden-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            + Aggiungi pianta
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {plants.map((plant) => (
            <Link
              key={plant.id}
              href={`/plants/${plant.id}`}
              className="bg-white rounded-2xl border border-sand-200 p-6 hover:border-garden-400 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-semibold text-stone-800">{plant.name}</h2>
                  {plant.species && (
                    <p className="text-sm text-stone-400 italic mt-0.5">{plant.species}</p>
                  )}
                </div>
                <span className="text-2xl">🌿</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {plant.location && (
                  <span className="bg-sand-100 text-sand-700 text-xs px-2 py-1 rounded-full">
                    📍 {plant.location}
                  </span>
                )}
                {plant.sunlight && (
                  <span className="bg-garden-100 text-garden-700 text-xs px-2 py-1 rounded-full">
                    ☀️ {plant.sunlight}
                  </span>
                )}
                {plant.wateringFrequency && (
                  <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">
                    💧 {plant.wateringFrequency}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}