import { auth } from "@/auth";
import Link from "next/link";

interface UserMenuProps {
  className?: string;
}

export default async function UserMenu({ className = "" }: UserMenuProps) {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <Link
          href="/auth/signin"
          className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          Iniciar Sesión
        </Link>
        <Link
          href="/register"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Registrarse
        </Link>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center gap-2">
        {session.user.image && (
          <img
            src={session.user.image}
            alt={session.user.name || "User"}
            className="w-8 h-8 rounded-full"
          />
        )}
        <span className="text-sm font-medium text-zinc-900 dark:text-white hidden md:block">
          {session.user.name}
        </span>
      </div>
    </div>
  );
}

