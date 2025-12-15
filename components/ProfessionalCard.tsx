import Link from "next/link";
import { Professional } from "@/types";

interface ProfessionalCardProps {
  professional: Professional;
}

export default function ProfessionalCard({
  professional,
}: ProfessionalCardProps) {
  const availabilityConfig = {
    disponible: {
      color: "bg-green-500",
      text: "Disponible ahora",
      dot: "bg-green-500",
    },
    ocupado: {
      color: "bg-orange-500",
      text: "Ocupado",
      dot: "bg-orange-500",
    },
    "no-disponible": {
      color: "bg-red-500",
      text: "No disponible",
      dot: "bg-red-500",
    },
  };

  const config = availabilityConfig[professional.availability];

  return (
    <div className="group bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-2xl transition-all duration-300">
      {/* Header con estado */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-zinc-800 dark:to-zinc-800 px-5 py-3 border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              {config.text}
            </span>
          </div>
          {professional.verified && (
            <div className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-full">
              <span className="text-blue-600 dark:text-blue-400 text-xs">
                ✓
              </span>
              <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                Verificado
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-5">
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-zinc-800 dark:to-zinc-700 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-md">
            {professional.image}
          </div>

          {/* Info básica */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">
              {professional.name}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
              {professional.service}
            </p>

            {/* Rating y reseñas */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-lg">★</span>
                <span className="font-bold text-base">
                  {professional.rating}
                </span>
                <span className="text-xs text-zinc-500">
                  ({professional.reviewCount})
                </span>
              </div>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <span className="text-xs text-zinc-600 dark:text-zinc-400">
                {professional.experience} años
              </span>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">
          {professional.description}
        </p>

        {/* Ubicación y precio */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-xs">{professional.location}</span>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-zinc-900 dark:text-white">
              ${professional.hourlyRate.toLocaleString()}
            </div>
            <div className="text-xs text-zinc-500">por hora</div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex gap-2">
          <Link
            href={`/professional/${professional.id}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl font-semibold transition-colors shadow-md hover:shadow-lg"
          >
            Ver Perfil
          </Link>
          <button
            className="px-4 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors font-medium"
            title="Guardar en favoritos"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* Badge de respuesta rápida */}
        {professional.availability === "disponible" && (
          <div className="mt-3 flex items-center justify-center gap-1 text-xs text-green-700 dark:text-green-400">
            <span>⚡</span>
            <span>Responde en menos de 2 horas</span>
          </div>
        )}
      </div>
    </div>
  );
}


