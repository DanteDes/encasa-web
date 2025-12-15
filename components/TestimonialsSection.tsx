"use client";

import { useState, useEffect } from "react";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
    <section className="py-16 md:py-20 bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900 px-4 py-2 rounded-full mb-4">
            <span className="text-yellow-600 dark:text-yellow-300">★★★★★</span>
            <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              4.9 de 5 estrellas
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-zinc-900 dark:text-white">
            Más de 850 vecinos de Mar del Plata
            <br />
            ya encontraron su profesional
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Reseñas 100% reales de clientes verificados
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-zinc-950 rounded-2xl p-6 border-2 border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-xl"
              style={{
                animation: `fadeIn 0.5s ease-in ${index * 0.1}s`,
              }}
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-lg">
                    ★
                  </span>
                ))}
              </div>

              {/* Comment */}
              <p className="text-zinc-700 dark:text-zinc-300 mb-4 text-sm leading-relaxed">
                "{testimonial.comment}"
              </p>

              {/* Author info */}
              <div className="flex items-start justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {testimonial.location} • {testimonial.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    Contrató a:
                  </p>
                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    {testimonial.professionalName}
                  </p>
                </div>
              </div>

              {/* Service badge */}
              <div className="mt-3">
                <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                  {testimonial.service}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-blue-600 w-8"
                  : "bg-zinc-300 dark:bg-zinc-700"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Trust badge */}
        <div className="mt-12 text-center">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            Todas las reseñas son verificadas. Solo pueden calificar clientes
            que contrataron.
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Identidad verificada
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Solo clientes reales
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📝</span>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Trabajo completado
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

