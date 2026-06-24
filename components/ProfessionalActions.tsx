"use client";

import { useState } from "react";

export default function ProfessionalActions({ name }: { name: string }) {
  const [saved, setSaved] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const waMessage = encodeURIComponent(`Hola, quiero contactar al profesional ${name} a través de EnCasa.`);

  return (
    <>
      <div className="flex gap-3">
        <button
          onClick={() => setShowContact(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Contactar
        </button>
        <button
          onClick={() => setSaved(!saved)}
          className={`border px-6 py-3 rounded-lg transition-colors font-medium ${
            saved
              ? "border-orange-500 text-orange-500 bg-orange-50 dark:bg-orange-950/20"
              : "border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
          }`}
        >
          {saved ? "Guardado ✓" : "Guardar"}
        </button>
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
              El sistema de mensajes está en desarrollo. Por ahora podés contactarnos
              por WhatsApp y te conectamos con el profesional.
            </p>
            <div className="flex gap-3">
              <a
                href={`https://wa.me/5492236000000?text=${waMessage}`}
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
