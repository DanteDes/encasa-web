import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="mb-4">
              <Logo className="text-white" width={140} height={32} />
            </div>
            <p className="text-sm text-zinc-400">
              Conectamos a los mejores profesionales con quienes necesitan sus
              servicios.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Servicios</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-white transition-colors">Ver todos</Link></li>
              <li><Link href="/services/carpinteria" className="hover:text-white transition-colors">Carpintería</Link></li>
              <li><Link href="/services/electricidad" className="hover:text-white transition-colors">Electricidad</Link></li>
              <li><Link href="/services/plomeria" className="hover:text-white transition-colors">Plomería</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">Cómo funciona</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Sobre nosotros</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contacto</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="hover:text-white transition-colors">Términos y condiciones</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Política de privacidad</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">Centro de ayuda</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-8 pt-8 text-sm text-zinc-400 text-center">
          <p>&copy; 2024 EnCasa. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

