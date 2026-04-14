"use client";

import { useState } from "react";

type Plant = {
  id: string;
  name: string;
  species: string | null;
  location: string | null;
  sunlight: string | null;
  wateringFrequency: string | null;
};

export default function AISection({ plant }: { plant: Plant }) {
  const [tab, setTab] = useState<"diagnose" | "careplan">("diagnose");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleDiagnose() {
    if (!description.trim()) return;
    setLoading(true);
    setResult("");
    const res = await fetch("/api/ai/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plantName: plant.name, description }),
    });
    const data = await res.json();
    setResult(data.suggestion);
    setLoading(false);
  }

  async function handleCareplan() {
    setLoading(true);
    setResult("");
    const res = await fetch("/api/ai/careplan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plantName: plant.name,
        species: plant.species,
        location: plant.location,
        sunlight: plant.sunlight,
        wateringFrequency: plant.wateringFrequency,
      }),
    });
    const data = await res.json();
    setResult(data.careplan);
    setLoading(false);
  }

  return (
    <div className="bg-white rounded-2xl border border-garden-200 p-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-xl">🤖</span>
        <h2 className="font-semibold text-garden-700">Assistente AI</h2>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => { setTab("diagnose"); setResult(""); }}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            tab === "diagnose"
              ? "bg-garden-600 text-white"
              : "bg-white border border-sand-200 text-stone-500 hover:border-garden-400"
          }`}
        >
          🔍 Diagnosi problema
        </button>
        <button
          onClick={() => { setTab("careplan"); setResult(""); }}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            tab === "careplan"
              ? "bg-garden-600 text-white"
              : "bg-white border border-sand-200 text-stone-500 hover:border-garden-400"
          }`}
        >
          📅 Piano settimanale
        </button>
      </div>

      {tab === "diagnose" && (
        <div className="space-y-3">
          <p className="text-sm text-stone-500">
            Descrivi il problema che hai notato sulla pianta.
          </p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="es. Le foglie stanno diventando gialle dai bordi, il terreno sembra sempre umido..."
            rows={3}
            className="w-full border border-sand-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-garden-400 resize-none"
          />
          <button
            onClick={handleDiagnose}
            disabled={loading || !description.trim()}
            className="bg-garden-600 hover:bg-garden-700 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            {loading ? "Analisi in corso..." : "Analizza problema"}
          </button>
        </div>
      )}

      {tab === "careplan" && (
        <div className="space-y-3">
          <p className="text-sm text-stone-500">
            Genera un piano di cura settimanale personalizzato per {plant.name}.
          </p>
          <button
            onClick={handleCareplan}
            disabled={loading}
            className="bg-garden-600 hover:bg-garden-700 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            {loading ? "Generazione in corso..." : "Genera piano settimanale"}
          </button>
        </div>
      )}

      {loading && (
        <div className="flex items-center gap-2 text-sm text-stone-400">
          <span className="animate-pulse">🌿</span>
          <span>L'AI sta elaborando...</span>
        </div>
      )}

      {result && (
        <div className="bg-garden-50 rounded-xl p-4 text-sm text-stone-700 whitespace-pre-wrap border border-garden-100">
          {result}
        </div>
      )}
    </div>
  );
}