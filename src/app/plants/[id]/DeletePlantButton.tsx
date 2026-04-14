"use client";

import { useRouter } from "next/navigation";

export default function DeletePlantButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Eliminare questa pianta?")) return;
    await fetch(`/api/plants/${id}`, { method: "DELETE" });
    router.push("/plants");
  }

  return (
    <button
      onClick={handleDelete}
      className="border border-red-200 text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
    >
      🗑️ Elimina
    </button>
  );
}