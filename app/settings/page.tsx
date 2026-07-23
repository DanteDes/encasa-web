"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Theme = "light" | "dark";

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return localStorage.getItem("encasa_theme") === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("encasa_theme", theme);
}

function getStoredNotifications(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem("encasa_notifications") !== "false";
}

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [theme, setTheme] = useState<Theme>("dark");
  const [notifications, setNotifications] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/auth/signin");
  }, [status, router]);

  useEffect(() => {
    setTheme(getStoredTheme());
    setNotifications(getStoredNotifications());
  }, []);

  function handleThemeChange(newTheme: Theme) {
    setTheme(newTheme);
    applyTheme(newTheme);
  }

  function handleNotificationsToggle() {
    const next = !notifications;
    setNotifications(next);
    localStorage.setItem("encasa_notifications", String(next));
  }

  async function handleDeleteAccount() {
    setDeleting(true);
    // Limpiar datos locales
    localStorage.clear();
    await signOut({ callbackUrl: "/" });
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-zinc-500">Cargando...</p>
      </div>
    );
  }

  const themeOptions: { value: Theme; label: string; icon: string }[] = [
    { value: "light", label: "Claro", icon: "☀️" },
    { value: "dark", label: "Oscuro", icon: "🌙" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">Configuración</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Preferencias y datos de tu cuenta</p>
        </div>

        {/* Cuenta */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 mb-4">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">Cuenta</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">{session?.user?.name ?? "—"}</p>
                <p className="text-xs text-zinc-500">{session?.user?.email ?? "—"}</p>
              </div>
              <Link
                href="/profile"
                className="text-sm text-orange-500 hover:text-orange-600 font-medium"
              >
                Editar perfil →
              </Link>
            </div>
          </div>
        </section>

        {/* Apariencia */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 mb-4">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-white mb-1">Apariencia</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Elegí cómo se ve la app</p>
          <div className="grid grid-cols-3 gap-2">
            {themeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleThemeChange(opt.value)}
                className={`flex flex-col items-center gap-2 py-3 px-2 rounded-xl border-2 transition-all text-sm font-medium ${
                  theme === opt.value
                    ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400"
                    : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600"
                }`}
              >
                <span className="text-xl">{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        {/* Notificaciones */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 mb-4">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-white mb-4">Notificaciones</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-white">Notificaciones por email</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Actualizaciones sobre tus solicitudes y actividad
              </p>
            </div>
            <button
              onClick={handleNotificationsToggle}
              role="switch"
              aria-checked={notifications}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                notifications ? "bg-orange-500" : "bg-zinc-300 dark:bg-zinc-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                  notifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </section>

        {/* Zona peligrosa */}
        <section className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-red-900 dark:text-red-400 mb-4">Zona peligrosa</h2>

          {!confirmDelete ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-900 dark:text-red-400">Eliminar cuenta</p>
                <p className="text-xs text-red-700 dark:text-red-500 mt-0.5">
                  Elimina permanentemente tu cuenta y todos tus datos locales
                </p>
              </div>
              <button
                onClick={() => setConfirmDelete(true)}
                className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 border border-red-300 dark:border-red-700 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
              >
                Eliminar cuenta
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-medium text-red-900 dark:text-red-300">
                ¿Estás seguro? Esta acción no se puede deshacer.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  className="px-4 py-2 text-sm font-semibold bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors"
                >
                  {deleting ? "Eliminando..." : "Sí, eliminar mi cuenta"}
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="px-4 py-2 text-sm font-medium border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </section>

        <div className="mt-6">
          <Link href="/profile" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al perfil
          </Link>
        </div>

      </div>
    </div>
  );
}
