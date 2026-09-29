"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getMyNotifications, markNotificationRead, markAllNotificationsRead } from "@/lib/api";
import type { AppNotification } from "@/types";

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Recién";
  if (mins < 60) return `Hace ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Hace ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Ayer";
  return `Hace ${days} días`;
}

function targetHref(n: AppNotification, isProfessional: boolean): string {
  switch (n.type) {
    case "NEW_BOOKING":
      return "/solicitudes";
    case "BOOKING_NEEDS_YOUR_CONFIRMATION":
      return isProfessional ? "/solicitudes" : "/mis-solicitudes";
    case "BOOKING_COMPLETED":
      return "/mis-solicitudes";
    case "REVIEW_RECEIVED":
      return "/professional/preview";
    default:
      return "/dashboard";
  }
}

export default function NotificationsBell() {
  const { data: session } = useSession();
  const token = session?.user?.backendToken;
  const isProfessional = session?.user?.role === "professional";
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!token) return;
    getMyNotifications(token).then(setNotifications).catch(() => {});
  }, [token]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!token) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  function toggleOpen() {
    setOpen((prev) => {
      const next = !prev;
      if (next && token) {
        getMyNotifications(token).then(setNotifications).catch(() => {});
      }
      return next;
    });
  }

  function handleSelect(n: AppNotification) {
    setOpen(false);
    if (n.read || !token) return;
    setNotifications((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
    markNotificationRead(n.id, token).catch(() => {});
  }

  function handleMarkAllRead() {
    if (!token) return;
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    markAllNotificationsRead(token).catch(() => {});
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={toggleOpen}
        className="relative p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        aria-label="Notificaciones"
      >
        <svg className="w-5 h-5 text-zinc-600 dark:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-30 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 sticky top-0 bg-white dark:bg-zinc-900">
            <span className="font-semibold text-sm text-zinc-900 dark:text-white">Notificaciones</span>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllRead} className="text-xs text-orange-500 hover:underline font-medium">
                Marcar todas como leídas
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <p className="text-sm text-zinc-500 text-center py-8 px-4">Todavía no tenés notificaciones.</p>
          ) : (
            <ul>
              {notifications.map((n) => (
                <li key={n.id}>
                  <Link
                    href={targetHref(n, isProfessional)}
                    onClick={() => handleSelect(n)}
                    className={`flex items-start gap-2 px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors ${
                      !n.read ? "bg-orange-50 dark:bg-orange-950/20" : ""
                    }`}
                  >
                    <span
                      className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${n.read ? "bg-transparent" : "bg-orange-500"}`}
                    />
                    <div>
                      <p className="text-sm text-zinc-800 dark:text-zinc-200">{n.message}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{timeAgo(n.createdAt)}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
