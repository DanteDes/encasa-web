"use client";

import { useState, useEffect } from "react";
import { FAVORITES_EVENT } from "@/components/FavoriteButton";

const STORAGE_KEY_FAVORITES = "encasa_favorites";
const STORAGE_KEY_CONTACTS = "encasa_client_contacts";

function readCount(key: string): number {
  try {
    const raw = localStorage.getItem(key);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.length : 0;
  } catch {
    return 0;
  }
}

export default function ClientStatsCards() {
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [contactsCount, setContactsCount] = useState(0);

  useEffect(() => {
    setFavoritesCount(readCount(STORAGE_KEY_FAVORITES));
    setContactsCount(readCount(STORAGE_KEY_CONTACTS));

    const handleFavorites = (e: Event) => {
      setFavoritesCount((e as CustomEvent<number[]>).detail.length);
    };
    window.addEventListener(FAVORITES_EVENT, handleFavorites);
    return () => window.removeEventListener(FAVORITES_EVENT, handleFavorites);
  }, []);

  return (
    <>
      <StatCard
        icon="📅"
        label="Profesionales contactados"
        value={contactsCount > 0 ? String(contactsCount) : "0"}
        sub="En total"
      />
      <StatCard
        icon="❤️"
        label="Profesionales guardados"
        value={favoritesCount > 0 ? String(favoritesCount) : "0"}
        sub="En favoritos"
      />
    </>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: string;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{label}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-3xl font-bold text-zinc-900 dark:text-white">{value}</p>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{sub}</p>
    </div>
  );
}
