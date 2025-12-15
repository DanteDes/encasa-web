import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-zinc-900 dark:text-white">Cómo Funciona</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-white">
            ¿Cómo funciona EnCasa?
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Encontrar el profesional perfecto para tu hogar nunca fue tan fácil
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12 mb-16">
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                1
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white">
                Buscá el servicio que necesitás
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Navegá por nuestras categorías de servicios o utilizá el
                buscador para encontrar exactamente lo que necesitás:
                carpinteros, electricistas, plomeros, pintores y más.
              </p>
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  💡 <strong>Tip:</strong> Podés filtrar por ubicación para
                  encontrar profesionales cerca tuyo
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                2
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white">
                Compará perfiles y precios
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Revisá los perfiles de los profesionales, sus calificaciones,
                reseñas de otros usuarios, años de experiencia y tarifas. Todos
                nuestros profesionales están verificados.
              </p>
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  ⭐ <strong>Tip:</strong> Prestá atención a las reseñas para
                  conocer la experiencia de otros usuarios
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                3
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white">
                Contactá al profesional
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Una vez que hayas elegido tu favorito, contactalo directamente a
                través de la plataforma. Coordiná los detalles del trabajo, pedí
                un presupuesto y acordá la fecha.
              </p>
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  📞 <strong>Tip:</strong> Describí tu proyecto con detalle para
                  recibir un presupuesto más preciso
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                4
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white">
                Calificá tu experiencia
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Una vez finalizado el trabajo, calificá al profesional y dejá
                una reseña. Tu opinión ayuda a otros usuarios a tomar mejores
                decisiones.
              </p>
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  ✨ <strong>Tip:</strong> Las reseñas honestas y detalladas son
                  las más útiles para la comunidad
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-12">
          <h2 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-white">
            Preguntas Frecuentes
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">
                ¿Los profesionales están verificados?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Sí, todos los profesionales pasan por un proceso de verificación
                de identidad y credenciales.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">
                ¿Cuánto cuesta usar EnCasa?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Buscar y contactar profesionales es completamente gratis. Solo
                pagás por el trabajo realizado directamente al profesional.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">
                ¿Qué pasa si no estoy satisfecho con el trabajo?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Te recomendamos comunicarte directamente con el profesional para
                resolver cualquier inconveniente. Si el problema persiste,
                nuestro equipo de soporte está disponible para ayudarte.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">¿Listo para empezar?</h2>
          <p className="text-blue-100 mb-6">
            Encontrá el profesional perfecto para tu próximo proyecto
          </p>
          <Link
            href="/professionals"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-zinc-100 transition-colors font-medium"
          >
            Ver Profesionales
          </Link>
        </div>
      </div>
    </div>
  );
}
