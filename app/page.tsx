import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import ServiceCard from "@/components/ServiceCard";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import BlogSection from "@/components/BlogSection";
import ProfessionalCard from "@/components/ProfessionalCard";
import { getServices, getProfessionals } from "@/lib/api";

export default async function Home() {
  const [services, allProfessionals] = await Promise.all([
    getServices(),
    getProfessionals(),
  ]);
  const featured = allProfessionals.filter((p) => p.availability === "disponible").slice(0, 3);

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative bg-zinc-950 text-white py-16 md:py-28 overflow-hidden">
        {/* Orange glow accents */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-600/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block bg-orange-500/15 border border-orange-500/30 px-4 py-2 rounded-full text-sm font-medium mb-6 text-orange-300">
              🏖️ Profesionales verificados en Mar del Plata
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              ¿Necesitás un profesional
              <br />
              <span className="text-orange-400">hoy mismo</span>?
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-zinc-300">
              Electricistas, plomeros, pintores y más.
              <br className="hidden md:block" />
              Verificados, con reseñas reales y disponibles ahora.
            </p>

            <div className="max-w-2xl mx-auto mb-6">
              <SearchBar placeholder="Ej: electricista, plomero, pintor..." />
            </div>

            <p className="text-sm text-zinc-500">
              ⚡ Respuesta en menos de 2 horas
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-14 max-w-4xl mx-auto border-t border-zinc-800 pt-10">
            {[
              { value: "120+", label: "Profesionales activos" },
              { value: "850+", label: "Trabajos completados" },
              { value: "4.9★", label: "Calificación promedio" },
              { value: "<2hs", label: "Tiempo de respuesta" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-1">{value}</div>
                <div className="text-sm text-zinc-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust badges strip ── */}
      <section className="bg-zinc-900 border-b border-zinc-800 py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-zinc-400">
            {[
              "🛡️ Profesionales verificados",
              "⭐ Reseñas auténticas",
              "📋 Matriculados habilitados",
              "💬 Contacto directo",
              "🔒 Datos seguros",
            ].map((item) => (
              <span key={item} className="font-medium">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-16 md:py-20 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-zinc-900 dark:text-white">
              ¿Qué necesitás arreglar?
            </h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400">
              Elegí el servicio y te mostramos profesionales disponibles
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <p className="text-center text-sm text-zinc-400">
            ✓ Todos los profesionales están verificados
          </p>
        </div>
      </section>

      {/* ── Trust 3-col ── */}
      <section className="py-12 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: "✓", title: "100% Verificados", desc: "Revisamos matrícula, DNI y reseñas de cada profesional" },
              { icon: "💬", title: "Reseñas Reales", desc: "Solo clientes que contrataron pueden calificar" },
              { icon: "⚡", title: "Respuesta Rápida", desc: "Los profesionales responden en menos de 2 horas" },
            ].map(({ icon, title, desc }) => (
              <div key={title}>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center text-orange-600 dark:text-orange-400 text-xl font-bold mx-auto mb-4">
                  {icon}
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Professionals ── */}
      <section className="py-16 md:py-20 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-2">
                Profesionales destacados
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400">
                Verificados, disponibles y con las mejores calificaciones
              </p>
            </div>
            <Link href="/professionals" className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors">
              Ver todos
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((p) => (
              <ProfessionalCard key={p.id} professional={p} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/professionals" className="text-sm font-medium text-orange-500 hover:text-orange-600">
              Ver todos los profesionales →
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it Works ── */}
      <section className="py-16 md:py-20 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
              Así de fácil
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { n: "1", title: "Elegí el servicio", desc: "Decinos qué necesitás: electricista, plomero, pintor, etc." },
              { n: "2", title: "Comparálos", desc: "Mirá precios, reseñas y disponibilidad de cada uno" },
              { n: "3", title: "Contactálo directo", desc: "Chat o WhatsApp. Sin intermediarios, sin complicaciones" },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white dark:bg-zinc-800 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-700">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-xl flex items-center justify-center text-2xl font-bold mb-4">
                  {n}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-white">{title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection />

      {/* ── Testimonials ── */}
      <TestimonialsSection />

      {/* ── Blog ── */}
      <BlogSection />

      {/* ── Main CTA ── */}
      <section className="relative bg-zinc-950 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Encontrá tu profesional
            <br />
            en menos de 5 minutos
          </h2>
          <p className="text-xl mb-8 text-zinc-400">
            Gratis. Sin compromiso. Con profesionales verificados.
          </p>

          <Link
            href="/professionals"
            className="inline-block bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition-all font-semibold text-lg shadow-lg shadow-orange-900/30 hover:shadow-orange-900/50 hover:scale-105"
          >
            Ver Profesionales Disponibles →
          </Link>

          <p className="text-sm text-zinc-500 mt-4">
            Más de 120 profesionales esperando tu consulta
          </p>

          {/* Secondary CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="text-zinc-600 text-sm">o también podés:</span>
            <a
              href="https://wa.me/5492236000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <span>📱</span> Escribinos por WhatsApp
            </a>
            <a
              href="mailto:hola@encasa.app"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <span>✉️</span> Enviarnos un email
            </a>
          </div>
        </div>
      </section>

      {/* ── Pro CTA ── */}
      <section className="py-16 bg-white dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-orange-500 to-orange-700 text-white rounded-2xl p-8 md:p-12 shadow-xl shadow-orange-900/20">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">¿Sos profesional?</h2>
            <p className="text-lg mb-6 text-orange-100">
              Recibí consultas de clientes reales en Mar del Plata
            </p>
            <Link
              href="/register"
              className="inline-block bg-zinc-900 text-white px-6 py-3 rounded-lg hover:bg-zinc-800 transition-colors font-semibold"
            >
              Registrate Gratis
            </Link>
            <p className="text-sm text-orange-200 mt-4">
              Sin costos de alta. Cobrás lo que vos quieras.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
