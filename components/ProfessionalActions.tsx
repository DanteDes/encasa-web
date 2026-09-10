"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import FavoriteButton from "@/components/FavoriteButton";
import { createBooking } from "@/lib/api";

interface Props {
  id: number;
  name: string;
  phone: string | null;
  serviceId: string;
}

type Step = "idle" | "form" | "success" | "error";

function buildWaLink(phone: string, name: string, notes: string, date: string) {
  const formatted = new Date(date).toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const msg = `Hola ${name}! Te contacto por EnCasa. Acabo de enviarte una solicitud para el ${formatted}.\n\n${notes}`;
  return `https://wa.me/549${phone}?text=${encodeURIComponent(msg)}`;
}

export default function ProfessionalActions({ id, name, phone, serviceId }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const [step, setStep] = useState<Step>("idle");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submittedData, setSubmittedData] = useState<{ notes: string; date: string } | null>(null);

  const isProfessional = session?.user?.role === "professional";
  if (isProfessional) return null;

  function openModal() {
    if (!session?.user) {
      router.push("/auth/signin");
      return;
    }
    setStep("form");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!session?.user?.backendToken) {
      setErrorMsg("Necesitás estar autenticado para enviar una solicitud.");
      setStep("error");
      return;
    }

    const data = new FormData(e.currentTarget);
    const notes = (data.get("notes") as string).trim();
    const scheduledDate = data.get("scheduledDate") as string;
    const estimatedHoursRaw = data.get("estimatedHours") as string;
    const estimatedHours = estimatedHoursRaw ? parseInt(estimatedHoursRaw) : null;

    if (!notes) {
      setErrorMsg("Escribí un mensaje para el profesional.");
      return;
    }
    if (!scheduledDate) {
      setErrorMsg("Seleccioná una fecha.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      await createBooking(
        { professionalId: id, scheduledDate, estimatedHours, notes },
        session.user.backendToken
      );
      setSubmittedData({ notes, date: scheduledDate });
      setStep("success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al enviar la solicitud.";
      setErrorMsg(msg);
      setStep("error");
    } finally {
      setLoading(false);
    }
  }

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().slice(0, 16);

  const waDirectLink = phone
    ? `https://wa.me/549${phone}?text=${encodeURIComponent(`Hola ${name}! Te contacto desde EnCasa.`)}`
    : null;

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={openModal}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
        >
          Solicitar turno
        </button>
        {waDirectLink && (
          <a
            href={waDirectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        )}
        {session?.user && <FavoriteButton id={id} />}
      </div>

      {step !== "idle" && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setStep("idle")}
        >
          <div
            className="bg-white dark:bg-zinc-900 rounded-2xl p-8 max-w-md w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {step === "form" && (
              <>
                <h3 className="text-xl font-bold mb-1 text-zinc-900 dark:text-white">
                  Contactar a {name}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                  Completá los datos y te vamos a conectar directamente.
                </p>

                {errorMsg && (
                  <p className="mb-4 text-sm text-red-600 dark:text-red-400">{errorMsg}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      ¿Qué necesitás? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="notes"
                      rows={3}
                      required
                      placeholder="Describí brevemente el trabajo que necesitás..."
                      className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white resize-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Fecha y hora preferida <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="scheduledDate"
                      type="datetime-local"
                      required
                      min={minDateStr}
                      className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Horas estimadas (opcional)
                    </label>
                    <input
                      name="estimatedHours"
                      type="number"
                      min={1}
                      max={24}
                      placeholder="Ej: 2"
                      className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep("idle")}
                      className="flex-1 px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm font-medium"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-semibold disabled:opacity-50"
                    >
                      {loading ? "Enviando..." : "Enviar solicitud"}
                    </button>
                  </div>
                </form>
              </>
            )}

            {step === "success" && submittedData && (
              <>
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">✅</div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                    ¡Solicitud enviada!
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {name} va a ver tu pedido en la plataforma.
                    {phone
                      ? " También podés contactarlo directamente por WhatsApp."
                      : ""}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {phone && (
                    <a
                      href={buildWaLink(phone, name, submittedData.notes, submittedData.date)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Hablar con {name} por WhatsApp
                    </a>
                  )}
                  <button
                    onClick={() => setStep("idle")}
                    className="px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm font-medium"
                  >
                    Cerrar
                  </button>
                </div>
              </>
            )}

            {step === "error" && (
              <>
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">⚠️</div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                    No se pudo enviar
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{errorMsg}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("form")}
                    className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-semibold"
                  >
                    Reintentar
                  </button>
                  <button
                    onClick={() => setStep("idle")}
                    className="flex-1 px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm font-medium"
                  >
                    Cerrar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
