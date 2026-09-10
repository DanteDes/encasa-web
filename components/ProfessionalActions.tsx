"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import { createBooking } from "@/lib/api";

export default function ProfessionalActions({ id, name }: { id: number; name: string }) {
  const { data: session } = useSession();
  const [showContact, setShowContact] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const isProfessional = session?.user?.role === "professional";
  const token = session?.user?.backendToken;

  const waMessage = encodeURIComponent(`Hola, quiero contactar al profesional ${name} a través de EnCasa.`);

  async function enviarSolicitud() {
    if (!token) return;
    setSending(true);
    setSendError(null);
    try {
      await createBooking(token, id, message);
      setSent(true);
    } catch {
      setSendError("No se pudo enviar la solicitud. Probá de nuevo o escribí por WhatsApp.");
    } finally {
      setSending(false);
    }
  }

  if (isProfessional) return null;

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

            {sent ? (
              <p className="text-green-700 dark:text-green-400 mb-6">
                ¡Listo! Le avisamos a {name} de tu solicitud. Vas a poder calificarlo cuando el trabajo esté confirmado como completado.
              </p>
            ) : (
              <>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  {token
                    ? "Contale a " + name + " qué necesitás. Tu solicitud queda registrada en EnCasa."
                    : "Escribinos por WhatsApp y te conectamos directamente."}
                </p>

                {token && (
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ej: necesito revisar una instalación eléctrica..."
                    rows={3}
                    className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white mb-3"
                  />
                )}

                {!token && (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                    <Link href="/auth/signin" className="text-orange-600 dark:text-orange-400 hover:underline">
                      Iniciá sesión
                    </Link>{" "}
                    para que tu solicitud quede registrada y puedas calificar a {name} después.
                  </p>
                )}

                {sendError && <p className="text-sm text-red-600 dark:text-red-400 mb-3">{sendError}</p>}

                <div className="flex gap-3">
                  {token && (
                    <button
                      onClick={enviarSolicitud}
                      disabled={sending}
                      className="flex-1 bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50"
                    >
                      {sending ? "Enviando..." : "Enviar solicitud"}
                    </button>
                  )}
                  <a
                    href={`https://wa.me/5492235016610?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      token
                        ? "px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg text-center hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300 text-sm"
                        : "flex-1 bg-green-500 text-white px-4 py-3 rounded-lg text-center hover:bg-green-600 transition-colors font-medium"
                    }
                  >
                    {token ? "WhatsApp" : "Ir a WhatsApp"}
                  </a>
                </div>
              </>
            )}

            <button
              onClick={() => setShowContact(false)}
              className="w-full mt-3 px-4 py-2 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
