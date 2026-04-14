"use client";

import { useState } from "react";
import { problems, categories } from "./data";

export default function ProblemsPage() {
  const [filter, setFilter] = useState("Tutti");
  const [search, setSearch] = useState("");

  const filtered = problems.filter((p) => {
    const matchCategory = filter === "Tutti" || p.category === filter;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.symptoms.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-garden-700">Problemi comuni</h1>
        <p className="text-stone-500 mt-1">
          Sintomi, cause e soluzioni per le piante più diffuse
        </p>
      </div>

      <div className="space-y-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cerca per sintomo o problema..."
          className="w-full border border-sand-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-garden-400"
        />

        <div className="flex gap-2 flex-wrap">
          {["Tutti", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === cat
                  ? "bg-garden-600 text-white"
                  : "bg-white border border-sand-200 text-stone-500 hover:border-garden-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-sand-200 p-12 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="font-semibold text-stone-700">Nessun risultato</h2>
          <p className="text-stone-400 text-sm mt-1">Prova con un altro termine</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((problem) => (
            <div
              key={problem.id}
              className="bg-white rounded-2xl border border-sand-200 p-5 space-y-3 hover:border-garden-300 transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{problem.emoji}</span>
                <div>
                  <h2 className="font-semibold text-stone-800">{problem.name}</h2>
                  <span className="text-xs bg-sand-100 text-sand-700 px-2 py-0.5 rounded-full">
                    {problem.category}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-stone-600">Sintomi: </span>
                  <span className="text-stone-500">{problem.symptoms}</span>
                </div>
                <div>
                  <span className="font-medium text-stone-600">Cause: </span>
                  <span className="text-stone-500">{problem.causes}</span>
                </div>
                <div className="bg-garden-50 rounded-xl p-3">
                  <span className="font-medium text-garden-700">✅ Soluzione: </span>
                  <span className="text-garden-800">{problem.solution}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}