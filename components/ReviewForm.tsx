"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/ToastProvider";
import { getClientBookings, createReview } from "@/lib/api";
import type { Booking } from "@/types";

export default function ReviewForm({
  professionalId,
  reviewedBookingIds,
}: {
  professionalId: number;
  reviewedBookingIds: number[];
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { showToast } = useToast();
  const [pendingBooking, setPendingBooking] = useState<Booking | null | undefined>(undefined);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const isProfessional = session?.user?.role === "professional";
  const token = session?.user?.backendToken;

  const loadPendingBooking = useCallback(async () => {
    if (!token) {
      setPendingBooking(null);
      return;
    }
    try {
      const bookings = await getClientBookings(token);
      const eligible = bookings.find(
        (b) =>
          b.professionalId === professionalId &&
          b.status === "COMPLETED" &&
          !reviewedBookingIds.includes(b.id)
      );
      setPendingBooking(eligible ?? null);
    } catch {
      setPendingBooking(null);
    }
  }, [token, professionalId, reviewedBookingIds]);

  useEffect(() => {
    if (status === "authenticated") loadPendingBooking();
    if (status === "unauthenticated") setPendingBooking(null);
  }, [status, loadPendingBooking]);

  if (isProfessional || pendingBooking === undefined) return null;

  if (!session?.user) {
    return (
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 mt-6 text-center">
        <p className="text-zinc-500 text-sm mb-3">¿Trabajaste con este profesional?</p>
        <Link
          href="/auth/signin"
          className="text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors"
        >
          Iniciá sesión para dejar una reseña →
        </Link>
      </div>
    );
  }

  // Sin una solicitud completada (y confirmada por las dos partes) todavía no
  // hay nada que reseñar — ver BOOKINGS_AND_REVIEWS.md sobre por qué el gate
  // es un booking real y no simplemente "haber contactado" al profesional.
  if (!pendingBooking) return null;

  if (submitStatus === "success") {
    return (
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 mt-6">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
          <p className="text-green-700 dark:text-green-400 font-semibold text-lg">¡Gracias por tu reseña!</p>
          <p className="text-green-600 dark:text-green-500 text-sm mt-1">
            Tu opinión ayuda a otros clientes a elegir mejor.
          </p>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0 || !pendingBooking || !token) return;
    setSubmitStatus("loading");
    try {
      await createReview({ bookingId: pendingBooking.id, rating, comment }, token);
      setSubmitStatus("success");
      showToast("¡Reseña publicada! Gracias por tu opinión.", "info");
      router.refresh();
    } catch {
      setSubmitStatus("error");
    }
  }

  return (
    <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 mt-6">
      <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">Dejá tu reseña</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Calificación</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="text-3xl transition-transform hover:scale-110"
              >
                <span className={(hover || rating) >= star ? "text-yellow-400" : "text-zinc-300 dark:text-zinc-600"}>
                  ★
                </span>
              </button>
            ))}
          </div>
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Contanos tu experiencia (opcional)"
          rows={4}
          className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        {submitStatus === "error" && (
          <p className="text-red-500 text-sm">Hubo un error al enviar tu reseña. Intentá de nuevo.</p>
        )}

        <button
          type="submit"
          disabled={rating === 0 || submitStatus === "loading"}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {submitStatus === "loading" ? "Enviando..." : "Publicar reseña"}
        </button>
      </form>
    </div>
  );
}
