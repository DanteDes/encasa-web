"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ProfessionalCard from "@/components/ProfessionalCard";
import { getFavorites } from "@/lib/api";
import { FAVORITES_EVENT } from "@/components/FavoriteButton";
import type { Professional } from "@/types";

const STORAGE_KEY = "encasa_favorites";

function getSavedIds(): number[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export default function FavoritesPage() {
  const { data: session, status } = useSession();
  const [favorites, setFavorites] = useState<Professional[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const token = session?.user?.backendToken;

    if (token) {
      setLoading(true);
      getFavorites(token)
        .then((data) => {
          setFavorites(data);
          // Seed localStorage so FavoriteButtons on other pages sync up
          const ids = data.map((p) => p.id);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
          window.dispatchEvent(new CustomEvent(FAVORITES_EVENT, { detail: ids }));
        })
        .catch(() => {
          // Backend unavailable — fall back to local IDs (no Professional data available)
          setFavorites([]);
        })
        .finally(() => setLoading(false));
    }
  }, [mounted, session?.user?.backendToken]);

  // Keep list in sync with FavoriteButton removals when using backend
  useEffect(() => {
    if (!session?.user?.backendToken) return;
    function onUpdate(e: Event) {
      const ids = (e as CustomEvent<number[]>).detail;
      setFavorites((prev) => prev.filter((p) => ids.includes(p.id)));
    }
    window.addEventListener(FAVORITES_EVENT, onUpdate);
    return () => window.removeEventListener(FAVORITES_EVENT, onUpdate);
  }, [session?.user?.backendToken]);

  if (!mounted || status === "loading") return null;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-white">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900 dark:text-white">Mis favoritos</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">
            Mis favoritos
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            {loading
              ? "Cargando..."
              : favorites.length > 0
              ? `${favorites.length} profesional${favorites.length !== 1 ? "es" : ""} guardado${favorites.length !== 1 ? "s" : ""}`
              : "Guardá profesionales para encontrarlos rápido"}
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 animate-pulse h-40" />
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl">
            <div className="text-6xl mb-4">🤍</div>
            <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white">
              Todavía no guardaste nadie
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm mx-auto">
              Hacé clic en el corazón de cualquier profesional para guardarlo acá.
            </p>
            <Link
              href="/professionals"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors font-semibold"
            >
              Explorar profesionales
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favorites.map((professional) => (
                <div key={professional.id} className="relative">
                  <ProfessionalCard professional={professional} />
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/professionals"
                className="text-sm text-orange-500 hover:text-orange-600 font-medium"
              >
                Explorar más profesionales →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
