"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewPlantPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    species: "",
    location: "",
    sunlight: "",
    wateringFrequency: "",
    notes: "",
  });

  async function handleSubmit() {
    if (!form.name.trim()) return;
    setLoading(true);
    await fetch("/api/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/plants");
  }

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <Link href="/plants" className="text-sm text-stone-400 hover:text-stone-600">
          ← Le mie piante
        </Link>
        <h1 className="text-3xl font-bold text-garden-700 mt-2">Nuova pianta</h1>
      </div>

      <div className="bg-white rounded-2xl border border-sand-200 p-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-stone-600">Nome *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="es. Basilico, Rosa, Ficus..."
            className="mt-1 w-full border border-sand-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-garden-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-stone-600">Specie</label>
          <input
            type="text"
            value={form.species}
            onChange={(e) => setForm({ ...form, species: e.target.value })}
            placeholder="es. Ocimum basilicum"
            className="mt-1 w-full border border-sand-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-garden-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-stone-600">Posizione</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="es. Balcone, Davanzale, Giardino..."
            className="mt-1 w-full border border-sand-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-garden-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-stone-600">Luce solare</label>
          <select
            value={form.sunlight}
            onChange={(e) => setForm({ ...form, sunlight: e.target.value })}
            className="mt-1 w-full border border-sand-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-garden-400 bg-white"
          >
            <option value="">Seleziona...</option>
            <option value="Pieno sole">☀️ Pieno sole</option>
            <option value="Sole parziale">⛅ Sole parziale</option>
            <option value="Ombra">🌥️ Ombra</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-stone-600">Frequenza annaffiatura</label>
          <select
            value={form.wateringFrequency}
            onChange={(e) => setForm({ ...form, wateringFrequency: e.target.value })}
            className="mt-1 w-full border border-sand-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-garden-400 bg-white"
          >
            <option value="">Seleziona...</option>
            <option value="Ogni giorno">💧 Ogni giorno</option>
            <option value="Ogni 2-3 giorni">💧 Ogni 2-3 giorni</option>
            <option value="Una volta a settimana">💧 Una volta a settimana</option>
            <option value="Ogni 2 settimane">💧 Ogni 2 settimane</option>
            <option value="Raramente">💧 Raramente</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-stone-600">Note</label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Informazioni aggiuntive sulla pianta..."
            rows={3}
            className="mt-1 w-full border border-sand-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-garden-400 resize-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSubmit}
            disabled={loading || !form.name.trim()}
            className="bg-garden-600 hover:bg-garden-700 disabled:opacity-50 text-white px-6 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            {loading ? "Salvataggio..." : "Salva pianta"}
          </button>
          <Link
            href="/plants"
            className="border border-sand-200 text-stone-500 hover:text-stone-700 px-6 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            Annulla
          </Link>
        </div>
      </div>
    </div>
  );
}