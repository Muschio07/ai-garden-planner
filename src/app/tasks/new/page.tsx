"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Plant = { id: string; name: string };

export default function NewTaskPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [form, setForm] = useState({
    title: "",
    type: "watering",
    priority: "medium",
    dueDate: "",
    notes: "",
    plantId: "",
  });

  useEffect(() => {
    fetch("/api/plants")
      .then((r) => r.json())
      .then(setPlants);
  }, []);

  async function handleSubmit() {
    if (!form.title.trim() || !form.plantId) return;
    setLoading(true);
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/tasks");
  }

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <Link href="/tasks" className="text-sm text-stone-400 hover:text-stone-600">
          ← Task di cura
        </Link>
        <h1 className="text-3xl font-bold text-garden-700 mt-2">Nuovo task</h1>
      </div>

      <div className="bg-white rounded-2xl border border-sand-200 p-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-stone-600">Pianta *</label>
          <select
            value={form.plantId}
            onChange={(e) => setForm({ ...form, plantId: e.target.value })}
            className="mt-1 w-full border border-sand-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-garden-400 bg-white"
          >
            <option value="">Seleziona una pianta...</option>
            {plants.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-stone-600">Titolo *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="es. Annaffia, Pota le foglie secche..."
            className="mt-1 w-full border border-sand-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-garden-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-stone-600">Tipo</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="mt-1 w-full border border-sand-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-garden-400 bg-white"
          >
            <option value="watering">💧 Annaffiatura</option>
            <option value="pruning">✂️ Potatura</option>
            <option value="fertilizing">🌱 Fertilizzazione</option>
            <option value="other">📝 Altro</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-stone-600">Priorità</label>
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="mt-1 w-full border border-sand-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-garden-400 bg-white"
          >
            <option value="high">🔴 Alta</option>
            <option value="medium">🟡 Media</option>
            <option value="low">🟢 Bassa</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-stone-600">Scadenza</label>
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className="mt-1 w-full border border-sand-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-garden-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-stone-600">Note</label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={3}
            placeholder="Informazioni aggiuntive..."
            className="mt-1 w-full border border-sand-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-garden-400 resize-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSubmit}
            disabled={loading || !form.title.trim() || !form.plantId}
            className="bg-garden-600 hover:bg-garden-700 disabled:opacity-50 text-white px-6 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            {loading ? "Salvataggio..." : "Salva task"}
          </button>
          <Link
            href="/tasks"
            className="border border-sand-200 text-stone-500 hover:text-stone-700 px-6 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            Annulla
          </Link>
        </div>
      </div>
    </div>
  );
}