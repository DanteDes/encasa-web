import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad - EnCasa",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-white">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900 dark:text-white">Política de privacidad</span>
        </nav>

        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">
          Política de privacidad
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-10">
          Última actualización: junio de 2026
        </p>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">1. Información que recopilamos</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Cuando te registrás en EnCasa mediante Google, recopilamos tu nombre, dirección de email e imagen de perfil pública. También podemos recopilar información que vos mismo proporcionás al completar tu perfil profesional.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">2. Cómo usamos tu información</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Utilizamos tu información para: operar y mejorar la plataforma, conectarte con profesionales o clientes, enviarte notificaciones relevantes sobre tus solicitudes, y cumplir con nuestras obligaciones legales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">3. Compartir información</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              No vendemos ni alquilamos tu información personal a terceros. Solo compartimos datos cuando es necesario para operar el servicio o cuando lo requiere la ley.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">4. Seguridad</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Implementamos medidas de seguridad razonables para proteger tu información. Sin embargo, ninguna transmisión por internet es 100% segura.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">5. Tus derechos</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Tenés derecho a acceder, corregir o eliminar tu información personal. Para ejercer estos derechos, contactanos a través de nuestra{" "}
              <Link href="/contact" className="text-blue-600 hover:underline">página de contacto</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">6. Cookies</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Utilizamos cookies esenciales para mantener tu sesión activa. No utilizamos cookies de seguimiento o publicidad de terceros.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">7. Contacto</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Para consultas sobre esta política de privacidad, podés contactarnos a través de nuestra{" "}
              <Link href="/contact" className="text-blue-600 hover:underline">página de contacto</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
