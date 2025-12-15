# EnCasa - Plataforma de Servicios Domésticos 🏠

Una plataforma moderna para conectar profesionales de servicios domésticos (carpinteros, electricistas, plomeros, etc.) con clientes que necesitan sus servicios.

## 🚀 Características

- **Búsqueda de Profesionales**: Encuentra fácilmente el profesional que necesitás por categoría o ubicación
- **Perfiles Verificados**: Todos los profesionales pasan por un proceso de verificación
- **Sistema de Calificaciones**: Revisá las reseñas y calificaciones de otros usuarios
- **Autenticación con Google**: Sistema completo de login con Google OAuth
- **Gestión de Sesiones**: Navbar dinámico según estado de autenticación
- **Categorías Variadas**: Carpintería, Electricidad, Plomería, Pintura, Limpieza, Jardinería, y más
- **Diseño Responsive**: Funciona perfectamente en desktop, tablet y móvil
- **Modo Oscuro**: Soporte completo para tema claro y oscuro

## 🛠️ Tecnologías

- **Next.js 16** - Framework de React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Framework de CSS utility-first
- **React 19** - Librería de UI
- **NextAuth.js v5** - Autenticación con OAuth (Google)

## 📋 Requisitos Previos

- **Node.js** >= 20.9.0
- **npm** >= 8.0.0

## 🔧 Instalación

1. Cloná el repositorio (o ya lo tenés si estás leyendo esto)

2. Instalá las dependencias:

```bash
npm install
```

3. **Configurá la autenticación con Google** (importante):

```bash
# Copiá el archivo de ejemplo
cp .env.example .env.local

# Verificá la configuración con el script
./check-auth-setup.sh
```

Para configurar Google OAuth, seguí la guía completa: **[SETUP_GOOGLE_AUTH.md](./SETUP_GOOGLE_AUTH.md)**

4. Iniciá el servidor de desarrollo:

```bash
npm run dev
```

5. Abrí tu navegador en [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
encasa-web/
├── app/                          # App Router de Next.js
│   ├── page.tsx                 # Página principal (landing)
│   ├── layout.tsx               # Layout global con Navbar y Footer
│   ├── api/auth/[...nextauth]/  # API de NextAuth.js
│   ├── auth/signin/             # Página de inicio de sesión
│   ├── register/                # Registro de profesionales
│   ├── dashboard/               # Panel de control del usuario
│   ├── profile/                 # Perfil del usuario
│   ├── settings/                # Configuración de cuenta
│   ├── professional/
│   │   ├── [id]/                # Detalle de profesional
│   │   └── setup/               # Configuración de perfil profesional
│   ├── services/                # Listado de servicios
│   ├── professionals/           # Búsqueda de profesionales
│   └── how-it-works/            # Información del servicio
├── components/                   # Componentes reutilizables
│   ├── Navbar.tsx               # Barra de navegación con auth
│   ├── Footer.tsx               # Pie de página
│   ├── SessionProvider.tsx      # Provider de sesión
│   ├── ServiceCard.tsx          # Tarjeta de servicio
│   ├── ProfessionalCard.tsx     # Tarjeta de profesional
│   └── SearchBar.tsx            # Barra de búsqueda
├── data/                         # Datos mock
│   ├── services.ts              # Listado de servicios
│   └── professionals.ts         # Listado de profesionales
├── types/                        # Definiciones de TypeScript
│   ├── index.ts                 # Interfaces y tipos
│   └── next-auth.d.ts           # Tipos de NextAuth
├── auth.ts                       # Configuración de NextAuth
├── middleware.ts                 # Middleware de rutas protegidas
└── public/                       # Archivos estáticos
```

## 🎨 Páginas Disponibles

### Públicas

- **`/`** - Landing page con hero, servicios destacados y CTA
- **`/services`** - Listado completo de categorías de servicios
- **`/professionals`** - Búsqueda y filtrado de profesionales
- **`/professional/[id]`** - Perfil detallado de un profesional con reseñas
- **`/how-it-works`** - Explicación del funcionamiento de la plataforma

### Autenticación

- **`/auth/signin`** - Página de inicio de sesión con Google
- **`/register`** - Registro de profesionales

### Protegidas (requieren login)

- **`/dashboard`** - Panel de control del usuario
- **`/profile`** - Perfil del usuario
- **`/settings`** - Configuración de la cuenta
- **`/professional/setup`** - Configuración de perfil profesional

## 🔨 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo en localhost:3000

# Producción
npm run build        # Genera build optimizado para producción
npm run start        # Inicia servidor de producción

# Linting
npm run lint         # Ejecuta ESLint

# Utilidades
./check-auth-setup.sh  # Verifica la configuración de autenticación
```

## 🎯 Próximos Pasos / TODOs

### Autenticación ✅ (Completado)

- [x] Sistema de autenticación con Google OAuth
- [x] Páginas de login y registro
- [x] Gestión de sesiones con NextAuth.js v5
- [x] Navbar dinámico según sesión
- [x] Rutas protegidas con middleware
- [x] Páginas de dashboard, perfil y settings
- [x] Página de setup de perfil profesional
- [x] Manejo de errores de autenticación
- [x] Script de verificación de configuración

### Backend & Base de Datos

- [ ] Implementar base de datos (PostgreSQL con Prisma)
- [ ] Conectar NextAuth con base de datos
- [ ] Crear API REST para gestión de datos
- [ ] Persistir usuarios y perfiles en BD
- [ ] Sistema de roles (cliente/profesional/admin)

### Funcionalidades Clave

- [ ] Sistema de mensajería entre clientes y profesionales
- [ ] Sistema de reservas/agendamiento
- [ ] Procesamiento de pagos (Stripe/MercadoPago)
- [ ] Sistema de notificaciones (email/push)
- [ ] Geolocalización para búsqueda por proximidad
- [ ] Carga de imágenes (portfolio de profesionales)

### Mejoras UI/UX

- [ ] Animaciones y transiciones
- [ ] Skeleton loaders
- [ ] Estados de carga
- [ ] Manejo de errores mejorado
- [ ] Formularios de contacto

### SEO & Performance

- [ ] Meta tags dinámicos
- [ ] Sitemap
- [ ] Optimización de imágenes
- [ ] SSR/SSG según corresponda
- [ ] Analytics (Google Analytics/Mixpanel)

### Testing

- [ ] Tests unitarios (Jest/Vitest)
- [ ] Tests de integración
- [ ] Tests E2E (Playwright/Cypress)

## 🤝 Contribuir

Este es un proyecto personal, pero las sugerencias son bienvenidas!

## 📝 Notas

- Actualmente el proyecto usa datos mock. En producción estos deberían venir de una API/base de datos.
- Las imágenes de profesionales usan emojis temporalmente. En producción usar imágenes reales.
- El sistema de contacto está simulado. Implementar integración real con email/WhatsApp.

### Documentación de Autenticación

- **[SETUP_GOOGLE_AUTH.md](./SETUP_GOOGLE_AUTH.md)** - Guía paso a paso para configurar Google OAuth
- **[AUTH_FLOW.md](./AUTH_FLOW.md)** - Documentación técnica completa del flujo de autenticación
- **`./check-auth-setup.sh`** - Script para verificar la configuración

## 📄 Licencia

Este proyecto es privado y de uso personal.

---

Desarrollado con ❤️ por Dante
