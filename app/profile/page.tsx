"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { UserProfile } from "@/types";
import { services as staticServices } from "@/data/services";
import Link from "next/link";
import AvatarUpload from "@/components/AvatarUpload";
import { useToast } from "@/components/ToastProvider";

interface ProfProfile {
  name?: string;
  serviceId?: string | null;
  hourlyRate?: number | null;
  location?: string | null;
  description?: string | null;
  experience?: string | null; // "0-2" | "2-5" | "5-10" | "10+"
  availability?: string;
}

const EXPERIENCE_LABELS: Record<string, string> = {
  "0-2": "Menos de 2 años",
  "2-5": "2 a 5 años",
  "5-10": "5 a 10 años",
  "10+": "Más de 10 años",
};

function buildProfileFromSession(user: {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}): UserProfile {
  return {
    id: "",
    email: user.email ?? "",
    name: user.name ?? null,
    picture: user.image ?? null,
    role: user.role ?? "client",
    hasProfessionalProfile: false,
    emailNotifications: true,
  };
}

function getLocalProfProfile(): ProfProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("encasa_prof_profile");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const inputClass =
  "w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500";

const fieldClass =
  "px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profProfile, setProfProfile] = useState<ProfProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { showToast } = useToast();
  const isProfessional = profile?.role === "professional";

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/auth/signin");
  }, [status, router]);

  useEffect(() => {
    if (!session?.user) return;
    if (session.user.backendToken) {
      apiFetch<UserProfile>("/users/me", { token: session.user.backendToken })
        .then(setProfile)
        .catch(() => setProfile(buildProfileFromSession(session.user)));
    } else {
      setProfile(buildProfileFromSession(session.user));
    }
    setProfProfile(getLocalProfProfile());
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
        }),
      });
      setProfile(updated);
      setEditing(false);
      showToast("Perfil actualizado correctamente.", "info");
    } catch {
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              name: (data.get("name") as string) || prev.name,
            }
          : prev
      );
      setEditing(false);
      showToast("Cambios guardados.", "info");
    } finally {
      setSaving(false);
    }
  }

  if (status === "loading" || !profile) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto animate-pulse">
          <div className="h-8 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg mb-2" />
          <div className="h-4 w-64 bg-zinc-200 dark:bg-zinc-800 rounded mb-8" />
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 mb-5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-zinc-200 dark:bg-zinc-700" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-700 rounded" />
                <div className="h-4 w-56 bg-zinc-200 dark:bg-zinc-700 rounded" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg" />
              <div className="h-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const serviceLabel = profProfile?.serviceId
    ? staticServices.find((s) => s.id === profProfile.serviceId)?.name ?? profProfile.serviceId
    : null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">Mi Perfil</h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            {isProfessional ? "Información personal y datos de tu perfil profesional" : "Administrá tu información personal"}
          </p>
        </div>

        {/* ── Información personal ── */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm mb-5">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <AvatarUpload
                  sessionImage={session?.user.image}
                  name={profile.name ?? profile.email}
                  size={80}
                />
                <span className="text-xs text-zinc-400">Cambiar foto</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  {profile.name ?? profile.email}
                </h2>
                <p className="text-sm text-zinc-500">{profile.email}</p>
                <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full font-medium ${
                  isProfessional
                    ? "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300"
                    : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                }`}>
                  {isProfessional ? "Profesional" : "Cliente"}
                </span>
              </div>
            </div>
            <button
              onClick={() => { setEditing(!editing); setError(null); }}
              className="px-4 py-2 text-sm border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              {editing ? "Cancelar" : "Editar"}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {editing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Nombre</label>
                <input name="name" defaultValue={profile.name ?? ""} className={inputClass} />
              </div>
              <button type="submit" disabled={saving} className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50">
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-1">Nombre</label>
                <div className={fieldClass}>{profile.name ?? "—"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-1">Email</label>
                <div className={fieldClass}>{profile.email}</div>
              </div>
            </div>
          )}
        </div>

        {/* ── Perfil profesional (solo para profesionales) ── */}
        {isProfessional && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm mb-5">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Perfil profesional</h2>
                <p className="text-sm text-zinc-500">Así te ven los clientes en la plataforma</p>
              </div>
              <Link
                href="/professional/setup"
                className="px-4 py-2 text-sm border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Editar
              </Link>
            </div>

            {profProfile ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-500 mb-1">Servicio</label>
                  <div className={fieldClass}>{serviceLabel ?? "—"}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-500 mb-1">Tarifa por hora</label>
                  <div className={fieldClass}>
                    {profProfile.hourlyRate
                      ? `$${profProfile.hourlyRate.toLocaleString("es-AR")} / hora`
                      : "A consultar"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-500 mb-1">Zona de trabajo</label>
                  <div className={fieldClass}>{profProfile.location ?? "—"}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-500 mb-1">Experiencia</label>
                  <div className={fieldClass}>
                    {profProfile.experience ? (EXPERIENCE_LABELS[profProfile.experience] ?? profProfile.experience) : "—"}
                  </div>
                </div>
                {profProfile.description && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-500 mb-1">Descripción</label>
                    <div className={`${fieldClass} leading-relaxed`}>{profProfile.description}</div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl">
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
                  Todavía no completaste tu perfil profesional.
                </p>
                <Link
                  href="/professional/setup"
                  className="inline-block bg-orange-500 text-white px-5 py-2.5 rounded-xl hover:bg-orange-600 transition-colors text-sm font-semibold"
                >
                  Completar perfil
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ── Acceso rápido ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/settings" className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-orange-500 dark:hover:border-orange-500 transition-colors group">
            <div className="text-2xl mb-2">⚙️</div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-1 group-hover:text-orange-500 transition-colors">Configuración</h3>
            <p className="text-sm text-zinc-500">Tema, notificaciones y cuenta</p>
          </Link>
          {isProfessional ? (
            <Link href="/professionals" className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-orange-500 dark:hover:border-orange-500 transition-colors group">
              <div className="text-2xl mb-2">👥</div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-1 group-hover:text-orange-500 transition-colors">Ver la competencia</h3>
              <p className="text-sm text-zinc-500">Compará tu perfil con otros profesionales</p>
            </Link>
          ) : (
            <Link href="/favorites" className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-orange-500 dark:hover:border-orange-500 transition-colors group">
              <div className="text-2xl mb-2">❤️</div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-1 group-hover:text-orange-500 transition-colors">Mis favoritos</h3>
              <p className="text-sm text-zinc-500">Profesionales que guardaste</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
