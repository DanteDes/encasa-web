"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getClientBookings, getMyReviews } from "@/lib/api";

/**
 * Campanita del cliente: cuenta las solicitudes que necesitan su acción —
 * el profesional ya confirmó que terminó y falta que el cliente confirme
 * también, o el trabajo ya está completado y todavía no lo calificó.
 */
export default function ClientNotificationsBell() {
  const { data: session } = useSession();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const token = session?.user?.backendToken;
    if (!token) return;

    Promise.all([getClientBookings(token), getMyReviews(token)])
      .then(([bookings, reviews]) => {
        const reviewedBookingIds = new Set(reviews.map((r) => r.bookingId));

        const needsConfirmation = bookings.filter(
          (b) => b.status === "CONFIRMED" && !!b.professionalConfirmedAt && !b.clientConfirmedAt
        ).length;

        const readyToReview = bookings.filter(
          (b) => b.status === "COMPLETED" && !reviewedBookingIds.has(b.id)
        ).length;

        setCount(needsConfirmation + readyToReview);
      })
      .catch(() => setCount(0));
  }, [session?.user?.backendToken]);

  return (
    <Link
      href="/mis-solicitudes"
      className="relative p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      title={count > 0 ? `${count} solicitud${count !== 1 ? "es" : ""} necesitan tu atención` : "Mis solicitudes"}
    >
      <svg className="w-5 h-5 text-zinc-600 dark:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}
