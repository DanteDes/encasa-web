import Link from "next/link";
import Logo from "./Logo";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* Brand + newsletter — takes 2 cols */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <div className="mb-3">
                <Logo className="text-white" width={140} height={32} />
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Conectamos a los mejores profesionales con quienes necesitan sus
                servicios en Mar del Plata.
              </p>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-semibold mb-1 text-sm">
                Tips y novedades para tu hogar
              </h4>
              <p className="text-xs text-zinc-500 mb-3">
                Recibí consejos de mantenimiento y ofertas exclusivas.
              </p>
              <NewsletterForm />
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              Servicios
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/services" className="hover:text-white transition-colors">Ver todos</Link></li>
              <li><Link href="/services/electricidad" className="hover:text-white transition-colors">Electricidad</Link></li>
              <li><Link href="/services/plomeria" className="hover:text-white transition-colors">Plomería</Link></li>
              <li><Link href="/services/carpinteria" className="hover:text-white transition-colors">Carpintería</Link></li>
              <li><Link href="/services/pintura" className="hover:text-white transition-colors">Pintura</Link></li>
              <li><Link href="/services/limpieza" className="hover:text-white transition-colors">Limpieza</Link></li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              Empresa
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">Cómo funciona</Link></li>
              <li><Link href="/professionals" className="hover:text-white transition-colors">Profesionales</Link></li>
              <li><Link href="/register" className="hover:text-white transition-colors">Registrarse</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/terms" className="hover:text-white transition-colors">Términos y condiciones</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Política de privacidad</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">Centro de ayuda</Link></li>
            </ul>

            {/* Social */}
            <div className="mt-6">
              <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
                Seguinos
              </h3>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/encasa.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-sm"
                  aria-label="Instagram"
                >
                  📸
                </a>
                <a
                  href="https://wa.me/5492236000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-sm"
                  aria-label="WhatsApp"
                >
                  💬
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800 py-5 text-center text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} EnCasa. Todos los derechos reservados. · Mar del Plata, Argentina</p>
      </div>
    </footer>
  );
}
