import type { Metadata } from "next";
import { getServices, getProfessionals } from "@/lib/api";
import { services as staticServices } from "@/data/services";
import ProfessionalCard from "@/components/ProfessionalCard";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return staticServices.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const s = staticServices.find((s) => s.id === id);
  if (!s) return {};
  return {
    title: `${s.name} en Mar del Plata — EnCasa`,
    description: `Encontrá profesionales de ${s.name} en Mar del Plata. Verificados, con reseñas reales y disponibles ahora. ${s.description}`,
    openGraph: {
      title: `${s.name} en Mar del Plata — EnCasa`,
      description: `Profesionales de ${s.name} verificados para tu hogar.`,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = await params;

  const [services, professionals] = await Promise.all([
    getServices(),
    getProfessionals({ serviceId: id }),
  ]);

  const service = services.find((s) => s.id === id);
  if (!service) notFound();

  const available = professionals.filter((p) => p.availability === "disponible").length;
  const avgRating =
    professionals.length > 0
      ? (professionals.reduce((sum, p) => sum + p.rating, 0) / professionals.length).toFixed(1)
      : null;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-white">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <Link href="/services" className="hover:text-zinc-900 dark:hover:text-white">
            Servicios
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900 dark:text-white">{service.name}</span>
        </nav>

        {/* Header del servicio */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div
              className={`w-20 h-20 ${service.color} rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 shadow-lg`}
            >
              {service.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-2">
                {service.name}
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">
                    {available} disponibles ahora
                  </span>
                </div>
                {avgRating && (
                  <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                      {avgRating} promedio
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">
                    {professionals.length} profesional{professionals.length !== 1 ? "es" : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grilla de profesionales */}
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Profesionales de {service.name}
          </h2>
          <Link
            href="/professionals"
            className="text-sm text-orange-500 hover:text-orange-600 font-medium"
          >
            Ver todos →
          </Link>
        </div>

        {professionals.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">
              No hay profesionales todavía
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
              Pronto habrá profesionales de {service.name} disponibles en la plataforma.
            </p>
            <Link
              href="/professionals"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors font-medium"
            >
              Ver todos los profesionales
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {professionals.map((professional) => (
              <ProfessionalCard key={professional.id} professional={professional} />
            ))}
          </div>
        )}

        {/* CTA para profesionales */}
        <div className="mt-12 bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">
            ¿Sos profesional de {service.name}?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-5 text-sm">
            Unite a EnCasa y empezá a recibir consultas de clientes en Mar del Plata.
          </p>
          <Link
            href="/register"
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors font-semibold"
          >
            Registrarme gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
