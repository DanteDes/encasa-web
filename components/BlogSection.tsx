import Link from "next/link";

const posts = [
  {
    category: "Electricidad",
    categoryColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    emoji: "⚡",
    title: "5 señales de que necesitás llamar a un electricista urgente",
    excerpt:
      "Los problemas eléctricos pueden ser peligrosos. Conocé las señales de alerta antes de que sea demasiado tarde.",
    readTime: "3 min",
    slug: "senales-electricista-urgente",
  },
  {
    category: "Plomería",
    categoryColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    emoji: "🔧",
    title: "Cómo elegir el plomero adecuado para tu hogar",
    excerpt:
      "No todos los plomeros son iguales. Estos son los puntos clave para no arrepentirte de tu elección.",
    readTime: "4 min",
    slug: "elegir-plomero-hogar",
  },
  {
    category: "Mantenimiento",
    categoryColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    emoji: "🏠",
    title: "Mantenimiento preventivo del hogar: la guía completa",
    excerpt:
      "Evitá gastos grandes con pequeñas tareas durante el año. Un checklist por estación.",
    readTime: "5 min",
    slug: "mantenimiento-preventivo-hogar",
  },
];

export default function BlogSection() {
  return (
    <section className="py-16 md:py-20 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-2">
              Tips para tu hogar
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Consejos útiles de nuestros profesionales
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-orange-600 transition-colors"
          >
            Ver todos los artículos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Colored header */}
              <div className="h-36 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center text-6xl">
                {post.emoji}
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${post.categoryColor}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-zinc-400">{post.readTime} lectura</span>
                </div>

                <h3 className="font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex items-center text-sm font-medium text-orange-500 dark:text-orange-400 group-hover:gap-2 transition-all">
                  Leer artículo
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-orange-600"
          >
            Ver todos los artículos →
          </Link>
        </div>
      </div>
    </section>
  );
}
