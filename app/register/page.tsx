import { signIn } from "@/auth";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const error = searchParams.error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block mb-6">
            <Logo
              className="text-zinc-900 dark:text-white mx-auto"
              width={180}
              height={40}
            />
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-zinc-900 dark:text-white">
            Registrate como profesional
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Empezá a recibir solicitudes de trabajo hoy mismo
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-red-600 dark:text-red-400 text-xl">⚠️</span>
              <div>
                <h3 className="text-sm font-medium text-red-900 dark:text-red-400 mb-1">
                  Error de registro
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {error === "OAuthAccountNotLinked"
                    ? "Este email ya está registrado con otro método de autenticación."
                    : error === "AccessDenied"
                    ? "Acceso denegado. Por favor, intentá de nuevo."
                    : "Ocurrió un error al registrarte. Por favor, intentá de nuevo."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Register Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-lg">
          {/* Benefits */}
          <div className="mb-6 space-y-3">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">
              ¿Por qué unirte a EnCasa?
            </h3>
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Acceso a miles de clientes potenciales
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Gestión simple de solicitudes y trabajos
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Sistema de calificaciones y reseñas
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Pagos seguros y facturación automática
              </p>
            </div>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
            {/* Google Sign In */}
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/professional/setup" });
              }}
            >
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors font-medium text-zinc-900 dark:text-white"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continuar con Google
              </button>
            </form>
          </div>

          {/* Terms */}
          <p className="mt-6 text-xs text-center text-zinc-500 dark:text-zinc-400">
            Al registrarte, aceptás nuestros{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Términos de Servicio
            </Link>{" "}
            y{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Política de Privacidad
            </Link>
          </p>
        </div>

        {/* Sign In Link */}
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          ¿Ya tenés cuenta?{" "}
          <Link
            href="/auth/signin"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
