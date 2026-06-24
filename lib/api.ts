import { servicesMeta } from "./servicesMeta";
import type { Service, Professional, Review } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export async function apiFetch<T>(
  path: string,
  options: RequestInit & { token?: string } = {}
): Promise<T> {
  const { token, headers: extra, ...rest } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(extra as Record<string, string>),
  };

  const res = await fetch(`${BASE_URL}${path}`, { ...rest, headers });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// ── Safe server-side fetchers (never throw — return [] on failure) ──

export async function getServices(): Promise<Service[]> {
  try {
    const raw = await apiFetch<Array<{ id: string; name: string; description: string }>>(
      "/services"
    );
    return raw.map((s) => ({
      ...s,
      icon: servicesMeta[s.id]?.icon ?? "🔧",
      color: servicesMeta[s.id]?.color ?? "bg-zinc-500",
    }));
  } catch {
    return [];
  }
}

export async function getProfessionals(
  params?: Record<string, string>
): Promise<Professional[]> {
  try {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return await apiFetch<Professional[]>(`/professionals${query}`);
  } catch {
    return [];
  }
}

export async function getReviews(): Promise<Review[]> {
  try {
    return await apiFetch<Review[]>("/reviews");
  } catch {
    return [];
  }
}
