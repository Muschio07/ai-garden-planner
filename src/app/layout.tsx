import type { Metadata } from "next";
import "./globals.css";

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
          <div className="max-w-4xl mx-auto flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="font-semibold text-garden-700 text-lg">AI Garden Planner</span>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}