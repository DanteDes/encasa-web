import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-zinc-200 dark:text-zinc-800 mb-4">404</div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">
          Página no encontrada
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          La página que buscás no existe o fue movida.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Ir al inicio
          </Link>
          <Link
            href="/services"
            className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            Ver servicios
          </Link>
        </div>
      </div>
    </div>
  );
}
