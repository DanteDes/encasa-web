import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-zinc-50 dark:bg-zinc-950">
      <div className="text-center max-w-lg">
        {/* Logo mark */}
        <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-lg shadow-orange-500/20">
          🏠
        </div>

        <div className="text-8xl font-bold text-zinc-200 dark:text-zinc-800 mb-2 leading-none">
          404
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-3">
          Esta página no existe
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-10 leading-relaxed">
          Puede que el link esté roto o que la página haya sido movida.
          <br />
          Pero tranquilo — los profesionales sí están.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-semibold shadow-md shadow-orange-500/20"
          >
            Ir al inicio
          </Link>
          <Link
            href="/professionals"
            className="px-6 py-3 border-2 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl hover:bg-white dark:hover:bg-zinc-900 transition-colors font-medium"
          >
            Ver profesionales
          </Link>
        </div>
      </div>
    </div>
  );
}
