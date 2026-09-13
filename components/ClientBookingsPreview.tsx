"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getClientBookings, updateBookingStatus } from "@/lib/api";
import type { Booking } from "@/types";

const STATUS: Record<Booking["status"], { label: string; color: string }> = {
  PENDING:   { label: "Enviada",     color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  CONFIRMED: { label: "En proceso",  color: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" },
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

export default function ClientBookingsPreview() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState<number | null>(null);

  function load() {
    if (!session?.user?.backendToken) return;
    getClientBookings(session.user.backendToken)
      .then(setBookings)
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }

  useEffect(load, [session?.user?.backendToken]);

  async function confirmarFinalizacion(id: number) {
    if (!session?.user?.backendToken) return;
    setConfirming(id);
    try {
      const updated = await updateBookingStatus(id, "complete", session.user.backendToken);
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...updated } : b)));
    } catch {
      // el botón vuelve a su estado normal, el usuario puede reintentar
    } finally {
      setConfirming(null);
    }
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3 animate-pulse">
            <div className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-700 flex-shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3.5 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
              <div className="h-3 w-48 bg-zinc-100 dark:bg-zinc-800 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="text-6xl mb-4">🔎</div>
        <p className="text-zinc-600 dark:text-zinc-400 mb-2">No hay actividad reciente</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          Cuando contrates un profesional, tu historial aparecerá aquí.
        </p>
        <Link
          href="/services"
          className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
        >
          Buscar profesionales
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookings.map((b) => {
        const cfg = STATUS[b.status];
        const canConfirm = b.status === "CONFIRMED" && !b.clientConfirmedAt;
        const waitingOnProfessional = b.status === "CONFIRMED" && !!b.clientConfirmedAt;
        return (
          <div key={b.id} className="p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {(b.professionalName ?? "P")[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                  {b.professionalName ?? "Profesional"}
                </p>
                <p className="text-xs text-zinc-500 truncate">
                  {b.serviceName ?? b.serviceId} · {formatFecha(b.createdAt)}
                </p>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${cfg.color}`}>
                {cfg.label}
              </span>
            </div>

            {(canConfirm || waitingOnProfessional) && (
              <div className="mt-2 pl-12">
                {canConfirm && (
                  <button
                    onClick={() => confirmarFinalizacion(b.id)}
                    disabled={confirming === b.id}
                    className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                  >
                    {confirming === b.id ? "Confirmando..." : "Confirmar que se completó"}
                  </button>
                )}
                {waitingOnProfessional && (
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    Esperando que el profesional confirme
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
