"use client";

import { useState } from "react";

const faqs = [
  {
    q: "¿Cómo verifican a los profesionales?",
    a: "Cada profesional pasa por una revisión de matrícula habilitante, identidad y antecedentes antes de aparecer en la plataforma. Además, solo clientes que efectivamente contrataron un servicio pueden dejar una reseña.",
  },
  {
    q: "¿Es gratis solicitar un presupuesto?",
    a: "Sí, solicitar presupuesto es 100% gratuito y sin compromiso. Podés contactar a varios profesionales y comparar antes de decidirte.",
  },
  {
    q: "¿Qué pasa si no estoy conforme con el trabajo?",
    a: "Tenemos un sistema de mediación. Si el trabajo no cumple con lo acordado, te ayudamos a resolverlo con el profesional. Todas las conversaciones quedan registradas en la plataforma.",
  },
  {
    q: "¿Puedo contratar a un profesional para el mismo día?",
    a: "Sí. Muchos de nuestros profesionales tienen disponibilidad inmediata. Buscá los que tienen el indicador 'Disponible ahora' y respondén en menos de 2 horas.",
  },
  {
    q: "¿Cómo funciona el sistema de reseñas?",
    a: "Solo los clientes que contrataron y completaron un trabajo pueden dejar una reseña. Esto garantiza que todas las calificaciones sean auténticas y confiables.",
  },
  {
    q: "¿Tiene algún costo registrarse como profesional?",
    a: "No. Registrarse como profesional es completamente gratuito. No hay costos de alta ni comisiones fijas. Vos definís tu tarifa.",
  },
  {
    q: "¿En qué zonas de Mar del Plata trabajan?",
    a: "Contamos con profesionales en toda el área metropolitana de Mar del Plata: Centro, Güemes, La Perla, Los Troncos, Puerto, Punta Mogotes, Camet y alrededores.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-20 bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-3">
            Preguntas frecuentes
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Todo lo que necesitás saber antes de empezar
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-medium text-zinc-900 dark:text-white pr-4">
                  {faq.q}
                </span>
                <span
                  className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full border-2 transition-colors ${
                    open === i
                      ? "border-orange-500 text-orange-500 rotate-180"
                      : "border-zinc-300 dark:border-zinc-600 text-zinc-400"
                  }`}
                  style={{ transition: "transform 0.2s" }}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
