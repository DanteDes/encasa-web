"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getMyProfessionalProfile } from "@/lib/api";

export default function ProfessionalProfileBanner() {
  const { data: session } = useSession();
  const [complete, setComplete] = useState(true); // default true para no mostrar flash

  useEffect(() => {
    const token = session?.user?.backendToken;
    if (!token) return;
    getMyProfessionalProfile(token)
      .then((prof) => setComplete(!!prof.serviceId))
      .catch(() => setComplete(false));
  }, [session?.user?.backendToken]);

  if (complete) return null;

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-1">
            Completá tu perfil para recibir más consultas
          </h3>
          <p className="text-sm text-orange-700 dark:text-orange-300">
            Agregá tu servicio, tarifa, zona de trabajo y una buena descripción.
          </p>
        </div>
        <Link
          href="/professional/setup"
          className="shrink-0 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold text-sm transition-colors"
        >
          Completar ahora
        </Link>
      </div>
    </section>
  );
}
