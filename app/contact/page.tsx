import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto - EnCasa",
  description: "Contactanos para cualquier consulta sobre EnCasa.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-white">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900 dark:text-white">Contacto</span>
        </nav>

        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Contacto</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-12 text-lg">
          Estamos para ayudarte. Elegí la forma de contacto que más te convenga.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <a
            href="https://wa.me/5492236000000"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 hover:border-green-400 dark:hover:border-green-600 transition-colors group"
          >
            <div className="text-4xl mb-4">💬</div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
              WhatsApp
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              Respondemos en menos de 2 horas en días hábiles.
            </p>
          </a>

          <a
            href="https://instagram.com/encasa.app"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 hover:border-pink-400 dark:hover:border-pink-600 transition-colors group"
          >
            <div className="text-4xl mb-4">📸</div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
              Instagram
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              Seguinos y mandanos un mensaje directo.
            </p>
          </a>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
            ¿Sos un profesional y querés sumarte?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Registrate en la plataforma y empezá a recibir solicitudes de clientes en Mar del Plata.
          </p>
          <Link
            href="/register"
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Registrarme como profesional
          </Link>
        </div>
      </div>
    </div>
  );
}
