"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProfessionalActivityEmpty() {
  const [profileComplete, setProfileComplete] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("encasa_prof_profile");
      const prof = raw ? JSON.parse(raw) : null;
      setProfileComplete(!!prof?.serviceId);
    } catch {
      setProfileComplete(false);
    }
  }, []);

  return (
    <div className="text-center py-10">
      <div className="text-6xl mb-4">📭</div>
      <p className="text-zinc-600 dark:text-zinc-400 mb-2">
        Todavía no recibiste solicitudes
      </p>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        {profileComplete
          ? "Cuando un cliente te contacte, las solicitudes aparecerán aquí."
          : "Completá tu perfil profesional para empezar a recibir solicitudes."}
      </p>
      {!profileComplete && (
        <Link
          href="/professional/setup"
          className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
        >
          Completar perfil
        </Link>
      )}
    </div>
  );
}
