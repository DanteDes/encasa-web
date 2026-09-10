import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import ProfessionalProfileBanner from "@/components/ProfessionalProfileBanner";
import ProfessionalActivityEmpty from "@/components/ProfessionalActivityEmpty";
import ClientBookingsList from "@/components/ClientBookingsList";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const role = session.user.role ?? "client";
  const isProfessional = role === "professional";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Dashboard</h1>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                isProfessional
                  ? "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300"
                  : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
              }`}>
                {isProfessional ? "Profesional" : "Cliente"}
              </span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">
              Bienvenido, {session.user.name}
            </p>
          </div>
          {session.user.image && (
            <img
              src={session.user.image}
              alt={session.user.name ?? "User"}
              className="w-12 h-12 rounded-full ring-2 ring-zinc-200 dark:ring-zinc-700"
            />
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {isProfessional ? (
            <>
              <StatCard icon="📋" label="Solicitudes recibidas" value="0" sub="Esta semana" />
              <StatCard icon="✅" label="Trabajos completados" value="0" sub="En total" />
              <StatCard icon="⭐" label="Calificación promedio" value="—" sub="Sin reseñas aún" />
            </>
          ) : (
            <>
              <StatCard icon="🔍" label="Búsquedas realizadas" value="0" sub="Esta semana" />
              <StatCard icon="📅" label="Servicios contratados" value="0" sub="En total" />
              <StatCard icon="❤️" label="Profesionales guardados" value="0" sub="En favoritos" />
            </>
          )}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Activity — takes 2 cols */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">
              {isProfessional ? "Solicitudes recientes" : "Actividad reciente"}
            </h2>
            {isProfessional ? (
              <ProfessionalActivityEmpty />
            ) : (
              <ClientBookingsList />
            )}
          </div>

          {/* Quick actions — 1 col */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Acciones rápidas
            </h2>
            <div className="flex flex-col gap-3">
              {isProfessional ? (
                <>
                  <QuickAction href="/professional/setup" icon="🔧" label="Editar perfil profesional" />
                  <QuickAction href="/professionals" icon="👥" label="Ver la competencia" />
                  <QuickAction href="/settings" icon="⚙️" label="Configuración" />
                </>
              ) : (
                <>
                  <QuickAction href="/services" icon="🔍" label="Buscar un servicio" />
                  <QuickAction href="/professionals" icon="👥" label="Ver profesionales" />
                  <QuickAction href="/favorites" icon="❤️" label="Mis favoritos" />
                  <QuickAction href="/settings" icon="⚙️" label="Configuración" />
                </>
              )}
            </div>
          </div>
        </div>

        {isProfessional && <ProfessionalProfileBanner />}

        {/* Client discovery banner */}
        {!isProfessional && (
          <div className="mt-6 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">
                ¿Necesitás un profesional ahora?
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Respuesta en menos de 2 horas. Profesionales verificados.
              </p>
            </div>
            <Link
              href="/services"
              className="shrink-0 px-5 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm"
            >
              Explorar servicios
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub }: { icon: string; label: string; value: string; sub: string }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{label}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-3xl font-bold text-zinc-900 dark:text-white">{value}</p>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{sub}</p>
    </div>
  );
}

function QuickAction({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors group"
    >
      <span className="text-xl w-8 text-center">{icon}</span>
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
        {label}
      </span>
      <svg className="w-4 h-4 ml-auto text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
