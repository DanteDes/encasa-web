import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog — Consejos para tu hogar | EnCasa",
  description: "Guías prácticas, consejos de mantenimiento y novedades de EnCasa. Todo lo que necesitás saber para mantener tu hogar en perfectas condiciones.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900 dark:text-white">Blog</span>
        </nav>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-3">
            Tips para tu hogar
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Consejos útiles de nuestros profesionales para que tu hogar funcione siempre bien.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:border-orange-500 dark:hover:border-orange-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
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
                <h2 className="font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm font-medium text-orange-500 dark:text-orange-400">
                  Leer artículo
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
