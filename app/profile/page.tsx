import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Mi Perfil
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Administrá tu información personal
          </p>
        </div>

        {/* Información del perfil */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-lg">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-20 h-20 rounded-full"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  {session.user.name}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {session.user.email}
                </p>
              </div>
            </div>
            <Link
              href="/settings"
              className="px-4 py-2 text-sm border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Editar perfil
            </Link>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Nombre
                </label>
                <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                  <span className="text-zinc-900 dark:text-white">
                    {session.user.name || "No especificado"}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Email
                </label>
                <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                  <span className="text-zinc-900 dark:text-white">
                    {session.user.email || "No especificado"}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                ID de usuario
              </label>
              <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                <span className="text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                  {session.user.id}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Link
            href="/dashboard"
            className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
              Dashboard
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Ver tus estadísticas y actividad
            </p>
          </Link>

          <Link
            href="/settings"
            className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
              Configuración
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Administrá tu cuenta
            </p>
          </Link>

          <Link
            href="/professional/setup"
            className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
              Perfil Profesional
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Configurá tu perfil de profesional
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
