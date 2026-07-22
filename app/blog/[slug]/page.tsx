import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPost, type BlogBlock } from "@/data/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — EnCasa`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt },
  };
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="text-2xl font-bold mt-10 mb-3 text-zinc-900 dark:text-white">{block.text}</h2>;
    case "p":
      return <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{block.text}</p>;
    case "ul":
      return (
        <ul className="space-y-2 my-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-2 text-zinc-600 dark:text-zinc-400">
              <span className="text-orange-500 mt-1 flex-shrink-0">•</span>
              {item}
            </li>
          ))}
        </ul>
      );
    case "tip":
      return (
        <div className="my-6 bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 rounded-xl px-5 py-4">
          <p className="text-sm text-orange-800 dark:text-orange-300 leading-relaxed">
            <span className="font-semibold">Consejo EnCasa: </span>{block.text}
          </p>
        </div>
      );
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900 dark:text-white">{post.category}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${post.categoryColor}`}>
              {post.category}
            </span>
            <span className="text-xs text-zinc-400">{post.readTime} lectura</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Hero emoji */}
        <div className="h-48 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 rounded-2xl flex items-center justify-center text-8xl mb-10">
          {post.emoji}
        </div>

        {/* Content */}
        <div className="space-y-5">
          {post.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        {/* Footer del artículo */}
        <div className="mt-14 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 text-center">
            <p className="font-semibold text-zinc-900 dark:text-white mb-2">
              ¿Necesitás un profesional?
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Encontrá el especialista ideal para tu hogar en Mar del Plata.
            </p>
            <Link
              href="/professionals"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors font-semibold"
            >
              Ver profesionales disponibles
            </Link>
          </div>
        </div>

        {/* Más artículos */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Más artículos</h3>
          <div className="space-y-3">
            {blogPosts
              .filter((p) => p.slug !== slug)
              .map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-orange-500 dark:hover:border-orange-500 transition-colors group"
                >
                  <span className="text-3xl flex-shrink-0">{p.emoji}</span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-orange-500 transition-colors">
                      {p.title}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">{p.readTime} lectura</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}
