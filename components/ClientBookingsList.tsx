"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getMyBookings, confirmBookingCompletion, type Booking } from "@/lib/api";

const ESTADO_LABEL: Record<Booking["status"], { label: string; color: string }> = {
  REQUESTED: { label: "Enviada", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  IN_PROGRESS: { label: "En proceso", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" },
  COMPLETED: { label: "Completada", color: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" },
};

export default function ClientBookingsList() {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingId, setPendingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!session?.user?.backendToken) {
      setLoading(false);
      return;
    }
    const data = await getMyBookings(session.user.backendToken);
    setBookings(data);
    setLoading(false);
  }, [session]);

  useEffect(() => {
    if (status === "authenticated") load();
    if (status === "unauthenticated") setLoading(false);
  }, [status, load]);

  async function confirmar(id: number) {
    if (!session?.user?.backendToken) return;
    setError(null);
    setPendingId(id);
    try {
      await confirmBookingCompletion(session.user.backendToken, id);
      await load();
    } catch {
      setError("No se pudo confirmar la finalización. Intentá de nuevo.");
    } finally {
      setPendingId(null);
    }
  }

  if (loading) return null;

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
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}
      {bookings.map((b) => {
        const cfg = ESTADO_LABEL[b.status];
        return (
          <div
            key={b.id}
            className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.color}`}>{cfg.label}</span>
              </div>
              {b.message && (
                <p className="text-sm text-zinc-600 dark:text-zinc-400">&ldquo;{b.message}&rdquo;</p>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {b.status === "IN_PROGRESS" && !b.clientConfirmedAt && (
                <button
                  onClick={() => confirmar(b.id)}
                  disabled={pendingId === b.id}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  Confirmar que se completó
                </button>
              )}
              {b.status === "IN_PROGRESS" && b.clientConfirmedAt && (
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Esperando confirmación del profesional</span>
              )}
              {b.status === "COMPLETED" && (
                <Link
                  href={`/professional/${b.professionalId}`}
                  className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  Ver profesional / dejar reseña
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
