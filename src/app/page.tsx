import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function Home() {
  const plants = await prisma.plant.findMany();
  const tasks = await prisma.task.findMany({
    include: { plant: { select: { name: true } } },
    orderBy: { dueDate: "asc" },
  });

  const pendingTasks = tasks.filter((t) => !t.completed);
  const todayTasks = pendingTasks.filter((t) => {
    if (!t.dueDate) return false;
    const today = new Date();
    const due = new Date(t.dueDate);
    return due.toDateString() === today.toDateString();
  });

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-garden-700">Il mio giardino</h1>
        <p className="text-stone-500 mt-1">Bentornato! Ecco la situazione di oggi.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/plants" className="bg-white rounded-2xl p-6 border border-sand-200 hover:border-garden-400 hover:shadow-sm transition-all">
          <div className="text-3xl mb-2">🌱</div>
          <h2 className="font-semibold text-stone-800">Le mie piante</h2>
          <p className="text-2xl font-bold text-garden-600 mt-1">{plants.length}</p>
          <p className="text-sm text-stone-400">piante nel giardino</p>
        </Link>

        <Link href="/tasks" className="bg-white rounded-2xl p-6 border border-sand-200 hover:border-garden-400 hover:shadow-sm transition-all">
          <div className="text-3xl mb-2">✅</div>
          <h2 className="font-semibold text-stone-800">Task di cura</h2>
          <p className="text-2xl font-bold text-garden-600 mt-1">{pendingTasks.length}</p>
          <p className="text-sm text-stone-400">task da completare</p>
        </Link>

        <Link href="/problems" className="bg-white rounded-2xl p-6 border border-sand-200 hover:border-garden-400 hover:shadow-sm transition-all">
          <div className="text-3xl mb-2">🔍</div>
          <h2 className="font-semibold text-stone-800">Problemi comuni</h2>
          <p className="text-2xl font-bold text-garden-600 mt-1">20+</p>
          <p className="text-sm text-stone-400">problemi documentati</p>
        </Link>
      </div>

      {pendingTasks.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-stone-700">Prossimi task</h2>
            <Link href="/tasks" className="text-sm text-garden-600 hover:text-garden-700">
              Vedi tutti →
            </Link>
          </div>
          <div className="space-y-2">
            {pendingTasks.slice(0, 4).map((task) => (
              <div key={task.id} className="bg-white rounded-xl border border-sand-200 px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-700">{task.title}</p>
                  <p className="text-xs text-stone-400 mt-0.5">🌿 {task.plant.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  {task.dueDate && (
                    <span className="text-xs text-stone-400">
                      {new Date(task.dueDate).toLocaleDateString("it-IT")}
                    </span>
                  )}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[task.priority]}`}>
                    {priorityLabels[task.priority]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}