"use client";

import { useState } from "react";
import ProfessionalCard from "@/components/ProfessionalCard";
import SearchBar from "@/components/SearchBar";
import { professionals } from "@/data/professionals";
import { services } from "@/data/services";
import Link from "next/link";

export default function ProfessionalsPage() {
  const [selectedService, setSelectedService] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProfessionals = professionals.filter((prof) => {
    const matchesService =
      selectedService === "all" || prof.serviceId === selectedService;
    const matchesSearch =
      prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesService && matchesSearch;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="text-sm text-zinc-500 mb-4">
            <Link
              href="/"
              className="hover:text-zinc-900 dark:hover:text-white"
            >
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-900 dark:text-white">
              Profesionales
            </span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-white">
            Encontrá tu Profesional
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">
            Explorá perfiles verificados, compará precios y elegí el mejor
            profesional para tu proyecto
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Buscar por nombre, servicio o ubicación..."
          />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">
            Filtrar por servicio:
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedService("all")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedService === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              Todos
            </button>
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedService === service.id
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {service.icon} {service.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-zinc-600 dark:text-zinc-400">
            {filteredProfessionals.length} profesionales encontrados
          </p>
        </div>

        {/* Professionals Grid */}
        {filteredProfessionals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProfessionals.map((professional) => (
              <ProfessionalCard
                key={professional.id}
                professional={professional}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">
              No se encontraron profesionales
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Intentá con otros filtros o términos de búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
