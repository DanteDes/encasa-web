import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Bienvenido, {session.user.name}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Solicitudes
              </h3>
              <span className="text-2xl">📋</span>
            </div>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">
              0
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Solicitudes activas
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Trabajos
              </h3>
              <span className="text-2xl">✅</span>
            </div>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">
              0
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Trabajos completados
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Calificación
              </h3>
              <span className="text-2xl">⭐</span>
            </div>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">
              -
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Promedio de reseñas
            </p>
          </div>
        </div>

        {/* Actividad reciente */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
            Actividad Reciente
          </h2>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              No hay actividad reciente
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              Cuando empieces a recibir solicitudes, aparecerán aquí
            </p>
            <Link
              href="/services"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Explorar servicios
            </Link>
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Link
            href="/profile"
            className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">👤</span>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">
                  Mi Perfil
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Ver y editar tu información personal
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/professional/setup"
            className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">🔧</span>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">
                  Configurar Perfil Profesional
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Completá tu perfil para empezar a recibir solicitudes
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
