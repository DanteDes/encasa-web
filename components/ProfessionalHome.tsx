import Link from "next/link";
import type { Session } from "next-auth";
import ProfessionalProfileBanner from "./ProfessionalProfileBanner";

const tips = [
  {
    icon: "📝",
    title: "Completá tu perfil",
    desc: "Un perfil con foto, descripción detallada y tarifa visible recibe hasta 3 veces más contactos.",
    href: "/professional/setup",
    cta: "Editar perfil",
  },
  {
    icon: "⚡",
    title: "Respondé rápido",
    desc: "Los clientes suelen elegir al primero que responde. Cuando te contacten por WhatsApp, respondé lo antes que puedas.",
    href: "/professional/setup",
    cta: "Actualizar disponibilidad",
  },
  {
    icon: "⭐",
    title: "Pedí reseñas",
    desc: "Después de cada trabajo terminado, pedile al cliente que te califique. Las reseñas son tu mejor carta de presentación.",
    href: "/professionals",
    cta: "Ver tu posición",
  },
  {
    icon: "📍",
    title: "Actualizá tu disponibilidad",
    desc: "Marcate como disponible cuando tenés lugar en la agenda. Los clientes filtran por disponibilidad inmediata.",
    href: "/professional/setup",
    cta: "Actualizar",
  },
];

const stats = [
  { label: "Solicitudes recibidas", value: "0", sub: "Esta semana" },
  { label: "Trabajos completados", value: "0", sub: "En total" },
  { label: "Calificación promedio", value: "—", sub: "Sin reseñas aún" },
  { label: "Vistas al perfil", value: "—", sub: "Próximamente" },
];

export default function ProfessionalHome({ session }: { session: Session }) {
  const name = session.user.name?.split(" ")[0] ?? "Profesional";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">

      {/* ── Header ── */}
      <section className="bg-zinc-950 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 px-3 py-1.5 rounded-full text-sm font-medium mb-4 text-orange-300">
                🔧 Panel profesional
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Bienvenido, {name}
              </h1>
              <p className="text-zinc-400">
                Tu perfil está activo en EnCasa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-8 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-6">
            Así vas con tu actividad de esta semana
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map(({ label, value, sub }) => (
              <div key={label} className="text-center py-2">
                <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-1">{value}</div>
                <div className="text-sm font-medium text-zinc-900 dark:text-white">{label}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Banner completar perfil (solo si no está completo) ── */}
      <ProfessionalProfileBanner />

      {/* ── Cómo conseguir más clientes ── */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">
            Cómo conseguir más clientes
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            Seguí estos pasos para mejorar tu presencia en la plataforma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip, i) => (
            <div
              key={tip.title}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 flex gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xl flex-shrink-0">
                {tip.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-zinc-400">0{i + 1}</span>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">{tip.title}</h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                  {tip.desc}
                </p>
                <Link
                  href={tip.href}
                  className="text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors"
                >
                  {tip.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tu perfil en la plataforma ── */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-zinc-900 dark:bg-zinc-800 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold mb-2">¿Cómo te ven los clientes?</h2>
              <p className="text-zinc-400 text-sm max-w-lg">
                Tu perfil aparece en la búsqueda de clientes junto a otros profesionales.
                Cuanto más completo esté, más chances tenés de que te elijan.
              </p>
            </div>
            <Link
              href="/professionals"
              className="shrink-0 px-6 py-3 bg-white text-zinc-900 rounded-xl font-semibold text-sm hover:bg-zinc-100 transition-colors"
            >
              Ver cómo aparezco
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
