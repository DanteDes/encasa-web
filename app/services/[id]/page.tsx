import { notFound } from "next/navigation";
import Link from "next/link";
import { apiFetch, getProfessionals } from "@/lib/api";
import { servicesMeta } from "@/lib/servicesMeta";
import ProfessionalCard from "@/components/ProfessionalCard";
import type { Service } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params;

  let service: Service;
  try {
    const raw = await apiFetch<{ id: string; name: string; description: string }>(
      `/services/${id}`
    );
    service = {
      ...raw,
      icon: servicesMeta[raw.id]?.icon ?? "🔧",
      color: servicesMeta[raw.id]?.color ?? "bg-zinc-500",
    };
  } catch {
    notFound();
  }

  const serviceProfessionals = await getProfessionals({ serviceId: id });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-zinc-500 mb-6">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-white">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <Link href="/services" className="hover:text-zinc-900 dark:hover:text-white">
            Servicios
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900 dark:text-white">{service!.name}</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div
            className={`w-16 h-16 ${service!.color} rounded-xl flex items-center justify-center text-4xl shadow-lg`}
          >
            {service!.icon}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
              {service!.name}
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-1">
              {service!.description}
            </p>
          </div>
        </div>

        {/* Professionals */}
        {serviceProfessionals.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
              {serviceProfessionals.length} profesional
              {serviceProfessionals.length !== 1 ? "es" : ""} disponible
              {serviceProfessionals.length !== 1 ? "s" : ""}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceProfessionals.map((professional) => (
                <ProfessionalCard
                  key={professional.id}
                  professional={professional}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 text-zinc-500 dark:text-zinc-400">
            <p className="text-lg">
              No hay profesionales disponibles para este servicio todavía.
            </p>
            <Link
              href="/services"
              className="mt-4 inline-block text-orange-500 hover:underline"
            >
              Ver otros servicios
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
