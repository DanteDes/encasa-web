"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Logo from "./Logo";
import { getStoredAvatar, onAvatarUpdated } from "@/lib/avatar";

type AvailStatus = "disponible" | "ocupado" | "no-disponible";
const STATUS_DOT: Record<AvailStatus, string> = {
  "disponible": "bg-green-500",
  "ocupado": "bg-orange-500",
  "no-disponible": "bg-red-500",
};
const STATUS_LABEL: Record<AvailStatus, string> = {
  "disponible": "Disponible",
  "ocupado": "Ocupado",
  "no-disponible": "No disponible",
};

function readAvailability(): AvailStatus {
  try {
    const raw = localStorage.getItem("encasa_prof_profile");
    if (raw) return (JSON.parse(raw).availability as AvailStatus) ?? "disponible";
  } catch {}
  return "disponible";
}

function writeAvailability(s: AvailStatus) {
  try {
    const raw = localStorage.getItem("encasa_prof_profile");
    const p = raw ? JSON.parse(raw) : {};
    p.availability = s;
    localStorage.setItem("encasa_prof_profile", JSON.stringify(p));
  } catch {}
}

const navLink = "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm font-medium";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { data: session } = useSession();

  const isProfessional = session?.user?.role === "professional";
  const isLoggedIn = !!session?.user;
  const [customAvatar, setCustomAvatar] = useState<string | null>(null);
  const [availability, setAvailability] = useState<AvailStatus>("disponible");

  useEffect(() => {
    setCustomAvatar(getStoredAvatar());
    if (isProfessional) setAvailability(readAvailability());
    return onAvatarUpdated(setCustomAvatar);
  }, [isProfessional]);

  return (
    <nav className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          <Link href="/" className="flex items-center">
            <Logo className="text-zinc-900 dark:text-white" width={140} height={32} />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {isLoggedIn ? (
              <>
                {/* Links solo para logueados */}
                {isProfessional && (
                  <Link href="/" className={navLink}>Inicio</Link>
                )}
                <Link href="/services" className={navLink}>Servicios</Link>
                <Link href="/professionals" className={navLink}>Profesionales</Link>
                {!isProfessional && (
                  <Link href="/favorites" className={navLink}>Favoritos</Link>
                )}

                {/* Extras para profesionales */}
                {isProfessional && (
                  <>
                    <span className="w-px h-5 bg-zinc-200 dark:bg-zinc-700" />
                    <Link href="/dashboard" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm font-semibold">
                      Dashboard
                    </Link>
                    <Link href="/profile" className="border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-200 px-4 py-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm font-semibold">
                      Mi Perfil
                    </Link>
                  </>
                )}

                {/* Avatar + dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <div className="relative">
                      {customAvatar ?? session.user.image ? (
                        <img
                          src={customAvatar ?? session.user.image!}
                          alt={session.user.name ?? "User"}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-sm font-bold text-zinc-600 dark:text-zinc-300">
                          {session.user.name?.[0] ?? "U"}
                        </div>
                      )}
                      {isProfessional && (
                        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-zinc-900 ${STATUS_DOT[availability]}`} />
                      )}
                    </div>
                    <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isUserMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                      <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl py-1 z-20">
                        <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800 mb-1">
                          <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">{session.user.name}</p>
                          <p className="text-xs text-zinc-500 truncate">{session.user.email}</p>
                          <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                            isProfessional
                              ? "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300"
                              : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                          }`}>
                            {isProfessional ? "Profesional" : "Cliente"}
                          </span>
                        </div>
                        {/* Availability picker for professionals */}
                        {isProfessional && (
                          <div className="px-2 py-1 border-b border-zinc-100 dark:border-zinc-800 mb-1">
                            {(["disponible", "ocupado", "no-disponible"] as AvailStatus[]).map((s) => (
                              <button
                                key={s}
                                onClick={() => { setAvailability(s); writeAvailability(s); setIsUserMenuOpen(false); }}
                                className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-colors ${
                                  availability === s
                                    ? "bg-zinc-100 dark:bg-zinc-800"
                                    : "hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                }`}
                              >
                                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${STATUS_DOT[s]}`} />
                                <span className="text-zinc-700 dark:text-zinc-300">{STATUS_LABEL[s]}</span>
                                {availability === s && (
                                  <svg className="w-3.5 h-3.5 text-zinc-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                        <Link href="/settings" className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800" onClick={() => setIsUserMenuOpen(false)}>
                          Configuración
                        </Link>
                        <hr className="my-1 border-zinc-200 dark:border-zinc-800" />
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                        >
                          Cerrar sesión
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className={navLink}>Iniciar sesión</Link>
                <Link href="/register" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                  Registrarse
                </Link>
                <span className="w-px h-5 bg-zinc-200 dark:bg-zinc-700" />
                <Link href="/register" className={navLink}>
                  ¿Sos profesional?
                </Link>
              </>
            )}
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <svg className="w-6 h-6 text-zinc-700 dark:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-col gap-1">
              {isLoggedIn ? (
                <>
                  {/* User info */}
                  <div className="flex items-center gap-3 px-3 py-3 mb-1">
                    <div className="relative flex-shrink-0">
                      {customAvatar ?? session.user.image ? (
                        <img
                          src={customAvatar ?? session.user.image!}
                          alt={session.user.name ?? "User"}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-sm font-bold text-zinc-600 dark:text-zinc-300">
                          {session.user.name?.[0] ?? "U"}
                        </div>
                      )}
                      {isProfessional && (
                        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-zinc-900 ${STATUS_DOT[availability]}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">{session.user.name}</p>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                        isProfessional
                          ? "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300"
                          : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                      }`}>
                        {isProfessional ? "Profesional" : "Cliente"}
                      </span>
                    </div>
                  </div>

                  {/* Availability for professionals */}
                  {isProfessional && (
                    <div className="px-3 pb-2 mb-1">
                      <div className="flex gap-2">
                        {(["disponible", "ocupado", "no-disponible"] as AvailStatus[]).map((s) => (
                          <button
                            key={s}
                            onClick={() => { setAvailability(s); writeAvailability(s); }}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                              availability === s
                                ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-300"
                                : "border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300"
                            }`}
                          >
                            <span className={`w-2 h-2 rounded-full ${STATUS_DOT[s]}`} />
                            {STATUS_LABEL[s].split(" ")[0]}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <hr className="border-zinc-200 dark:border-zinc-800 mb-1" />

                  {/* Nav links */}
                  {isProfessional && (
                    <MobileLink href="/" onClick={() => setIsMenuOpen(false)}>Inicio</MobileLink>
                  )}
                  <MobileLink href="/services" onClick={() => setIsMenuOpen(false)}>Servicios</MobileLink>
                  <MobileLink href="/professionals" onClick={() => setIsMenuOpen(false)}>Profesionales</MobileLink>
                  {!isProfessional && (
                    <MobileLink href="/favorites" onClick={() => setIsMenuOpen(false)}>Favoritos</MobileLink>
                  )}

                  <hr className="border-zinc-200 dark:border-zinc-800 my-1" />

                  <MobileLink href="/profile" onClick={() => setIsMenuOpen(false)}>Mi perfil</MobileLink>
                  <MobileLink href="/settings" onClick={() => setIsMenuOpen(false)}>Configuración</MobileLink>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-left px-3 py-2.5 text-sm text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <MobileLink href="/auth/signin" onClick={() => setIsMenuOpen(false)}>Iniciar sesión</MobileLink>
                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="mx-1 bg-orange-500 text-white px-3 py-2.5 rounded-lg text-sm font-medium text-center hover:bg-orange-600 transition-colors"
                  >
                    Registrarse
                  </Link>
                  <hr className="border-zinc-200 dark:border-zinc-800 my-1" />
                  <MobileLink href="/register" onClick={() => setIsMenuOpen(false)}>¿Sos profesional?</MobileLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function MobileLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="px-3 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
    >
      {children}
    </Link>
  );
}
