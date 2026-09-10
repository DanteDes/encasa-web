"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getClientBookings, updateBookingStatus } from "@/lib/api";
import type { Booking } from "@/types";

type Filtro = "todas" | Booking["status"];

const ESTADO_CONFIG: Record<Booking["status"], { label: string; color: string }> = {
  PENDING:   { label: "Pendiente",   color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  CONFIRMED: { label: "Confirmada",  color: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" },
  COMPLETED: { label: "Completada",  color: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" },
  CANCELLED: { label: "Cancelada",   color: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400" },
};

function formatFecha(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `Hace ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Hace ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Ayer";
  return `Hace ${days} días`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-AR", {
    weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
  });
}

const FILTROS: { key: Filtro; label: string }[] = [
  { key: "todas",     label: "Todas" },
  { key: "PENDING",   label: "Pendientes" },
  { key: "CONFIRMED", label: "Confirmadas" },
  { key: "COMPLETED", label: "Completadas" },
  { key: "CANCELLED", label: "Canceladas" },
];

export default function MisSolicitudesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState<number | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/auth/signin");
    if (status === "authenticated" && session?.user?.role === "professional") {
      router.replace("/solicitudes");
    }
  }, [status, session, router]);

  const fetchBookings = useCallback(async () => {
    if (!session?.user?.backendToken) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getClientBookings(session.user.backendToken);
      setBookings(data);
    } catch {
      setError("No se pudieron cargar tus solicitudes.");
    } finally {
      setLoading(false);
    }
  }, [session?.user?.backendToken]);

  useEffect(() => {
    setMounted(true);
    if (status === "authenticated") fetchBookings();
  }, [status, fetchBookings]);

  async function handleCancel(id: number) {
    if (!session?.user?.backendToken) return;
    setCancelling(id);
    try {
      const updated = await updateBookingStatus(id, "cancel", session.user.backendToken);
      setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: updated.status } : b));
    } catch {
      // silently fail
    } finally {
      setCancelling(null);
    }
  }

  if (!mounted || status === "loading") return null;

  const filtradas = filtro === "todas" ? bookings : bookings.filter((b) => b.status === filtro);
  const counts = {
    todas: bookings.length,
    PENDING: bookings.filter((b) => b.status === "PENDING").length,
    CONFIRMED: bookings.filter((b) => b.status === "CONFIRMED").length,
    COMPLETED: bookings.filter((b) => b.status === "COMPLETED").length,
    CANCELLED: bookings.filter((b) => b.status === "CANCELLED").length,
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <nav className="text-sm text-zinc-500 mb-4">
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-900 dark:text-white">Mis solicitudes</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">Mis solicitudes</h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                El estado de tus pedidos a profesionales.
              </p>
            </div>
            <button
              onClick={fetchBookings}
              disabled={loading}
              className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors disabled:opacity-40"
            >
              {loading ? "Actualizando..." : "↻ Actualizar"}
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTROS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFiltro(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtro === key
                  ? "bg-orange-500 text-white"
                  : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300"
              }`}
            >
              {label} ({counts[key]})
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {loading && !error ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                  <div className="space-y-2">
                    <div className="h-4 w-36 bg-zinc-200 dark:bg-zinc-700 rounded" />
                    <div className="h-3 w-24 bg-zinc-100 dark:bg-zinc-800 rounded" />
                  </div>
                </div>
                <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded mb-2" />
                <div className="h-3 w-2/3 bg-zinc-100 dark:bg-zinc-800 rounded" />
              </div>
            ))}
          </div>
        ) : filtradas.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <div className="text-5xl mb-4">📋</div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
              {filtro === "todas" ? "Todavía no hiciste ninguna solicitud" : "No hay solicitudes en este estado"}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              {filtro === "todas" ? "Buscá un profesional y contactalo desde su perfil." : "Probá seleccionando otro filtro."}
            </p>
            {filtro === "todas" && (
              <Link href="/professionals" className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm">
                Buscar profesionales
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filtradas.map((b) => {
              const cfg = ESTADO_CONFIG[b.status];
              const profPhone = (b as Booking & { professionalPhone?: string }).professionalPhone;
              const profName = (b as Booking & { professionalName?: string }).professionalName ?? "Profesional";
              const waLink = profPhone
                ? `https://wa.me/549${profPhone}?text=${encodeURIComponent(`Hola ${profName}! Te escribo por mi solicitud del ${formatDate(b.scheduledDate)} en EnCasa.`)}`
                : null;

              return (
                <div key={b.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {profName[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900 dark:text-white">{profName}</p>
                        <p className="text-xs text-zinc-500">
                          {formatFecha(b.createdAt)} · {(b as Booking & { serviceName?: string }).serviceName ?? b.serviceId}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${cfg.color}`}>
                      {cfg.label}
                    </span>
                  </div>

                  {b.notes && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3 pl-13">
                      &ldquo;{b.notes}&rdquo;
                    </p>
                  )}

                  <div className="flex flex-wrap gap-3 text-xs text-zinc-500 dark:text-zinc-400 mb-4 pl-13">
                    <span>📅 {formatDate(b.scheduledDate)}</span>
                    {b.estimatedHours && <span>⏱ {b.estimatedHours}h estimadas</span>}
                    {b.totalPrice && <span>💰 ${b.totalPrice.toLocaleString("es-AR")}</span>}
                  </div>

                  {/* Estado informativo */}
                  {b.status === "PENDING" && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 mb-4 pl-13">
                      Esperando confirmación del profesional.
                    </p>
                  )}
                  {b.status === "CONFIRMED" && (
                    <p className="text-xs text-orange-600 dark:text-orange-400 mb-4 pl-13">
                      El profesional confirmó tu solicitud.
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    {waLink && (
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Contactar por WhatsApp
                      </a>
                    )}
                    {b.status === "PENDING" && (
                      <button
                        disabled={cancelling === b.id}
                        onClick={() => handleCancel(b.id)}
                        className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                      >
                        {cancelling === b.id ? "..." : "Cancelar solicitud"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
