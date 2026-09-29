"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getMyProfessionalProfile, getProfessionalReviews } from "@/lib/api";
import { getStoredAvatar } from "@/lib/avatar";
import ProfServiceTags from "@/components/ProfServiceTags";
import ReviewsList from "@/components/ReviewsList";
import type { Professional, Review } from "@/types";

const AVAILABILITY_CONFIG: Record<string, { label: string; dot: string }> = {
  disponible:      { label: "Disponible ahora", dot: "bg-green-500" },
  ocupado:         { label: "Ocupado",           dot: "bg-orange-500" },
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
  const [prof, setProf] = useState<Professional | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/auth/signin");
    if (status === "authenticated" && session?.user?.role !== "professional") {
      router.replace("/");
    }
  }, [status, session, router]);

  useEffect(() => {
    setAvatar(getStoredAvatar());
    const token = session?.user?.backendToken;
    if (!token) return;

    setLoading(true);
    setError(false);
    getMyProfessionalProfile(token)
      .then((p) => {
        setProf(p);
        return getProfessionalReviews(p.id);
      })
      .then((r) => setReviews(r))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [session?.user?.backendToken]);

  if (status === "loading" || !session?.user) return null;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-zinc-500">Cargando...</div>;
  }

  if (error || !prof) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-zinc-600 dark:text-zinc-400">No pudimos cargar tu perfil público. Intentá de nuevo en unos minutos.</p>
        <Link href="/dashboard" className="text-orange-500 hover:underline font-medium">Volver al dashboard</Link>
      </div>
    );
  }

  const availCfg = AVAILABILITY_CONFIG[prof.availability] ?? AVAILABILITY_CONFIG.disponible;
  const src = avatar ?? session.user.image;

  return (
    <div className="min-h-screen py-12 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Banner de vista previa */}
        <div className="mb-6 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-xl px-5 py-3 flex items-center justify-between gap-4">
          <p className="text-sm text-orange-800 dark:text-orange-300 font-medium">
            👁️ Así ve tu perfil un cliente
          </p>
          <Link href="/dashboard" className="text-xs text-orange-600 dark:text-orange-400 hover:underline font-medium">
            Volver al dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full flex-shrink-0 overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              {src ? (
                <img src={src} alt={prof.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-5xl">👤</span>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">{prof.name}</h1>
                {prof.verified && (
                  <span className="text-blue-600 text-2xl" title="Verificado">✓</span>
                )}
              </div>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
                {prof.service}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500 text-xl">⭐</span>
                  <span className="font-bold text-lg text-zinc-900 dark:text-white">
                    {prof.reviewCount > 0 ? prof.rating.toFixed(1) : "—"}
                  </span>
                  <span className="text-zinc-500 text-sm">
                    {prof.reviewCount > 0 ? `(${prof.reviewCount} reseña${prof.reviewCount !== 1 ? "s" : ""})` : "(sin reseñas aún)"}
                  </span>
                </div>
                {prof.experience && (
                  <>
                    <span className="text-zinc-300 dark:text-zinc-700">•</span>
                    <span className="text-zinc-600 dark:text-zinc-400">
                      {EXPERIENCE_LABELS[String(prof.experience)] ?? prof.experience} de experiencia
                    </span>
                  </>
                )}
                {prof.location && (
                  <>
                    <span className="text-zinc-300 dark:text-zinc-700">•</span>
                    <span className="text-zinc-600 dark:text-zinc-400">📍 {prof.location}</span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-4">
                {prof.hourlyRate != null && (
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
        {prof.description && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Sobre {prof.name}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{prof.description}</p>
          </div>
        )}

        {/* Tags */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Servicios que ofrece</h2>
          <ProfServiceTags service={prof.service} tags={prof.tags ?? []} />
        </div>

        {/* Reseñas */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">Reseñas ({reviews.length})</h2>
          <ReviewsList serverReviews={reviews} />
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
