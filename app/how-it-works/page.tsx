import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cómo funciona — EnCasa",
  description: "Encontrá el profesional perfecto en 3 pasos. Buscá, comparálos y contactálo directo.",
};

const steps = [
  {
    n: "1",
    title: "Buscá el servicio que necesitás",
    body: "Navegá por las categorías o usá el buscador para encontrar exactamente lo que precisás: carpinteros, electricistas, plomeros, pintores y más.",
    tip: "Podés filtrar por zona para encontrar profesionales cerca tuyo.",
  },
  {
    n: "2",
    title: "Compará perfiles y precios",
    body: "Revisá calificaciones, reseñas, años de experiencia y tarifas. Todos los profesionales están verificados antes de aparecer en la plataforma.",
    tip: "Las reseñas son solo de clientes que ya contrataron — ninguna es inventada.",
  },
  {
    n: "3",
    title: "Contactálo directo",
    body: "Sin intermediarios ni comisiones. Coordinás los detalles, pedís presupuesto y acordás la fecha directamente con el profesional.",
    tip: "Describí tu proyecto con detalle para recibir un presupuesto más preciso.",
  },
  {
    n: "4",
    title: "Calificá tu experiencia",
    body: "Una vez terminado el trabajo, dejá tu reseña. Tu opinión ayuda a otros vecinos a elegir mejor y reconoce el trabajo de los buenos profesionales.",
    tip: "Las reseñas honestas y detalladas son las más útiles para la comunidad.",
  },
];

const faqs = [
  {
    q: "¿Los profesionales están verificados?",
    a: "Sí. Todos pasan por un proceso de verificación de identidad y credenciales antes de publicar su perfil.",
  },
  {
    q: "¿Cuánto cuesta usar EnCasa?",
    a: "Buscar y contactar profesionales es completamente gratis. Pagás solo por el trabajo, directo al profesional, sin comisiones.",
  },
  {
    q: "¿Qué pasa si no quedé conforme con el trabajo?",
    a: "Te recomendamos hablarlo primero con el profesional. Si el problema no se resuelve, nuestro equipo está disponible para acompañarte.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="bg-zinc-950 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="text-sm text-zinc-500 mb-6 flex justify-center gap-2">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-zinc-300">Cómo funciona</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Así de fácil encontrás
            <br />
            <span className="text-orange-400">tu profesional</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            En EnCasa te conectamos con profesionales verificados de Mar del Plata en minutos, sin vueltas y sin intermediarios.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 md:py-20 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {steps.map((step, i) => (
              <div key={step.n} className="flex gap-6 md:gap-8">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-orange-500 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg shadow-orange-500/20">
                    {step.n}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 h-10 bg-orange-200 dark:bg-orange-900/40 mx-auto mt-2" />
                  )}
                </div>
                <div className="pb-2">
                  <h2 className="text-xl md:text-2xl font-bold mb-2 text-zinc-900 dark:text-white">
                    {step.title}
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed">
                    {step.body}
                  </p>
                  <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 rounded-xl px-4 py-3">
                    <p className="text-sm text-orange-800 dark:text-orange-300">
                      <span className="font-semibold">Tip:</span> {step.tip}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10 text-zinc-900 dark:text-white text-center">
            Preguntas frecuentes
          </h2>
          <div className="space-y-6">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-white dark:bg-zinc-950 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-white">{q}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white dark:bg-zinc-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-3 text-zinc-900 dark:text-white">
            ¿Listo para empezar?
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">
            Más de 120 profesionales verificados esperando tu consulta.
          </p>
          <Link
            href="/professionals"
            className="inline-block bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition-colors font-semibold text-lg shadow-lg shadow-orange-500/20"
          >
            Ver profesionales disponibles →
          </Link>
        </div>
      </section>

    </div>
  );
}
