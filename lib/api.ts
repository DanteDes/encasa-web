import { servicesMeta } from "./servicesMeta";
import type { Service, Professional, Review } from "@/types";
import { services as mockServices } from "@/data/services";
import { professionals as mockProfessionals } from "@/data/professionals";

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

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2000);

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...rest,
      headers,
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `HTTP ${res.status}`);
    }

    if (res.status === 204) return undefined as T;
    return res.json() as Promise<T>;
  } finally {
    clearTimeout(timeout);
  }
}

// ── Safe server-side fetchers (fall back to mock data when backend is unavailable) ──

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
    return mockServices;
  }
}

export async function getProfessionals(
  params?: Record<string, string>
): Promise<Professional[]> {
  try {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return await apiFetch<Professional[]>(`/professionals${query}`);
  } catch {
    let result = mockProfessionals;
    if (params?.serviceId) {
      result = result.filter((p) => p.serviceId === params.serviceId);
    }
    if (params?.q) {
      const q = params.q.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.service.toLowerCase().includes(q) ||
          (p.location ?? "").toLowerCase().includes(q)
      );
    }
    return result;
  }
}

export async function getReviews(): Promise<Review[]> {
  try {
    return await apiFetch<Review[]>("/reviews");
  } catch {
    return [];
  }
}
