import { prisma } from "@/lib/db";
import Link from "next/link";
import TaskList from "./TaskList";

export default async function TasksPage() {
  const tasks = await prisma.task.findMany({
    orderBy: [{ completed: "asc" }, { dueDate: "asc" }],
    include: { plant: { select: { name: true } } },
  });

  const plants = await prisma.plant.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-garden-700">Task di cura</h1>
          <p className="text-stone-500 mt-1">
            {tasks.filter((t) => !t.completed).length} task da completare
          </p>
        </div>
        <Link
          href="/tasks/new"
          className="bg-garden-600 hover:bg-garden-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          + Nuovo task
        </Link>
      </div>

      <TaskList initialTasks={tasks} plants={plants} />
    </div>
  );
}