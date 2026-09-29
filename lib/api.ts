import { servicesMeta } from "./servicesMeta";
import type { Service, Professional, Review, Booking, AppNotification } from "@/types";
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
  const timeout = setTimeout(() => controller.abort(), 8000);

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
    const text = await res.text();
    return (text ? JSON.parse(text) : undefined) as T;
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

export async function createBooking(
  data: {
    professionalId: number;
    scheduledDate: string;
    estimatedHours?: number | null;
    notes?: string | null;
    photoUrls?: string[];
  },
  token: string
): Promise<Booking> {
  return apiFetch<Booking>("/bookings", {
    method: "POST",
    token,
    body: JSON.stringify(data),
  });
}

export async function getProfessionalBookings(token: string): Promise<Booking[]> {
  return apiFetch<Booking[]>("/bookings/professional", { token });
}

export async function getMyProfessionalProfile(token: string): Promise<Professional> {
  return apiFetch<Professional>("/professionals/me", { token });
}

export interface ProfessionalProfileInput {
  name: string;
  serviceId: string;
  hourlyRate: number | null;
  location: string | null;
  description: string | null;
  experience: string | null;
  availability: string;
  tags: string[];
  phone: string | null;
}

export async function createProfessionalProfile(
  data: ProfessionalProfileInput,
  token: string
): Promise<Professional> {
  return apiFetch<Professional>("/professionals/me", {
    method: "POST",
    token,
    body: JSON.stringify(data),
  });
}

export async function updateProfessionalProfile(
  data: ProfessionalProfileInput,
  token: string
): Promise<Professional> {
  return apiFetch<Professional>("/professionals/me", {
    method: "PUT",
    token,
    body: JSON.stringify(data),
  });
}

export async function getClientBookings(token: string): Promise<Booking[]> {
  return apiFetch<Booking[]>("/bookings/me", { token });
}

export async function updateBookingStatus(
  id: number,
  action: "confirm" | "complete" | "cancel",
  token: string
): Promise<Booking> {
  return apiFetch<Booking>(`/bookings/${id}/${action}`, {
    method: "PUT",
    token,
  });
}

export async function createReview(
  data: { bookingId: number; rating: number; comment?: string | null },
  token: string
): Promise<Review> {
  return apiFetch<Review>("/reviews", {
    method: "POST",
    token,
    body: JSON.stringify(data),
  });
}

export async function getMyReviews(token: string): Promise<Review[]> {
  return apiFetch<Review[]>("/reviews/me", { token });
}

export async function getProfessionalReviews(professionalId: number): Promise<Review[]> {
  return apiFetch<Review[]>(`/reviews/professional/${professionalId}`);
}

export async function getMyNotifications(token: string): Promise<AppNotification[]> {
  return apiFetch<AppNotification[]>("/notifications/me", { token });
}

export async function markNotificationRead(id: number, token: string): Promise<void> {
  return apiFetch<void>(`/notifications/${id}/read`, { method: "PATCH", token });
}

export async function markAllNotificationsRead(token: string): Promise<void> {
  return apiFetch<void>("/notifications/me/read-all", { method: "PATCH", token });
}

export async function getFavorites(token: string): Promise<Professional[]> {
  return apiFetch<Professional[]>("/users/me/favorites", { token });
}

export async function addFavorite(id: number, token: string): Promise<void> {
  return apiFetch<void>(`/users/me/favorites/${id}`, { method: "POST", token });
}

export async function removeFavorite(id: number, token: string): Promise<void> {
  return apiFetch<void>(`/users/me/favorites/${id}`, { method: "DELETE", token });
}
