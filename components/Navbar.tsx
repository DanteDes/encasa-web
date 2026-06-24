"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Logo from "./Logo";

const navLink = "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm font-medium";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { data: session } = useSession();

  const isProfessional = session?.user?.role === "professional";

  return (
    <nav className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          <Link href="/" className="flex items-center">
            <Logo className="text-zinc-900 dark:text-white" width={140} height={32} />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {/* Logged-in nav */}
            {session?.user && (
              isProfessional ? (
                <>
                  <Link href="/dashboard" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm font-semibold">
                    Dashboard
                  </Link>
                  <Link href="/profile" className="border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-200 px-4 py-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm font-semibold">
                    Mi Perfil
                  </Link>
                  <span className="w-px h-5 bg-zinc-200 dark:bg-zinc-700" />
                  <Link href="/services" className={navLink}>Servicios</Link>
                  <Link href="/professionals" className={navLink}>Profesionales</Link>
                </>
              ) : (
                <>
                  <Link href="/services" className={navLink}>Servicios</Link>
                  <Link href="/professionals" className={navLink}>Profesionales</Link>
                </>
              )
            )}

            {/* User avatar + dropdown */}
            {session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name ?? "User"}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-sm font-bold text-zinc-600 dark:text-zinc-300">
                      {session.user.name?.[0] ?? "U"}
                    </div>
                  )}
                  <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isUserMenuOpen && (
                  <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl py-1 z-20">
                      <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800 mb-1">
                        <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">{session.user.name}</p>
                        <p className="text-xs text-zinc-500 truncate">{session.user.email}</p>
                        <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                          isProfessional
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                            : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                        }`}>
                          {isProfessional ? "Profesional" : "Cliente"}
                        </span>
                      </div>
                      <Link href="/dashboard" className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800" onClick={() => setIsUserMenuOpen(false)}>
                        Dashboard
                      </Link>
                      <Link href="/profile" className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800" onClick={() => setIsUserMenuOpen(false)}>
                        Mi Perfil
                      </Link>
                      <Link href="/settings" className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800" onClick={() => setIsUserMenuOpen(false)}>
                        Configuración
                      </Link>
                      <hr className="my-1 border-zinc-200 dark:border-zinc-800" />
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/signin" className={navLink}>Iniciar Sesión</Link>
                <Link href="/register" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                  Registrarse
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
              {session?.user && isProfessional && (
                <>
                  <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="bg-orange-500 text-white px-4 py-3 rounded-lg text-sm font-semibold text-center hover:bg-orange-600 transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-200 px-4 py-3 rounded-lg text-sm font-semibold text-center hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                    Mi Perfil
                  </Link>
                  <hr className="border-zinc-200 dark:border-zinc-700" />
                </>
              )}

              {session?.user && (
                <>
                  <MobileLink href="/services" onClick={() => setIsMenuOpen(false)}>Servicios</MobileLink>
                  <MobileLink href="/professionals" onClick={() => setIsMenuOpen(false)}>Profesionales</MobileLink>
                </>
              )}

              {session?.user ? (
                <>
                  {/* User info */}
                  <hr className="border-zinc-200 dark:border-zinc-800 my-1" />
                  <div className="flex items-center gap-3 px-2 py-2">
                    {session.user.image ? (
                      <img src={session.user.image} alt={session.user.name ?? "User"} className="w-8 h-8 rounded-full" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-sm font-bold">
                        {session.user.name?.[0] ?? "U"}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">{session.user.name}</p>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                        isProfessional
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                          : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                      }`}>
                        {isProfessional ? "Profesional" : "Cliente"}
                      </span>
                    </div>
                  </div>
                  {!isProfessional && (
                    <MobileLink href="/profile" onClick={() => setIsMenuOpen(false)}>Mi Perfil</MobileLink>
                  )}
                  <MobileLink href="/settings" onClick={() => setIsMenuOpen(false)}>Configuración</MobileLink>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-left px-3 py-2.5 text-sm text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <hr className="border-zinc-200 dark:border-zinc-800 my-1" />
                  <MobileLink href="/auth/signin" onClick={() => setIsMenuOpen(false)}>Iniciar Sesión</MobileLink>
                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-1 bg-orange-500 text-white px-3 py-2.5 rounded-lg text-sm font-medium text-center hover:bg-orange-600 transition-colors"
                  >
                    Registrarse
                  </Link>
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
