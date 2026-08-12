"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useToast } from "@/components/ToastProvider";

const CONTACTS_KEY = "encasa_client_contacts";
const REVIEWS_KEY = "encasa_reviews";
export const REVIEWS_EVENT = "encasa:review-added";

interface StoredReview {
  professionalId: number;
  rating: number;
  comment: string;
  date: string;
  userEmail: string;
}

function getContacts(): number[] {
  try {
    const raw = localStorage.getItem(CONTACTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function getReviews(): StoredReview[] {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveReview(review: StoredReview) {
  try {
    const reviews = getReviews();
    localStorage.setItem(REVIEWS_KEY, JSON.stringify([...reviews, review]));
    window.dispatchEvent(new CustomEvent(REVIEWS_EVENT, { detail: review }));
  } catch {}
}

export default function ReviewForm({ professionalId }: { professionalId: number }) {
  const { data: session } = useSession();
  const { showToast } = useToast();
  const [contacted, setContacted] = useState(false);
  const [existingReview, setExistingReview] = useState<StoredReview | null>(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [mounted, setMounted] = useState(false);

  const isProfessional = session?.user?.role === "professional";
  const userEmail = session?.user?.email ?? "";

  useEffect(() => {
    const contacts = getContacts();
    setContacted(contacts.includes(professionalId));

    const reviews = getReviews();
    const mine = reviews.find(
      (r) => r.professionalId === professionalId && r.userEmail === userEmail
    );
    if (mine) setExistingReview(mine);

    setMounted(true);
  }, [professionalId, userEmail]);

  if (isProfessional || !mounted) return null;

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

  if (!contacted) {
    return (
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 mt-6 text-center">
        <p className="text-zinc-500 text-sm">
          Para dejar una reseña, primero contactá al profesional desde esta página.
        </p>
      </div>
    );
  }

  if (existingReview) {
    return (
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 mt-6">
        <h3 className="font-semibold text-zinc-900 dark:text-white mb-3">Tu reseña</h3>
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className={s <= existingReview.rating ? "text-yellow-400" : "text-zinc-300 dark:text-zinc-600"}>
                ★
              </span>
            ))}
          </div>
          {existingReview.comment && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{existingReview.comment}</p>
          )}
        </div>
      </div>
    );
  }

  if (status === "success") {
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
    if (rating === 0) return;
    setStatus("loading");
    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ professionalId, rating, comment }),
      });
      saveReview({
        professionalId,
        rating,
        comment,
        date: new Date().toISOString(),
        userEmail,
      });
      setStatus("success");
      showToast("¡Reseña publicada! Gracias por tu opinión.", "info");
    } catch {
      setStatus("error");
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

        {status === "error" && (
          <p className="text-red-500 text-sm">Hubo un error al enviar tu reseña. Intentá de nuevo.</p>
        )}

        <button
          type="submit"
          disabled={rating === 0 || status === "loading"}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {status === "loading" ? "Enviando..." : "Publicar reseña"}
        </button>
      </form>
    </div>
  );
}
