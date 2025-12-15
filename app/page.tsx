import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import ServiceCard from "@/components/ServiceCard";
import TestimonialsSection from "@/components/TestimonialsSection";
import { services } from "@/data/services";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Más directo y urgente */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              🏖️ Profesionales verificados en Mar del Plata
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              ¿Necesitás un profesional
              <br />
              <span className="text-yellow-300">hoy mismo</span>?
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-blue-50">
              Electricistas, plomeros, pintores y más.
              <br className="hidden md:block" />
              Verificados, con reseñas reales y disponibles ahora.
            </p>

            <div className="max-w-2xl mx-auto mb-6">
              <SearchBar placeholder="Ej: electricista, plomero, pintor..." />
            </div>

            <p className="text-sm text-blue-200">
              ⚡ Respuesta en menos de 2 horas
            </p>
          </div>

          {/* Stats - Más específicos y creíbles */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-1">120+</div>
              <div className="text-sm md:text-base text-blue-100">
                Profesionales activos
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-1">850+</div>
              <div className="text-sm md:text-base text-blue-100">
                Trabajos completados
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-1">4.9★</div>
              <div className="text-sm md:text-base text-blue-100">
                Calificación promedio
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Más directo */}
      <section className="py-16 md:py-20 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-zinc-900 dark:text-white">
              ¿Qué necesitás arreglar?
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Elegí el servicio y te mostramos profesionales disponibles
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              ✓ Todos los profesionales están verificados
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section - Nuevo */}
      <section className="py-12 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl mb-3">✓</div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                100% Verificados
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Revisamos matrícula, DNI y reseñas de cada profesional
              </p>
            </div>
            <div>
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                Reseñas Reales
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Solo clientes que contrataron pueden calificar
              </p>
            </div>
            <div>
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                Respuesta Rápida
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Los profesionales responden en menos de 2 horas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works - Simplificado */}
      <section className="py-16 md:py-20 bg-white dark:bg-zinc-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-zinc-900 dark:text-white">
              Así de fácil
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-white">
                Elegí el servicio
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Decinos qué necesitás: electricista, plomero, pintor, etc.
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-white">
                Comparálos
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Mirá precios, reseñas y disponibilidad de cada uno
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-white">
                Contactálo directo
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Chat o WhatsApp. Sin intermediarios, sin complicaciones
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Principal - Más urgente */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Encontrá tu profesional
            <br />
            en menos de 5 minutos
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Gratis. Sin compromiso. Con profesionales verificados.
          </p>
          <Link
            href="/professionals"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105"
          >
            Ver Profesionales Disponibles →
          </Link>
          <p className="text-sm text-blue-200 mt-4">
            Más de 120 profesionales esperando tu consulta
          </p>
        </div>
      </section>

      {/* CTA Profesionales - Secundario */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              ¿Sos profesional?
            </h2>
            <p className="text-lg mb-6 text-purple-100">
              Recibí consultas de clientes reales en Mar del Plata
            </p>
            <Link
              href="/register"
              className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors font-medium"
            >
              Registrate Gratis
            </Link>
            <p className="text-sm text-purple-200 mt-4">
              Sin costos de alta. Cobrás lo que vos quieras.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
