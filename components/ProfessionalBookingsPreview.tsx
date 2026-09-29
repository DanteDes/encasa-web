"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getProfessionalBookings } from "@/lib/api";
import type { Booking } from "@/types";

const STATUS: Record<Booking["status"], { label: string; color: string }> = {
  PENDING:   { label: "Nueva",      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  CONFIRMED: { label: "En proceso", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" },
  COMPLETED: { label: "Completada", color: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" },
  CANCELLED: { label: "Cancelada",  color: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400" },
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

export default function ProfessionalBookingsPreview() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.backendToken) return;
    getProfessionalBookings(session.user.backendToken)
      .then((data) => setBookings(data.slice(0, 4)))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [session?.user?.backendToken]);

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
            <div className="h-5 w-16 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="text-6xl mb-4">📋</div>
        <p className="text-zinc-600 dark:text-zinc-400 mb-2">Revisá tus solicitudes recibidas</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          Cuando un cliente te contacte, verás sus mensajes ahí.
        </p>
        <Link
          href="/solicitudes"
          className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
        >
          Ver solicitudes
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-3">
        {bookings.map((b) => {
          const cfg = STATUS[b.status];
          const clientName = (b as Booking & { clientName?: string }).clientName ?? "Cliente";
          const serviceName = (b as Booking & { serviceName?: string }).serviceName ?? b.serviceId;
          return (
            <div key={b.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {clientName[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">{clientName}</p>
                <p className="text-xs text-zinc-500 truncate">
                  {serviceName} · {formatFecha(b.createdAt)}
                </p>
                {b.notes && (
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate mt-0.5">
                    &ldquo;{b.notes}&rdquo;
                  </p>
                )}
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${cfg.color}`}>
                {cfg.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <Link
          href="/solicitudes"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm font-medium"
        >
          Ver todas las solicitudes
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
