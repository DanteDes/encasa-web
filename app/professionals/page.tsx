"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProfessionalCard from "@/components/ProfessionalCard";
import SearchBar from "@/components/SearchBar";
import { getProfessionals, getServices } from "@/lib/api";
import type { Professional, Service } from "@/types";
import Link from "next/link";
import ProfessionalCardSkeleton from "@/components/ProfessionalCardSkeleton";
import { useSession } from "next-auth/react";

function ProfessionalsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const isProfessional = session?.user?.role === "professional";
  const [all, setAll] = useState<Professional[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string>(searchParams.get("service") ?? "all");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState<"default" | "rating" | "price_asc" | "price_desc">("default");

  useEffect(() => {
    Promise.all([getProfessionals(), getServices()])
      .then(([profs, svcs]) => {
        setAll(profs);
        setServices(svcs);
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Error al cargar profesionales")
      )
      .finally(() => setLoading(false));
  }, []);

  let filtered = all.filter((p) => {
    const matchesService = selectedService === "all" || p.serviceId === selectedService;
    const matchesAvailable = !onlyAvailable || p.availability === "disponible";
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.service.toLowerCase().includes(q) ||
      (p.location ?? "").toLowerCase().includes(q) ||
      (p.description ?? "").toLowerCase().includes(q);
    return matchesService && matchesSearch && matchesAvailable;
  });

  if (sortBy === "rating") {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "price_asc") {
    filtered = [...filtered].sort((a, b) => (a.hourlyRate ?? Infinity) - (b.hourlyRate ?? Infinity));
  } else if (sortBy === "price_desc") {
    filtered = [...filtered].sort((a, b) => (b.hourlyRate ?? 0) - (a.hourlyRate ?? 0));
  }

  function selectService(id: string) {
    setSelectedService(id);
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") params.delete("service");
    else params.set("service", id);
    router.replace(`/professionals?${params.toString()}`, { scroll: false });
  }

  const activeBtn = "bg-orange-500 text-white";
  const inactiveBtn = "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700";

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <nav className="text-sm text-zinc-500 mb-4">
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-white">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-900 dark:text-white">Profesionales</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-white">
            {isProfessional ? "Profesionales disponibles" : "Encontrá tu Profesional"}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">
            {isProfessional
              ? "Consultá precios, servicios y calificaciones de otros profesionales de la plataforma."
              : "Explorá perfiles verificados, compará precios y elegí el mejor profesional para tu proyecto"}
          </p>
        </div>

        {/* Search — live filtering */}
        <div className="mb-8">
          <SearchBar
            onSearch={setSearchQuery}
            initialValue={searchQuery}
            placeholder="Buscar por nombre, servicio o ubicación..."
          />
        </div>

        {/* Service filters */}
        {services.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">
              Filtrar por servicio:
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => selectService("all")}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${selectedService === "all" ? activeBtn : inactiveBtn}`}
              >
                Todos
              </button>
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => selectService(service.id)}
                  className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${selectedService === service.id ? activeBtn : inactiveBtn}`}
                >
                  {service.icon} {service.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Availability + sort controls */}
        {!loading && !error && (
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <button
              onClick={() => setOnlyAvailable(!onlyAvailable)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                onlyAvailable
                  ? "bg-green-500 text-white border-green-500"
                  : "border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-500 bg-white dark:bg-zinc-900"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${onlyAvailable ? "bg-white" : "bg-green-500"}`} />
              Solo disponibles
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2 rounded-lg text-sm border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
            >
              <option value="default">Ordenar por</option>
              <option value="rating">Mejor calificación</option>
              <option value="price_asc">Menor precio</option>
              <option value="price_desc">Mayor precio</option>
            </select>

            <p className="text-zinc-500 dark:text-zinc-400 text-sm ml-auto">
              {filtered.length} profesional{filtered.length !== 1 ? "es" : ""}
              {searchQuery && <span className="ml-1">para <strong>&ldquo;{searchQuery}&rdquo;</strong></span>}
            </p>
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <ProfessionalCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">
              No se pudo conectar al servidor
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-2">
              Estamos teniendo problemas para conectar con el servidor. Intentá de nuevo en unos minutos.
            </p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((professional) => (
              <ProfessionalCard key={professional.id} professional={professional} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">
              No se encontraron profesionales
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Intentá con otros términos o cambiá el filtro de servicio
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-sm text-orange-500 hover:underline"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProfessionalsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
              {[...Array(4)].map((_, i) => (
                <ProfessionalCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ProfessionalsContent />
    </Suspense>
  );
}
