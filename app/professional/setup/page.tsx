"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Service } from "@/types";
import { servicesMeta } from "@/lib/servicesMeta";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function ProfessionalSetupPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    apiFetch<Array<{ id: string; name: string; description: string }>>("/services")
      .then((raw) =>
        setServices(
          raw.map((s) => ({
            ...s,
            icon: servicesMeta[s.id]?.icon ?? "🔧",
            color: servicesMeta[s.id]?.color ?? "bg-zinc-500",
          }))
        )
      )
      .catch(console.error);
  }, []);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
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

    const serviceId = data.get("serviceId") as string;
    const name = (data.get("businessName") as string) || session!.user.name || session!.user.email!;
    const experienceRaw = data.get("experience") as string;
    const hourlyRateRaw = data.get("hourlyRate") as string;

    const experienceMap: Record<string, number> = {
      "0-2": 1, "2-5": 3, "5-10": 7, "10+": 15,
    };

    const body = {
      name,
      serviceId,
      hourlyRate: hourlyRateRaw ? parseInt(hourlyRateRaw) : null,
      location: data.get("workArea") as string || null,
      description: data.get("description") as string || null,
      experience: experienceMap[experienceRaw] ?? null,
      availability: "disponible",
    };

    try {
      await apiFetch("/professionals/me", {
        method: "POST",
        token: session!.user.backendToken,
        body: JSON.stringify(body),
      });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar el perfil");
    } finally {
      setLoading(false);
    }
  }

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
          <p className="text-zinc-600 dark:text-zinc-400">Solo te tomará unos minutos configurar tu perfil</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-lg">
          {/* User info */}
          <div className="mb-8 pb-8 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-4">
              {session.user.image && (
                <img src={session.user.image} alt={session.user.name ?? "User"} className="w-20 h-20 rounded-full" />
              )}
              <div>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">{session.user.name}</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{session.user.email}</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business name */}
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Nombre del negocio o profesional
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                defaultValue={session.user.name ?? ""}
                placeholder="Ej: Electricidad López"
                className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
              />
            </div>

            {/* Service */}
            <div>
              <label htmlFor="serviceId" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Servicio principal <span className="text-red-500">*</span>
              </label>
              <select
                id="serviceId"
                name="serviceId"
                required
                className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
              >
                <option value="">Seleccioná un servicio</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.icon} {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience */}
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Años de experiencia
              </label>
              <select
                id="experience"
                name="experience"
                className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
              >
                <option value="">Seleccioná tu experiencia</option>
                <option value="0-2">Menos de 2 años</option>
                <option value="2-5">2-5 años</option>
                <option value="5-10">5-10 años</option>
                <option value="10+">Más de 10 años</option>
              </select>
            </div>

            {/* Hourly rate */}
            <div>
              <label htmlFor="hourlyRate" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Tarifa por hora (ARS)
              </label>
              <input
                id="hourlyRate"
                name="hourlyRate"
                type="number"
                min={0}
                placeholder="Ej: 5000"
                className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
              />
            </div>

            {/* Work area */}
            <div>
              <label htmlFor="workArea" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Zona de trabajo
              </label>
              <input
                id="workArea"
                name="workArea"
                type="text"
                placeholder="Ej: Mar del Plata y alrededores"
                className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Descripción de tus servicios
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Contanos sobre tu experiencia, especialidades y por qué los clientes deberían elegirte..."
                className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white resize-none"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Link
                href="/"
                className="flex-1 px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-center font-medium"
              >
                Completar más tarde
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
