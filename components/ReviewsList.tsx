import type { Review } from "@/types";

function formatDate(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Hoy";
  if (days === 1) return "Hace 1 día";
  if (days < 7) return `Hace ${days} días`;
  if (days < 14) return "Hace 1 semana";
  if (days < 30) return `Hace ${Math.floor(days / 7)} semanas`;
  if (days < 60) return "Hace 1 mes";
  return `Hace ${Math.floor(days / 30)} meses`;
}

export default function ReviewsList({ serverReviews }: { serverReviews: Review[] }) {
  if (serverReviews.length === 0) {
    return (
      <p className="text-zinc-500 text-center py-8">
        Todavía no hay reseñas para este profesional.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {serverReviews.map((review) => (
        <div
          key={review.id}
          className="border-b border-zinc-200 dark:border-zinc-800 pb-6 last:border-0"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-zinc-200 dark:bg-zinc-700 rounded-full flex items-center justify-center text-sm font-semibold">
                C
              </div>
              <div>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  Cliente verificado
                </p>
                <p className="text-sm text-zinc-500">{formatDate(review.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(review.rating)].map((_, i) => (
                <span key={i} className="text-yellow-500">
                  ⭐
                </span>
              ))}
            </div>
          </div>
          {review.comment && (
            <p className="text-zinc-600 dark:text-zinc-400">{review.comment}</p>
          )}
        </div>
      ))}
    </div>
  );
}
