"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import FavoriteButton from "@/components/FavoriteButton";

export default function ProfessionalActions({ id, name }: { id: number; name: string }) {
  const { data: session } = useSession();
  const [showContact, setShowContact] = useState(false);
  const isProfessional = session?.user?.role === "professional";

  const waMessage = encodeURIComponent(`Hola, quiero contactar al profesional ${name} a través de EnCasa.`);

  return (
    <>
      <div className="flex gap-3">
        <button
          onClick={() => setShowContact(true)}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
        >
          Contactar
        </button>
        {session?.user && !isProfessional && <FavoriteButton id={id} />}
      </div>

      {showContact && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowContact(false)}
        >
          <div
            className="bg-white dark:bg-zinc-900 rounded-2xl p-8 max-w-sm w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">
              Contactar a {name}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              Escribinos por WhatsApp y te conectamos con {name} directamente.
              Respondemos en menos de 2 horas.
            </p>
            <div className="flex gap-3">
              <a
                href={`https://wa.me/5492235016610?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-500 text-white px-4 py-3 rounded-lg text-center hover:bg-green-600 transition-colors font-medium"
              >
                Ir a WhatsApp
              </a>
              <button
                onClick={() => setShowContact(false)}
                className="px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
