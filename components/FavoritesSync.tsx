"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { getFavorites } from "@/lib/api";
import { FAVORITES_EVENT } from "@/components/FavoriteButton";

const STORAGE_KEY = "encasa_favorites";

/**
 * Mounted once in the root layout so FavoriteButton's localStorage cache
 * reflects the real backend favorites as soon as there's a session — not
 * only after the user happens to visit /favorites first.
 */
export default function FavoritesSync() {
  const { data: session } = useSession();
  const token = session?.user?.backendToken;

  useEffect(() => {
    if (!token) return;
    getFavorites(token)
      .then((data) => {
        const ids = data.map((p) => p.id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
        window.dispatchEvent(new CustomEvent(FAVORITES_EVENT, { detail: ids }));
      })
      .catch(() => {
        // Backend unavailable — leave whatever's already in localStorage.
      });
  }, [token]);

  return null;
}
