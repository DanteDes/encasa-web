"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ToastProvider";
import { addFavorite, removeFavorite } from "@/lib/api";

const STORAGE_KEY = "encasa_favorites";

function getFavoriteIds(): number[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function setFavoriteIds(ids: number[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export const FAVORITES_EVENT = "encasa:favorites-updated";

export default function FavoriteButton({ id, name }: { id: number; name?: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { showToast } = useToast();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) setSaved(getFavoriteIds().includes(id));
  }, [id, session]);

  // Stay in sync when favorites page seeds localStorage
  useEffect(() => {
    function onUpdate(e: Event) {
      setSaved((e as CustomEvent<number[]>).detail.includes(id));
    }
    window.addEventListener(FAVORITES_EVENT, onUpdate);
    return () => window.removeEventListener(FAVORITES_EVENT, onUpdate);
  }, [id]);

  async function handleClick() {
    if (!session?.user) {
      router.push("/auth/signin");
      return;
    }

    const token = session.user.backendToken;
    const nowSaved = !saved;

    // Optimistic update
    setSaved(nowSaved);
    const ids = getFavoriteIds();
    const updatedIds = nowSaved ? [...ids, id] : ids.filter((i) => i !== id);
    setFavoriteIds(updatedIds);
    window.dispatchEvent(new CustomEvent(FAVORITES_EVENT, { detail: updatedIds }));

    if (nowSaved) {
      showToast(name ? `${name} agregado a favoritos` : "Agregado a favoritos", "success");
    } else {
      showToast(name ? `${name} eliminado de favoritos` : "Eliminado de favoritos", "remove");
    }

    if (!token) return;

    setLoading(true);
    try {
      if (nowSaved) {
        await addFavorite(id, token);
      } else {
        await removeFavorite(id, token);
      }
    } catch {
      // Rollback on failure
      setSaved(!nowSaved);
      const rolledBack = nowSaved ? ids.filter((i) => i !== id) : [...ids, id];
      setFavoriteIds(rolledBack);
      window.dispatchEvent(new CustomEvent(FAVORITES_EVENT, { detail: rolledBack }));
      showToast("No se pudo actualizar el favorito", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      title={session?.user ? (saved ? "Quitar de favoritos" : "Guardar en favoritos") : "Iniciá sesión para guardar favoritos"}
      className={`px-4 py-3 border-2 rounded-xl transition-colors font-medium disabled:opacity-60 ${
        saved
          ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20 text-orange-500"
          : "border-orange-500 text-orange-500 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/20"
      }`}
    >
      <svg
        className="w-5 h-5"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
