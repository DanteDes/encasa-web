"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { UserProfile } from "@/types";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/auth/signin");
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.backendToken) {
      apiFetch<UserProfile>("/users/me", { token: session.user.backendToken })
        .then(setProfile)
        .catch(console.error);
    }
  }, [session]);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const updated = await apiFetch<UserProfile>("/users/me", {
        method: "PUT",
        token: session!.user.backendToken,
        body: JSON.stringify({
          name: data.get("name") || null,
          phone: data.get("phone") || null,
          location: data.get("location") || null,
          bio: data.get("bio") || null,
        }),
      });
      setProfile(updated);
      setEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  if (status === "loading" || !profile) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 flex items-center justify-center">
        <p className="text-zinc-500">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Mi Perfil</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Administrá tu información personal</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-lg">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              {session?.user.image ? (
                <img src={session.user.image} alt={profile.name ?? "User"} className="w-20 h-20 rounded-full" />
              ) : (
                <div className="w-20 h-20 bg-zinc-200 dark:bg-zinc-700 rounded-full flex items-center justify-center text-3xl">
                  👤
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">{profile.name ?? profile.email}</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{profile.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  {profile.role}
                </span>
              </div>
            </div>
            <button
              onClick={() => { setEditing(!editing); setError(null); }}
              className="px-4 py-2 text-sm border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              {editing ? "Cancelar" : "Editar perfil"}
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {editing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Nombre</label>
                  <input name="name" defaultValue={profile.name ?? ""} className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Teléfono</label>
                  <input name="phone" defaultValue={profile.phone ?? ""} placeholder="223-000-0000" className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Ubicación</label>
                <input name="location" defaultValue={profile.location ?? ""} placeholder="Mar del Plata, Buenos Aires" className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Bio</label>
                <textarea name="bio" defaultValue={profile.bio ?? ""} rows={3} placeholder="Contanos algo sobre vos..." className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50">
                  {saving ? "Guardando..." : "Guardar cambios"}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Nombre</label>
                  <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white">
                    {profile.name ?? "No especificado"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Email</label>
                  <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white">
                    {profile.email}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Teléfono</label>
                  <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white">
                    {profile.phone ?? "No especificado"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Ubicación</label>
                  <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white">
                    {profile.location ?? "No especificado"}
                  </div>
                </div>
              </div>
              {profile.bio && (
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Bio</label>
                  <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white">
                    {profile.bio}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Link href="/dashboard" className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:shadow-lg transition-shadow">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">Dashboard</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Ver tus estadísticas y actividad</p>
          </Link>
          <Link href="/settings" className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:shadow-lg transition-shadow">
            <div className="text-2xl mb-2">⚙️</div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">Configuración</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Administrá tu cuenta</p>
          </Link>
          {profile?.role === "professional" ? (
            <Link href="/professional/setup" className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-2">🔧</div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">Perfil Profesional</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Actualizá tu información de servicios</p>
            </Link>
          ) : (
            <Link href="/services" className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-2">🔍</div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">Buscar Servicios</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Encontrá el profesional que necesitás</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
