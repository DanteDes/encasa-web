import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Configuración
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Administrá tu cuenta y preferencias
          </p>
        </div>

        {/* Información de la cuenta */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
            Información de la cuenta
          </h2>

          <form className="space-y-6">
            <div className="flex items-center gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-20 h-20 rounded-full"
                />
              )}
              <div>
                <h3 className="font-medium text-zinc-900 dark:text-white mb-1">
                  Foto de perfil
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                  Esta imagen proviene de tu cuenta de Google
                </p>
                <button
                  type="button"
                  disabled
                  className="px-4 py-2 text-sm border border-zinc-300 dark:border-zinc-700 text-zinc-400 dark:text-zinc-500 rounded-lg cursor-not-allowed"
                >
                  Cambiar foto (próximamente)
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Nombre completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={session.user.name || ""}
                disabled
                className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={session.user.email || ""}
                disabled
                className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                Tu email está vinculado con tu cuenta de Google
              </p>
            </div>

            <p className="text-xs text-zinc-400 dark:text-zinc-500 pt-2">
              Los datos de nombre y email provienen de tu cuenta de Google y no pueden modificarse desde aquí.
            </p>
          </form>
        </div>

        {/* Preferencias */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
            Preferencias
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
              <div>
                <h3 className="font-medium text-zinc-900 dark:text-white mb-1">
                  Notificaciones por email
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Recibí actualizaciones sobre tus solicitudes
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" disabled className="sr-only peer" />
                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-blue-600 opacity-50"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
              <div>
                <h3 className="font-medium text-zinc-900 dark:text-white mb-1">
                  Modo oscuro
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Próximamente disponible
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" disabled className="sr-only peer" />
                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-blue-600 opacity-50"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Zona peligrosa */}
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-red-900 dark:text-red-400 mb-6">
            Zona peligrosa
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-red-900 dark:text-red-400 mb-1">
                  Eliminar cuenta
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Eliminá permanentemente tu cuenta y todos tus datos
                </p>
              </div>
              <button
                type="button"
                disabled
                className="px-4 py-2 bg-red-200 dark:bg-red-900/30 text-red-400 dark:text-red-500 rounded-lg cursor-not-allowed font-medium"
              >
                Eliminar cuenta
              </button>
            </div>
          </div>
        </div>

        {/* Volver */}
        <div className="mt-8">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver al perfil
          </Link>
        </div>
      </div>
    </div>
  );
}






