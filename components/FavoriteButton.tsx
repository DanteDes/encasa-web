"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "encasa_favorites";

function getFavorites(): number[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export const FAVORITES_EVENT = "encasa:favorites-updated";

function toggleFavorite(id: number): boolean {
  const favs = getFavorites();
  const idx = favs.indexOf(id);
  if (idx === -1) {
    favs.push(id);
  } else {
    favs.splice(idx, 1);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
  window.dispatchEvent(new CustomEvent(FAVORITES_EVENT, { detail: favs }));
  return idx === -1;
}

export default function FavoriteButton({ id }: { id: number }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (session?.user) setSaved(getFavorites().includes(id));
  }, [id, session]);

  function handleClick() {
    if (!session?.user) {
      router.push("/auth/signin");
      return;
    }
    const nowSaved = toggleFavorite(id);
    setSaved(nowSaved);
  }

  return (
    <button
      onClick={handleClick}
      title={session?.user ? (saved ? "Quitar de favoritos" : "Guardar en favoritos") : "Iniciá sesión para guardar favoritos"}
      className={`px-4 py-3 border-2 rounded-xl transition-colors font-medium ${
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
