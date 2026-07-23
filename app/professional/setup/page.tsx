"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getServices } from "@/lib/api";
import { Service } from "@/types";
import Link from "next/link";
import Logo from "@/components/Logo";

interface SavedProfile {
  name?: string;
  serviceId?: string | null;
  hourlyRate?: number | null;
  location?: string | null;
  description?: string | null;
  experience?: string | null;
}

export default function ProfessionalSetupPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [existing, setExisting] = useState<SavedProfile | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    getServices().then(setServices);
    try {
      const raw = localStorage.getItem("encasa_prof_profile");
      if (raw) setExisting(JSON.parse(raw));
    } catch {}
    setMounted(true);
  }, []);

  if (status === "loading" || !mounted) {
    return <div className="min-h-screen flex items-center justify-center text-zinc-500">Cargando...</div>;
  }

  if (!session?.user) {
    router.replace("/auth/signin");
    return null;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const serviceId = (data.get("serviceId") as string) || null;
    const experienceRaw = (data.get("experience") as string) || null;

    const body = {
      name: (data.get("businessName") as string) || session!.user.name || session!.user.email!,
      serviceId,
      hourlyRate: data.get("hourlyRate") ? parseInt(data.get("hourlyRate") as string) : null,
      location: (data.get("workArea") as string) || null,
      description: (data.get("description") as string) || null,
      experience: experienceRaw, // guardar el valor original "0-2", "2-5", etc.
      availability: "disponible",
    };

    // Guardar localmente siempre (funciona sin backend)
    localStorage.setItem("encasa_prof_profile", JSON.stringify(body));

    // Intentar sincronizar con backend en segundo plano (sin bloquear la UX)
    if (session!.user.backendToken) {
      import("@/lib/api").then(({ apiFetch }) =>
        apiFetch("/professionals/me", {
          method: "POST",
          token: session!.user.backendToken,
          body: JSON.stringify(body),
        }).catch(() => {})
      );
    }

    setLoading(false);
    setSaved(true);
  }

  if (saved) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">¡Perfil guardado!</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Tu perfil profesional fue configurado correctamente.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors font-semibold"
          >
            Ir al dashboard
          </Link>
        </div>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Logo className="text-zinc-900 dark:text-white mx-auto" width={180} height={40} />
          </Link>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Completá tu perfil profesional
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">Solo te tomará unos minutos</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-lg">
          <div className="mb-8 pb-8 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-4">
              {session.user.image && (
                <img src={session.user.image} alt={session.user.name ?? "User"} className="w-16 h-16 rounded-full" />
              )}
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{session.user.name}</h2>
                <p className="text-sm text-zinc-500">{session.user.email}</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Nombre del negocio o profesional
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                defaultValue={existing?.name ?? session.user.name ?? ""}
                placeholder="Ej: Electricidad López"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="serviceId" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Servicio principal <span className="text-red-500">*</span>
              </label>
              <select id="serviceId" name="serviceId" required defaultValue={existing?.serviceId ?? ""} className={inputClass}>
                <option value="">Seleccioná un servicio</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.icon} {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Años de experiencia
              </label>
              <select id="experience" name="experience" defaultValue={existing?.experience ?? ""} className={inputClass}>
                <option value="">Seleccioná tu experiencia</option>
                <option value="0-2">Menos de 2 años</option>
                <option value="2-5">2 a 5 años</option>
                <option value="5-10">5 a 10 años</option>
                <option value="10+">Más de 10 años</option>
              </select>
            </div>

            <div>
              <label htmlFor="hourlyRate" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Tarifa por hora (ARS)
              </label>
              <input
                id="hourlyRate"
                name="hourlyRate"
                type="number"
                min={0}
                defaultValue={existing?.hourlyRate ?? ""}
                placeholder="Ej: 5000"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="workArea" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Zona de trabajo
              </label>
              <input
                id="workArea"
                name="workArea"
                type="text"
                defaultValue={existing?.location ?? ""}
                placeholder="Ej: Mar del Plata y alrededores"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Descripción de tus servicios
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={existing?.description ?? ""}
                placeholder="Contanos sobre tu experiencia, especialidades y por qué los clientes deberían elegirte..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="flex gap-4 pt-2">
              <Link
                href="/dashboard"
                className="flex-1 px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-center font-medium"
              >
                Completar más tarde
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Guardando..." : "Guardar y continuar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
