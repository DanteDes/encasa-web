import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Centro de ayuda - EnCasa",
};

const faqs = [
  {
    q: "¿Cómo me registro en EnCasa?",
    a: "Podés registrarte usando tu cuenta de Google. Hacé clic en 'Registrarse' y seguí los pasos. El proceso toma menos de 1 minuto.",
  },
  {
    q: "¿Cómo encuentro un profesional?",
    a: "Entrá a la sección 'Servicios' o 'Profesionales', filtrá por categoría o buscá por nombre y ubicación. Podés ver el perfil completo, reseñas y tarifas antes de contactar.",
  },
  {
    q: "¿Los profesionales están verificados?",
    a: "Sí. Todos los profesionales pasan por un proceso de verificación antes de aparecer en la plataforma. Aun así, te recomendamos revisar las reseñas de otros usuarios.",
  },
  {
    q: "¿Cómo me registro como profesional?",
    a: "Registrate como usuario primero, luego completá tu perfil profesional desde la sección 'Dashboard'. Podés agregar tu especialidad, experiencia, tarifa y zona de trabajo.",
  },
  {
    q: "¿Cuánto cuesta usar EnCasa?",
    a: "El uso de la plataforma es gratuito para los clientes. Para los profesionales, estamos definiendo el modelo de precios. Por ahora el registro es sin costo.",
  },
  {
    q: "¿Cómo dejo una reseña?",
    a: "Después de finalizar un servicio, podés dejar una reseña desde el perfil del profesional. Las reseñas ayudan a otros usuarios a tomar mejores decisiones.",
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-white">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900 dark:text-white">Centro de ayuda</span>
        </nav>

        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Centro de ayuda</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-10 text-lg">
          Preguntas frecuentes sobre el uso de EnCasa.
        </p>

        <div className="space-y-4 mb-12">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6"
            >
              <h2 className="font-semibold text-zinc-900 dark:text-white mb-2">{faq.q}</h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
            ¿No encontrás lo que buscás?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Contactanos directamente y te respondemos a la brevedad.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Ir a contacto
          </Link>
        </div>
      </div>
    </div>
  );
}
