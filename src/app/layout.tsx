import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Garden Planner",
  description: "Manage your plants and garden with AI-powered suggestions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-sand-50 text-stone-800 antialiased">
        <nav className="bg-white border-b border-sand-200 px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-100">
              <span className="text-2xl">🌿</span>
              <span className="font-semibold text-garden-700 text-lg">AI Garden Planner</span>
            </Link>
            <div className="flex items-center gap-1">
              <Link
                href="/plants"
                className="text-sm text-stone-500 hover:text-garden-700 px-3 py-1.5 rounded-lg hover:bg-garden-50 transition-colors"
              >
                🌱 Piante
              </Link>
              <Link
                href="/tasks"
                className="text-sm text-stone-500 hover:text-garden-700 px-3 py-1.5 rounded-lg hover:bg-garden-50 transition-colors"
              >
                ✅ Task
              </Link>
              <Link
                href="/problems"
                className="text-sm text-stone-500 hover:text-garden-700 px-3 py-1.5 rounded-lg hover:bg-garden-50 transition-colors"
              >
                🔍 Problemi
              </Link>
            </div>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}