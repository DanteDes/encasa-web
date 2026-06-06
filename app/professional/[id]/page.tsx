import { apiFetch } from "@/lib/api";
import { Professional, Review } from "@/types";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

function formatDate(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Hoy";
  if (days === 1) return "Hace 1 día";
  if (days < 7) return `Hace ${days} días`;
  if (days < 14) return "Hace 1 semana";
  if (days < 30) return `Hace ${Math.floor(days / 7)} semanas`;
  if (days < 60) return "Hace 1 mes";
  return `Hace ${Math.floor(days / 30)} meses`;
}

export default async function ProfessionalDetailPage({ params }: PageProps) {
  const { id } = await params;

  let professional: Professional;
  let reviews: Review[] = [];

  try {
    professional = await apiFetch<Professional>(`/professionals/${id}`);
    reviews = await apiFetch<Review[]>(`/reviews/professional/${id}`);
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-zinc-500 mb-6">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-white">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/professionals" className="hover:text-zinc-900 dark:hover:text-white">Profesionales</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900 dark:text-white">{professional!.name}</span>
        </nav>

        {/* Header */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-32 h-32 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-6xl flex-shrink-0">
              {professional!.image ?? "👤"}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">{professional!.name}</h1>
                {professional!.verified && (
                  <span className="text-blue-600 text-2xl" title="Verificado">✓</span>
                )}
              </div>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">{professional!.service}</p>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500 text-xl">⭐</span>
                  <span className="font-bold text-lg">{professional!.rating}</span>
                  <span className="text-zinc-500">({professional!.reviewCount} reseñas)</span>
                </div>
                {professional!.experience != null && (
                  <>
                    <span className="text-zinc-300 dark:text-zinc-700">•</span>
                    <span className="text-zinc-600 dark:text-zinc-400">{professional!.experience} años de experiencia</span>
                  </>
                )}
                {professional!.location && (
                  <>
                    <span className="text-zinc-300 dark:text-zinc-700">•</span>
                    <span className="text-zinc-600 dark:text-zinc-400">📍 {professional!.location}</span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-4 mb-6">
                {professional!.hourlyRate != null && (
                  <div>
                    <span className="text-3xl font-bold text-zinc-900 dark:text-white">
                      ${professional!.hourlyRate.toLocaleString()}
                    </span>
                    <span className="text-zinc-500">/hora</span>
                  </div>
                )}
                {professional!.availability && (
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        professional!.availability === "disponible"
                          ? "bg-green-500"
                          : professional!.availability === "ocupado"
                          ? "bg-orange-500"
                          : "bg-red-500"
                      }`}
                    />
                    <span className="text-sm font-medium capitalize">
                      {professional!.availability === "disponible"
                        ? "Disponible"
                        : professional!.availability === "ocupado"
                        ? "Ocupado"
                        : "No disponible"}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Contactar
                </button>
                <button className="border border-zinc-300 dark:border-zinc-700 px-6 py-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {professional!.description && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
              Sobre {professional!.name}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{professional!.description}</p>
          </div>
        )}

        {/* Services */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Servicios que ofrece</h2>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-4 py-2 rounded-lg">
              {professional!.service}
            </span>
            <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-2 rounded-lg">
              Presupuestos sin cargo
            </span>
            <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-2 rounded-lg">
              Garantía de trabajo
            </span>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">
            Reseñas ({reviews.length})
          </h2>
          {reviews.length === 0 ? (
            <p className="text-zinc-500 text-center py-8">Todavía no hay reseñas para este profesional.</p>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-zinc-200 dark:border-zinc-800 pb-6 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-zinc-200 dark:bg-zinc-700 rounded-full flex items-center justify-center text-sm font-semibold">
                        C
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900 dark:text-white">Cliente verificado</p>
                        <p className="text-sm text-zinc-500">{formatDate(review.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-500">⭐</span>
                      ))}
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-zinc-600 dark:text-zinc-400">{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
