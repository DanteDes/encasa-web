import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y condiciones - EnCasa",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-white">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900 dark:text-white">Términos y condiciones</span>
        </nav>

        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">
          Términos y condiciones
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-10">
          Última actualización: junio de 2026
        </p>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">1. Aceptación de los términos</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Al acceder y utilizar EnCasa, aceptás estos términos y condiciones en su totalidad. Si no estás de acuerdo con alguna parte de estos términos, no debés utilizar nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">2. Descripción del servicio</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              EnCasa es una plataforma digital que conecta a usuarios con profesionales de servicios del hogar en Mar del Plata, Argentina. Actuamos como intermediarios y no somos parte de los contratos de servicio que se celebren entre usuarios y profesionales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">3. Registro de usuarios</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Para utilizar ciertas funciones de la plataforma, debés registrarte con una cuenta válida de Google. Sos responsable de mantener la confidencialidad de tu cuenta y de todas las actividades que ocurran bajo ella.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">4. Profesionales verificados</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              EnCasa realiza verificaciones básicas de los profesionales registrados. Sin embargo, no garantizamos la calidad, seguridad o legalidad de los servicios ofrecidos. Recomendamos siempre verificar credenciales y referencias antes de contratar.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">5. Limitación de responsabilidad</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              EnCasa no será responsable por daños directos, indirectos, incidentales o consecuentes que resulten del uso o la imposibilidad de usar la plataforma o los servicios contratados a través de ella.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">6. Modificaciones</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigencia al ser publicados en esta página. El uso continuado de la plataforma implica la aceptación de los nuevos términos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">7. Contacto</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Para consultas sobre estos términos, podés contactarnos a través de nuestra{" "}
              <Link href="/contact" className="text-blue-600 hover:underline">página de contacto</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
