"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { services as staticServices } from "@/data/services";
import { getStoredAvatar } from "@/lib/avatar";

interface ProfProfile {
  name?: string;
  serviceId?: string | null;
  hourlyRate?: number | null;
  location?: string | null;
  description?: string | null;
  experience?: string | null;
  availability?: string;
  tags?: string[];
}

const AVAILABILITY_CONFIG = {
  disponible:     { label: "Disponible ahora", dot: "bg-green-500" },
  ocupado:        { label: "Ocupado",           dot: "bg-orange-500" },
  "no-disponible": { label: "No disponible",    dot: "bg-red-500" },
};

const EXPERIENCE_LABELS: Record<string, string> = {
  "0-2": "Menos de 2 años",
  "2-5": "2 a 5 años",
  "5-10": "5 a 10 años",
  "10+": "Más de 10 años",
};

export default function ProfessionalPreviewPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [prof, setProf] = useState<ProfProfile | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/auth/signin");
    if (status === "authenticated" && session?.user?.role !== "professional") {
      router.replace("/");
    }
  }, [status, session, router]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("encasa_prof_profile");
      if (raw) setProf(JSON.parse(raw));
    } catch {}
    setAvatar(getStoredAvatar());
  }, []);

  if (status === "loading" || !session?.user) return null;

  const name = prof?.name ?? session.user.name ?? "Tu nombre";
  const service = staticServices.find((s) => s.id === prof?.serviceId);
  const availKey = (prof?.availability ?? "disponible") as keyof typeof AVAILABILITY_CONFIG;
  const availCfg = AVAILABILITY_CONFIG[availKey] ?? AVAILABILITY_CONFIG.disponible;
  const src = avatar ?? session.user.image;

  return (
    <div className="min-h-screen py-12 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Banner de vista previa */}
        <div className="mb-6 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-xl px-5 py-3 flex items-center justify-between gap-4">
          <p className="text-sm text-orange-800 dark:text-orange-300 font-medium">
            👁️ Así ve tu perfil un cliente
          </p>
          <Link href="/" className="text-xs text-orange-600 dark:text-orange-400 hover:underline font-medium">
            Volver al inicio
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full flex-shrink-0 overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              {src ? (
                <img src={src} alt={name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-5xl">👤</span>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">{name}</h1>
                <span className="text-blue-600 text-2xl" title="Verificado">✓</span>
              </div>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
                {service?.name ?? "—"}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500 text-xl">⭐</span>
                  <span className="font-bold text-lg text-zinc-900 dark:text-white">—</span>
                  <span className="text-zinc-500 text-sm">(sin reseñas aún)</span>
                </div>
                {prof?.experience && (
                  <>
                    <span className="text-zinc-300 dark:text-zinc-700">•</span>
                    <span className="text-zinc-600 dark:text-zinc-400">
                      {EXPERIENCE_LABELS[prof.experience] ?? prof.experience} de experiencia
                    </span>
                  </>
                )}
                {prof?.location && (
                  <>
                    <span className="text-zinc-300 dark:text-zinc-700">•</span>
                    <span className="text-zinc-600 dark:text-zinc-400">📍 {prof.location}</span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-4">
                {prof?.hourlyRate != null && (
                  <div>
                    <span className="text-3xl font-bold text-zinc-900 dark:text-white">
                      ${prof.hourlyRate.toLocaleString("es-AR")}
                    </span>
                    <span className="text-zinc-500">/hora</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${availCfg.dot}`} />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{availCfg.label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Descripción */}
        {prof?.description && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Sobre {name}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{prof.description}</p>
          </div>
        )}

        {/* Tags */}
        {(service || (prof?.tags && prof.tags.length > 0)) && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Servicios que ofrece</h2>
            <div className="flex flex-wrap gap-2">
              {service && (
                <span className="bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200 px-4 py-2 rounded-lg text-sm font-medium">
                  {service.name}
                </span>
              )}
              {prof?.tags?.map((tag) => (
                <span key={tag} className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-4 py-2 rounded-lg text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Reseñas */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Reseñas (0)</h2>
          <p className="text-zinc-500 text-center py-8">Todavía no hay reseñas. ¡Completá trabajos y pedile a tus clientes que te califiquen!</p>
        </div>

        {/* CTA editar */}
        <div className="mt-6 text-center">
          <Link
            href="/professional/setup"
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors font-semibold"
          >
            Editar mi perfil
          </Link>
        </div>

      </div>
    </div>
  );
}
