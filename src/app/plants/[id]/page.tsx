import Link from "next/link";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import DeletePlantButton from "./DeletePlantButton";
import AISection from "./AISection";

export default async function PlantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plant = await prisma.plant.findUnique({ where: { id } });

  if (!plant) notFound();

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <Link href="/plants" className="text-sm text-stone-400 hover:text-stone-600">
          ← Le mie piante
        </Link>
        <div className="flex items-start justify-between mt-2">
          <div>
            <h1 className="text-3xl font-bold text-garden-700">{plant.name}</h1>
            {plant.species && (
              <p className="text-stone-400 italic text-sm mt-0.5">{plant.species}</p>
            )}
          </div>
          <span className="text-4xl">🌿</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-sand-200 p-6 space-y-4">
        {plant.location && (
          <div>
            <span className="text-xs font-medium text-stone-400 uppercase tracking-wide">Posizione</span>
            <p className="text-stone-700 mt-0.5">📍 {plant.location}</p>
          </div>
        )}
        {plant.sunlight && (
          <div>
            <span className="text-xs font-medium text-stone-400 uppercase tracking-wide">Luce solare</span>
            <p className="text-stone-700 mt-0.5">☀️ {plant.sunlight}</p>
          </div>
        )}
        {plant.wateringFrequency && (
          <div>
            <span className="text-xs font-medium text-stone-400 uppercase tracking-wide">Annaffiatura</span>
            <p className="text-stone-700 mt-0.5">💧 {plant.wateringFrequency}</p>
          </div>
        )}
        {plant.notes && (
          <div>
            <span className="text-xs font-medium text-stone-400 uppercase tracking-wide">Note</span>
            <p className="text-stone-700 mt-0.5">{plant.notes}</p>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Link
          href={`/plants/${plant.id}/edit`}
          className="bg-garden-600 hover:bg-garden-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          ✏️ Modifica
        </Link>
        <DeletePlantButton id={plant.id} />
      </div>

      <AISection plant={plant} />
    </div>
  );
}