"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getMyBookings, createReview } from "@/lib/api";

export default function LeaveReviewForm({
  professionalId,
  reviewedBookingIds,
}: {
  professionalId: number;
  reviewedBookingIds: number[];
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const load = useCallback(async () => {
    if (!session?.user?.backendToken) return;
    const bookings = await getMyBookings(session.user.backendToken);
    const pending = bookings.find(
      (b) =>
        b.professionalId === professionalId &&
        b.status === "COMPLETED" &&
        !reviewedBookingIds.includes(b.id)
    );
    setBookingId(pending ? pending.id : null);
  }, [session, professionalId, reviewedBookingIds]);

  useEffect(() => {
    if (status === "authenticated") load();
  }, [status, load]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!session?.user?.backendToken || bookingId === null) return;
    setSubmitting(true);
    setError(null);
    try {
      await createReview(session.user.backendToken, bookingId, rating, comment);
      setSent(true);
      router.refresh();
    } catch {
      setError("No se pudo enviar la reseña. Intentá de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  if (bookingId === null || sent) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 bg-zinc-50 dark:bg-zinc-800/50"
    >
      <h3 className="font-semibold text-zinc-900 dark:text-white mb-3">Dejá tu reseña</h3>

      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRating(n)}
            className={`text-2xl ${n <= rating ? "text-yellow-500" : "text-zinc-300 dark:text-zinc-600"}`}
            aria-label={`${n} estrellas`}
          >
            ⭐
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Contá cómo fue tu experiencia (opcional)"
        rows={3}
        className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white mb-3"
      />

      {error && <p className="text-sm text-red-600 dark:text-red-400 mb-3">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
      >
        {submitting ? "Enviando..." : "Enviar reseña"}
      </button>
    </form>
  );
}
