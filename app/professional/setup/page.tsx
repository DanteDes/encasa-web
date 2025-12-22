import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";

export default async function ProfessionalSetupPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Logo
              className="text-zinc-900 dark:text-white mx-auto"
              width={180}
              height={40}
            />
          </Link>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Completá tu perfil profesional
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Solo te tomará unos minutos configurar tu perfil
          </p>
        </div>

        {/* Setup Form */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-lg">
          {/* Información del usuario */}
          <div className="mb-8 pb-8 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-4">
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-20 h-20 rounded-full"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  {session.user.name}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {session.user.email}
                </p>
              </div>
            </div>
          </div>

          <form className="space-y-6">
            {/* Nombre del negocio */}
            <div>
              <label
                htmlFor="businessName"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Nombre del negocio o profesional
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                placeholder="Ej: Electricidad López"
                className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
              />
            </div>

            {/* Servicios */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Servicios que ofrecés
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Electricista",
                  "Plomero",
                  "Carpintero",
                  "Pintor",
                  "Gasista",
                  "Albañil",
                  "Jardinero",
                  "Cerrajero",
                ].map((service) => (
                  <label
                    key={service}
                    className="flex items-center gap-2 p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    <input
                      type="checkbox"
                      name="services"
                      value={service.toLowerCase()}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-zinc-900 dark:text-white">
                      {service}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Años de experiencia */}
            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Años de experiencia
              </label>
              <select
                id="experience"
                name="experience"
                className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
              >
                <option value="">Seleccioná tu experiencia</option>
                <option value="0-2">Menos de 2 años</option>
                <option value="2-5">2-5 años</option>
                <option value="5-10">5-10 años</option>
                <option value="10+">Más de 10 años</option>
              </select>
            </div>

            {/* Teléfono */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Teléfono de contacto
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Ej: 223-123-4567"
                className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
              />
            </div>

            {/* Zona de trabajo */}
            <div>
              <label
                htmlFor="workArea"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Zona de trabajo
              </label>
              <input
                id="workArea"
                name="workArea"
                type="text"
                placeholder="Ej: Mar del Plata y alrededores"
                className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
              />
            </div>

            {/* Descripción */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Descripción de tus servicios
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Contanos sobre tu experiencia, especialidades y por qué los clientes deberían elegirte..."
                className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white resize-none"
              />
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <Link
                href="/"
                className="flex-1 px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-center font-medium"
              >
                Completar más tarde
              </Link>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Guardar y continuar
              </button>
            </div>
          </form>
        </div>

        {/* Info adicional */}
        <div className="mt-8 text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Después de completar tu perfil, podrás empezar a recibir solicitudes
            de trabajo.
          </p>
        </div>
      </div>
    </div>
  );
}






