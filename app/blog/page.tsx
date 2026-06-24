import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - EnCasa",
  description: "Consejos de mantenimiento del hogar y novedades de EnCasa.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-white">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900 dark:text-white">Blog</span>
        </nav>

        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Blog</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-12 text-lg">
          Consejos de mantenimiento del hogar, guías prácticas y novedades de la plataforma.
        </p>

        <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-3">
            Próximamente
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-md mx-auto">
            Estamos preparando contenido con consejos de mantenimiento, guías y novedades. ¡Volvé pronto!
          </p>
          <Link
            href="/"
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
