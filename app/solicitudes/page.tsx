"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getProfessionalBookings, updateBookingStatus } from "@/lib/api";
import type { Booking } from "@/types";

type Estado = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
type Filtro = "todas" | Estado;

const ESTADO_CONFIG: Record<Estado, { label: string; color: string }> = {
  PENDING: {
    label: "Nueva",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  },
  CONFIRMED: {
    label: "En proceso",
    color: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  },
  COMPLETED: {
    label: "Completada",
    color: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  },
  CANCELLED: {
    label: "Cancelada",
    color: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
  },
};

/**
 * Para CONFIRMED: "completar" es una confirmación de dos partes (ver
 * BookingService.complete en el backend), así que una vez que el profesional
 * ya confirmó no se le vuelve a ofrecer el botón — queda esperando al cliente.
 */
function getActions(b: Booking): { action: "confirm" | "complete" | "cancel"; label: string }[] {
  if (b.status === "PENDING") {
    return [
      { action: "confirm", label: "Confirmar" },
      { action: "cancel", label: "Cancelar" },
    ];
  }
  if (b.status === "CONFIRMED") {
    const actions: { action: "confirm" | "complete" | "cancel"; label: string }[] = [];
    if (!b.professionalConfirmedAt) {
      actions.push({ action: "complete", label: "Marcar completada" });
    }
    actions.push({ action: "cancel", label: "Cancelar" });
    return actions;
  }
  return [];
}

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
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const FILTROS: { key: Filtro; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "PENDING", label: "Nuevas" },
  { key: "CONFIRMED", label: "En proceso" },
  { key: "COMPLETED", label: "Completadas" },
  { key: "CANCELLED", label: "Canceladas" },
];

export default function SolicitudesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/auth/signin");
    if (status === "authenticated" && session?.user?.role !== "professional") {
      router.replace("/dashboard");
    }
  }, [status, session, router]);

  const fetchBookings = useCallback(async () => {
    if (!session?.user?.backendToken) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getProfessionalBookings(session.user.backendToken);
      setBookings(data);
    } catch {
      setError("No se pudieron cargar las solicitudes. Verificá que el servidor esté disponible.");
    } finally {
      setLoading(false);
    }
  }, [session?.user?.backendToken]);

  useEffect(() => {
    setMounted(true);
    if (status === "authenticated") fetchBookings();
  }, [status, fetchBookings]);

  async function handleAction(id: number, action: "confirm" | "complete" | "cancel") {
    if (!session?.user?.backendToken) return;
    setUpdating(id);
    try {
      const updated = await updateBookingStatus(id, action, session.user.backendToken);
      setBookings((prev) => prev.map((b) => b.id === id ? { ...b, ...updated } : b));
    } catch {
      // silently fail — the button resets
    } finally {
      setUpdating(null);
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
            <span className="text-zinc-900 dark:text-white">Solicitudes</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">Solicitudes recibidas</h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                Clientes que te contactaron a través de la plataforma.
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
                  : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600"
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
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
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
            <div className="text-5xl mb-4">📭</div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
              No hay solicitudes {filtro !== "todas" ? "en este estado" : ""}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {filtro === "todas"
                ? "Cuando un cliente te contacte, aparecerá aquí."
                : "Probá seleccionando otro filtro."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtradas.map((b) => {
              const cfg = ESTADO_CONFIG[b.status];
              const isUpdating = updating === b.id;
              const actions = getActions(b);
              const waitingOnClient = b.status === "CONFIRMED" && !!b.professionalConfirmedAt;
              return (
                <div
                  key={b.id}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {(b.clientName ?? "C")[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900 dark:text-white">{b.clientName ?? "Cliente"}</p>
                        <p className="text-xs text-zinc-500">
                          {formatFecha(b.createdAt)} · {b.serviceName ?? b.serviceId}
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
                    {b.clientEmail && <span>✉️ {b.clientEmail}</span>}
                  </div>

                  {actions.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                      {actions.map(({ action, label }) => (
                        <button
                          key={action}
                          disabled={isUpdating}
                          onClick={() => handleAction(b.id, action)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
                            action === "cancel"
                              ? "border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                              : "bg-orange-500 hover:bg-orange-600 text-white"
                          }`}
                        >
                          {isUpdating ? "..." : label}
                        </button>
                      ))}
                      {waitingOnClient && (
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          Esperando que el cliente confirme la finalización
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
