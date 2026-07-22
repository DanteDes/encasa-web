"use client";

import { useState, useEffect } from "react";
import { testimonials as mockTestimonials } from "@/data/testimonials";
import type { Testimonial } from "@/data/testimonials";

export default function TestimonialsSection() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Future: fetch curated testimonials from API, fall back to static
    setItems(mockTestimonials);
  }, []);

  useEffect(() => {
    if (items.length < 2) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  if (items.length === 0) return null;

  const visible = [
    items[currentIndex % items.length],
    items[(currentIndex + 1) % items.length],
    items[(currentIndex + 2) % items.length],
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
          {visible.map((item, index) => (
            <div
              key={item.id}
              className="bg-white dark:bg-zinc-950 rounded-2xl p-6 border-2 border-zinc-200 dark:border-zinc-800 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 hover:shadow-xl flex flex-col"
              style={{ animation: `fadeIn 0.5s ease-in ${index * 0.1}s` }}
            >
              {/* Stars + Servicio */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(item.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-lg">★</span>
                  ))}
                </div>
                <span className="text-xs font-medium bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 px-2.5 py-1 rounded-full">
                  {item.service}
                </span>
              </div>

              {/* Comment */}
              <p className="text-zinc-700 dark:text-zinc-300 mb-4 text-sm leading-relaxed flex-1">
                &ldquo;{item.comment}&rdquo;
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {item.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-zinc-500 truncate">
                      {item.location} · {item.date}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
                  Trabajó con <span className="font-medium text-zinc-600 dark:text-zinc-400">{item.professionalName}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Indicators */}
        {items.length > 1 && (
          <div className="flex justify-center gap-2">
            {items.map((_, index) => (
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
