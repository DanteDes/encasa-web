"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getProfessionalBookings, getMyProfessionalProfile } from "@/lib/api";

export default function ProfessionalStatsCards() {
  const { data: session } = useSession();
  const [pending, setPending] = useState<number | null>(null);
  const [completed, setCompleted] = useState<number | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [reviewCount, setReviewCount] = useState<number | null>(null);

  useEffect(() => {
    const token = session?.user?.backendToken;
    if (!token) return;

    getProfessionalBookings(token)
      .then((bookings) => {
        setPending(bookings.filter((b) => b.status === "PENDING").length);
        setCompleted(bookings.filter((b) => b.status === "COMPLETED").length);
      })
      .catch(() => {
        setPending(0);
        setCompleted(0);
      });

    getMyProfessionalProfile(token)
      .then((p) => {
        setRating(p.rating);
        setReviewCount(p.reviewCount);
      })
      .catch(() => {
        setRating(null);
        setReviewCount(null);
      });
  }, [session?.user?.backendToken]);

  return (
    <>
      <StatCard
        icon="📋"
        label="Solicitudes recibidas"
        value={pending === null ? "—" : String(pending)}
        sub="Sin confirmar"
      />
      <StatCard
        icon="✅"
        label="Trabajos completados"
        value={completed === null ? "—" : String(completed)}
        sub="En total"
      />
      <StatCard
        icon="⭐"
        label="Calificación promedio"
        value={reviewCount ? String(rating) : "—"}
        sub={reviewCount ? `${reviewCount} reseña${reviewCount !== 1 ? "s" : ""}` : "Sin reseñas aún"}
      />
    </>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: string;
  label: string;
  value: string;
  sub: string;
}) {
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
