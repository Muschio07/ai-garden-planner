"use client";

import { useState } from "react";

type Plant = { id: string; name: string };
type Task = {
  id: string;
  title: string;
  type: string;
  priority: string;
  dueDate: Date | string | null;
  completed: boolean;
  notes: string | null;
  plantId: string;
  plant: { name: string };
};

const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-600",
  medium: "bg-yellow-100 text-yellow-600",
  low: "bg-green-100 text-green-600",
};

const priorityLabels: Record<string, string> = {
  high: "Alta",
  medium: "Media",
  low: "Bassa",
};

const typeIcons: Record<string, string> = {
  watering: "💧",
  pruning: "✂️",
  fertilizing: "🌱",
  other: "📝",
};

export default function TaskList({
  initialTasks,
  plants,
}: {
  initialTasks: Task[];
  plants: Plant[];
}) {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("pending");

  async function toggleComplete(task: Task) {
    await fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, completed: !task.completed }),
    });
    setTasks(tasks.map((t) => t.id === task.id ? { ...t, completed: !t.completed } : t));
  }

  async function deleteTask(id: string) {
    if (!confirm("Eliminare questo task?")) return;
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((t) => t.id !== id));
  }

  const filtered = tasks.filter((t) => {
    if (filter === "pending") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["pending", "all", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f
                ? "bg-garden-600 text-white"
                : "bg-white border border-sand-200 text-stone-500 hover:border-garden-400"
            }`}
          >
            {f === "pending" ? "Da fare" : f === "completed" ? "Completati" : "Tutti"}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-sand-200 p-12 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="font-semibold text-stone-700">Nessun task qui</h2>
          <p className="text-stone-400 text-sm mt-1">Tutto in ordine!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((task) => (
            <div
              key={task.id}
              className={`bg-white rounded-2xl border p-4 flex items-start gap-4 transition-all ${
                task.completed ? "border-sand-100 opacity-60" : "border-sand-200"
              }`}
            >
              <button
                onClick={() => toggleComplete(task)}
                className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors ${
                  task.completed
                    ? "bg-garden-500 border-garden-500"
                    : "border-sand-300 hover:border-garden-400"
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-stone-800 font-medium ${task.completed ? "line-through" : ""}`}>
                    {typeIcons[task.type] ?? "📝"} {task.title}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[task.priority]}`}>
                    {priorityLabels[task.priority]}
                  </span>
                </div>
                <div className="flex gap-3 mt-1 text-xs text-stone-400 flex-wrap">
                  <span>🌿 {task.plant.name}</span>
                  {task.dueDate && (
                    <span>📅 {new Date(task.dueDate).toLocaleDateString("it-IT")}</span>
                  )}
                </div>
                {task.notes && (
                  <p className="text-xs text-stone-400 mt-1">{task.notes}</p>
                )}
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-stone-300 hover:text-red-400 transition-colors text-sm flex-shrink-0"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}