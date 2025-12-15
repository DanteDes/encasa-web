import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <nav className="text-sm text-zinc-500 mb-4">
            <Link
              href="/"
              className="hover:text-zinc-900 dark:hover:text-white"
            >
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-blue-50 dark:bg-blue-950 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
            ¿No encontrás lo que buscás?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Contactanos y te ayudamos a encontrar el profesional perfecto para
            tu necesidad
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contactar
          </Link>
        </div>
      </div>
    </div>
  );
}
