"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { Review } from "@/types";

function formatDate(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Hoy";
  if (days === 1) return "Hace 1 día";
  if (days < 30) return `Hace ${Math.floor(days / 7) || 1} semana${days >= 14 ? "s" : ""}`;
  if (days < 60) return "Hace 1 mes";
  return `Hace ${Math.floor(days / 30)} meses`;
}

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<Review[]>("/reviews")
      .then(setReviews)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (reviews.length < 2) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) return null;

  const visible = [
    reviews[currentIndex % reviews.length],
    reviews[(currentIndex + 1) % reviews.length],
    reviews[(currentIndex + 2) % reviews.length],
  ].filter(Boolean);

  return (
    <section className="py-16 md:py-20 bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-full mb-4">
            <span className="text-orange-500 dark:text-orange-300">★★★★★</span>
            <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
              Reseñas verificadas
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-zinc-900 dark:text-white">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Reseñas 100% reales de clientes verificados
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {visible.map((review, index) => (
            <div
              key={review.id}
              className="bg-white dark:bg-zinc-950 rounded-2xl p-6 border-2 border-zinc-200 dark:border-zinc-800 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 hover:shadow-xl"
              style={{ animation: `fadeIn 0.5s ease-in ${index * 0.1}s` }}
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-lg">★</span>
                ))}
              </div>

              {/* Comment */}
              <p className="text-zinc-700 dark:text-zinc-300 mb-4 text-sm leading-relaxed">
                "{review.comment ?? "Excelente servicio."}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 text-sm font-bold">
                    C
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                      Cliente verificado
                    </p>
                    <p className="text-xs text-zinc-500">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicators */}
        {reviews.length > 1 && (
          <div className="flex justify-center gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-orange-500 w-8"
                    : "bg-zinc-300 dark:bg-zinc-700 w-2"
                }`}
                aria-label={`Ir a reseña ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Trust */}
        <div className="mt-10 text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
            Todas las reseñas son verificadas. Solo pueden calificar clientes que contrataron.
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {[
              { icon: "✓", label: "Identidad verificada" },
              { icon: "⭐", label: "Solo clientes reales" },
              { icon: "📝", label: "Trabajo completado" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="text-xl">{icon}</span>
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
