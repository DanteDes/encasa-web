import Link from "next/link";
import { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link href={`/services/${service.id}`} className="block group">
      <div className="relative bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:border-orange-500 dark:hover:border-orange-500 hover:shadow-xl hover:-translate-y-1">
        {/* Badge de disponibilidad */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-full">
            Disponibles
          </span>
        </div>

        {/* Icono */}
        <div
          className={`w-14 h-14 md:w-16 md:h-16 ${service.color} rounded-xl flex items-center justify-center text-3xl md:text-4xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}
        >
          {service.icon}
        </div>

        {/* Título */}
        <h3 className="text-lg md:text-xl font-bold mb-2 text-zinc-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
          {service.name}
        </h3>

        {/* Descripción */}
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
          {service.description}
        </p>

        {/* CTA */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-orange-500 dark:text-orange-400 group-hover:underline">
            Ver profesionales
          </span>
          <svg
            className="w-5 h-5 text-orange-500 dark:text-orange-400 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </Link>
  );
}


