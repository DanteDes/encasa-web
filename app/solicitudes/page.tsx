"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Estado = "nueva" | "en_proceso" | "completada";

interface Solicitud {
  id: string;
  clienteNombre: string;
  clienteEmail?: string;
  servicio: string;
  mensaje: string;
  fecha: string;
  estado: Estado;
}

const STORAGE_KEY = "encasa_solicitudes";

const MOCK_SOLICITUDES: Solicitud[] = [
  {
    id: "s1",
    clienteNombre: "María González",
    clienteEmail: "maria@gmail.com",
    servicio: "Electricidad",
    mensaje: "Hola, necesito revisar el tablero de luz de mi departamento. Hay un disyuntor que se dispara seguido. ¿Podés venir esta semana?",
    fecha: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    estado: "nueva",
  },
  {
    id: "s2",
    clienteNombre: "Lucas Fernández",
    clienteEmail: "lucas.f@hotmail.com",
    servicio: "Electricidad",
    mensaje: "Quiero instalar un aire acondicionado y necesito un electricista para la instalación del toma especial. ¿Tenés disponibilidad para el sábado?",
    fecha: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    estado: "en_proceso",
  },
  {
    id: "s3",
    clienteNombre: "Valeria Ramos",
    servicio: "Electricidad",
    mensaje: "Necesito cotización para cambiar toda la instalación eléctrica de una casa de 3 ambientes. Casa antigua, instalación de los 80s.",
    fecha: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    estado: "completada",
  },
];

const ESTADO_CONFIG: Record<Estado, { label: string; color: string; next?: Estado; nextLabel?: string }> = {
  nueva: {
    label: "Nueva",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    next: "en_proceso",
    nextLabel: "Marcar en proceso",
  },
  en_proceso: {
    label: "En proceso",
    color: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    next: "completada",
    nextLabel: "Marcar completada",
  },
  completada: {
    label: "Completada",
    color: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  },
};

function formatFecha(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `Hace ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Hace ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Ayer";
  return `Hace ${days} días`;
}

function loadSolicitudes(): Solicitud[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : MOCK_SOLICITUDES;
  } catch {
    return MOCK_SOLICITUDES;
  }
}

function saveSolicitudes(solicitudes: Solicitud[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(solicitudes));
}

type Filtro = "todas" | Estado;

export default function SolicitudesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/auth/signin");
    if (status === "authenticated" && session?.user?.role !== "professional") {
      router.replace("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    setSolicitudes(loadSolicitudes());
    setMounted(true);
  }, []);

  function cambiarEstado(id: string, nuevoEstado: Estado) {
    setSolicitudes((prev) => {
      const updated = prev.map((s) => s.id === id ? { ...s, estado: nuevoEstado } : s);
      saveSolicitudes(updated);
      return updated;
    });
  }

  if (!mounted || status === "loading") return null;

  const filtradas = filtro === "todas" ? solicitudes : solicitudes.filter((s) => s.estado === filtro);
  const counts = {
    todas: solicitudes.length,
    nueva: solicitudes.filter((s) => s.estado === "nueva").length,
    en_proceso: solicitudes.filter((s) => s.estado === "en_proceso").length,
    completada: solicitudes.filter((s) => s.estado === "completada").length,
  };

  const waNumber = "5492235016610";

  const filtros: { key: Filtro; label: string }[] = [
    { key: "todas", label: `Todas (${counts.todas})` },
    { key: "nueva", label: `Nuevas (${counts.nueva})` },
    { key: "en_proceso", label: `En proceso (${counts.en_proceso})` },
    { key: "completada", label: `Completadas (${counts.completada})` },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <nav className="text-sm text-zinc-500 mb-4">
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-900 dark:text-white">Solicitudes</span>
          </nav>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">Solicitudes recibidas</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            Clientes que te contactaron a través de la plataforma.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filtros.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFiltro(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtro === key
                  ? "bg-orange-500 text-white"
                  : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Lista */}
        {filtradas.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <div className="text-5xl mb-4">📭</div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
              No hay solicitudes {filtro !== "todas" ? `en este estado` : ""}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Cuando un cliente te contacte, aparecerá aquí.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtradas.map((s) => {
              const cfg = ESTADO_CONFIG[s.estado];
              return (
                <div
                  key={s.id}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {s.clienteNombre[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900 dark:text-white">{s.clienteNombre}</p>
                        <p className="text-xs text-zinc-500">{formatFecha(s.fecha)} · {s.servicio}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${cfg.color}`}>
                      {cfg.label}
                    </span>
                  </div>

                  {/* Mensaje */}
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 pl-13">
                    &ldquo;{s.mensaje}&rdquo;
                  </p>

                  {/* Acciones */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <a
                      href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hola ${s.clienteNombre}, te contacto por tu solicitud de ${s.servicio} en EnCasa.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Contactar
                    </a>
                    {cfg.next && (
                      <button
                        onClick={() => cambiarEstado(s.id, cfg.next!)}
                        className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg text-sm font-medium transition-colors"
                      >
                        {cfg.nextLabel}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
