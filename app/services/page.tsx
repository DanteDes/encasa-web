import ServiceCard from "@/components/ServiceCard";
import { getServices } from "@/lib/api";
import Link from "next/link";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <nav className="text-sm text-zinc-500 mb-4">
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-white">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-900 dark:text-white">Servicios</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-white">
            Todos los Servicios
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">
            Explorá todas las categorías de servicios domésticos disponibles.
            Cada categoría cuenta con profesionales verificados y calificados.
          </p>
        </div>

        {services.length === 0 ? (
          <div className="text-center py-16 text-zinc-500 dark:text-zinc-400">
            <p className="text-lg">No se pudieron cargar los servicios.</p>
            <p className="text-sm mt-2">Verificá que el backend esté disponible.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 bg-orange-50 dark:bg-orange-950/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
            ¿No encontrás lo que buscás?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Contactanos y te ayudamos a encontrar el profesional perfecto para
            tu necesidad
          </p>
          <Link
            href="/contact"
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Contactar
          </Link>
        </div>
      </div>
    </div>
  );
}
