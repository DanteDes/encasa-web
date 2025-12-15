# Flujo de Autenticación con Google - EnCasa

Este documento describe el flujo completo de autenticación implementado con NextAuth.js y Google OAuth.

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Configuración Inicial](#configuración-inicial)
- [Flujo de Autenticación](#flujo-de-autenticación)
- [Estructura de Archivos](#estructura-de-archivos)
- [Componentes Creados](#componentes-creados)
- [Páginas](#páginas)
- [Uso en la Aplicación](#uso-en-la-aplicación)
- [Próximos Pasos](#próximos-pasos)

## 🎯 Descripción General

Se ha implementado un sistema completo de autenticación usando:
- **NextAuth.js v5** (beta) - Compatible con Next.js 16
- **Google OAuth 2.0** - Autenticación con Google
- **Session Management** - Gestión de sesiones del lado del cliente
- **Protected Routes** - Rutas protegidas (próximamente)

## ⚙️ Configuración Inicial

### 1. Instalar Dependencias

```bash
npm install next-auth@beta
```

### 2. Configurar Google OAuth

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita "Google+ API"
4. Ve a **Credenciales** → **Crear credenciales** → **ID de cliente de OAuth 2.0**
5. Configura las URLs autorizadas:
   - **URIs de origen autorizados**: `http://localhost:3000`
   - **URIs de redirección autorizados**: `http://localhost:3000/api/auth/callback/google`

6. Copia el **Client ID** y **Client Secret**

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales:

```env
# Genera un secret con: openssl rand -base64 32
AUTH_SECRET=tu-secret-key-generado

NEXTAUTH_URL=http://localhost:3000

# Credenciales de Google OAuth
GOOGLE_CLIENT_ID=tu-client-id-de-google
GOOGLE_CLIENT_SECRET=tu-client-secret-de-google
```

## 🔄 Flujo de Autenticación

### Flujo para Clientes

```
1. Usuario → Click "Iniciar Sesión"
   ↓
2. Navega a → /auth/signin
   ↓
3. Click "Continuar con Google"
   ↓
4. Redirección → Pantalla de consentimiento de Google
   ↓
5. Usuario autoriza la app
   ↓
6. Redirección → /api/auth/callback/google
   ↓
7. NextAuth procesa la autenticación
   ↓
8. Redirección → / (home) con sesión activa
```

### Flujo para Profesionales

```
1. Usuario → Click "Registrarse como profesional"
   ↓
2. Navega a → /register
   ↓
3. Click "Continuar con Google"
   ↓
4. Redirección → Pantalla de consentimiento de Google
   ↓
5. Usuario autoriza la app
   ↓
6. Redirección → /api/auth/callback/google
   ↓
7. NextAuth procesa la autenticación
   ↓
8. Redirección → /professional/setup (próximamente)
   ↓
9. Usuario completa su perfil profesional
```

## 📁 Estructura de Archivos

```
encasa-web/
├── auth.ts                              # Configuración de NextAuth
├── .env.local                           # Variables de entorno (no comitear)
├── .env.example                         # Template de variables
│
├── app/
│   ├── layout.tsx                       # Layout con SessionProvider
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts             # API Route de NextAuth
│   ├── auth/
│   │   └── signin/
│   │       └── page.tsx                 # Página de inicio de sesión
│   └── register/
│       └── page.tsx                     # Página de registro profesional
│
├── components/
│   ├── Navbar.tsx                       # Navbar con estado de sesión
│   ├── SessionProvider.tsx              # Wrapper del SessionProvider
│   ├── SignOutButton.tsx                # Botón de cerrar sesión
│   └── UserMenu.tsx                     # Menú de usuario (server)
│
└── types/
    └── next-auth.d.ts                   # Tipos de TypeScript
```

## 🧩 Componentes Creados

### 1. `SessionProvider.tsx`
Wrapper del SessionProvider de NextAuth para uso en Client Components.

```tsx
import SessionProvider from "@/components/SessionProvider";

<SessionProvider>
  <App />
</SessionProvider>
```

### 2. `SignOutButton.tsx`
Botón para cerrar sesión con redirección personalizable.

```tsx
import SignOutButton from "@/components/SignOutButton";

<SignOutButton className="...">
  Cerrar Sesión
</SignOutButton>
```

### 3. `UserMenu.tsx`
Menú de usuario del lado del servidor (muestra info o botones de login).

```tsx
import UserMenu from "@/components/UserMenu";

<UserMenu className="..." />
```

### 4. `Navbar.tsx` (Actualizado)
Navbar con gestión de sesión completa:
- Muestra botones de login/registro si no hay sesión
- Muestra foto y nombre de usuario si hay sesión
- Dropdown con opciones de perfil y logout
- Totalmente responsive

## 📄 Páginas

### `/auth/signin`
Página de inicio de sesión con:
- Botón de "Continuar con Google"
- Campo de email (deshabilitado, para futuro)
- Links a términos y privacidad
- Link a registro de profesionales

### `/register`
Página de registro profesional con:
- Beneficios de unirse a la plataforma
- Botón de "Continuar con Google"
- Redirección a setup de perfil profesional
- Links a términos y privacidad

## 💻 Uso en la Aplicación

### Obtener la Sesión (Server Component)

```tsx
import { auth } from "@/auth";

export default async function MyPage() {
  const session = await auth();
  
  if (!session) {
    return <div>No estás autenticado</div>;
  }
  
  return (
    <div>
      <p>Bienvenido, {session.user.name}!</p>
    </div>
  );
}
```

### Obtener la Sesión (Client Component)

```tsx
"use client";

import { useSession } from "next-auth/react";

export default function MyComponent() {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return <div>Cargando...</div>;
  }
  
  if (!session) {
    return <div>No estás autenticado</div>;
  }
  
  return (
    <div>
      <p>Bienvenido, {session.user.name}!</p>
    </div>
  );
}
```

### Proteger Rutas (Middleware)

Crea `middleware.ts` en la raíz:

```typescript
export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
```

### Sign In Programáticamente

```tsx
import { signIn } from "@/auth";

// Server Action
async function handleSignIn() {
  "use server";
  await signIn("google", { redirectTo: "/" });
}
```

### Sign Out Programáticamente

```tsx
"use client";

import { signOut } from "next-auth/react";

function handleSignOut() {
  signOut({ callbackUrl: "/" });
}
```

## 🎨 Personalización

### Cambiar la Página de Sign In

En `auth.ts`:

```typescript
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/signin",      // Tu página custom
    signOut: "/auth/signout",    // Página de confirmación
    error: "/auth/error",        // Página de error
    verifyRequest: "/auth/verify", // Página de verificación
  },
  // ...
});
```

### Agregar Más Providers

```typescript
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Email from "next-auth/providers/email";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
});
```

### Callbacks Personalizados

```typescript
export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async signIn({ user, account, profile }) {
      // Lógica personalizada al iniciar sesión
      return true; // Permite el sign in
    },
    async session({ session, token }) {
      // Agregar info extra a la sesión
      session.user.id = token.sub as string;
      session.user.role = token.role as string;
      return session;
    },
    async jwt({ token, user, account }) {
      // Agregar info extra al token
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
});
```

## 🚀 Próximos Pasos

### Fase 1: Base de Datos
- [ ] Configurar Prisma ORM
- [ ] Crear modelo de Usuario en la BD
- [ ] Conectar NextAuth con la BD
- [ ] Persistir sesiones en BD

### Fase 2: Perfiles de Usuario
- [ ] Crear modelo de Perfil Profesional
- [ ] Página de setup de perfil (`/professional/setup`)
- [ ] Página de perfil de usuario (`/profile`)
- [ ] Edición de perfil

### Fase 3: Roles y Permisos
- [ ] Sistema de roles (cliente/profesional/admin)
- [ ] Middleware de autorización
- [ ] Rutas protegidas por rol
- [ ] Páginas específicas por rol

### Fase 4: Features Adicionales
- [ ] Login con email y contraseña
- [ ] Recuperación de contraseña
- [ ] Verificación de email
- [ ] Autenticación de dos factores (2FA)

### Fase 5: Social Login
- [ ] Login con Facebook
- [ ] Login con GitHub
- [ ] Login con Apple

## 🔐 Seguridad

### Buenas Prácticas Implementadas

✅ **Secrets seguros**: Uso de variables de entorno
✅ **HTTPS**: Forzar HTTPS en producción
✅ **CSRF Protection**: Protección integrada de NextAuth
✅ **Session Security**: Tokens JWT firmados
✅ **OAuth 2.0**: Estándar de la industria

### Recomendaciones Adicionales

1. **Regenerar AUTH_SECRET** para producción:
   ```bash
   openssl rand -base64 32
   ```

2. **Usar HTTPS en producción**:
   ```env
   NEXTAUTH_URL=https://tu-dominio.com
   ```

3. **Configurar dominios autorizados** en Google Cloud Console

4. **Rotar secrets** periódicamente

5. **Monitorear** intentos de login fallidos

## 🐛 Troubleshooting

### Error: "Configuration required"
- Verificá que `.env.local` existe y tiene todas las variables
- Reiniciá el servidor de desarrollo

### Error: "Invalid callback URL"
- Verificá que la URL de callback está configurada en Google Console
- Debe ser exactamente: `http://localhost:3000/api/auth/callback/google`

### Error: "Session not found"
- Verificá que `SessionProvider` está en el layout
- Asegurate de que estás usando `useSession()` en un Client Component

### No aparece el nombre del usuario
- Verificá los callbacks de `session` y `jwt` en `auth.ts`
- Chequeá los tipos en `types/next-auth.d.ts`

## 📚 Recursos

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [NextAuth.js Examples](https://github.com/nextauthjs/next-auth/tree/main/apps/examples)

---

**Última actualización**: Diciembre 2024
**Versión**: 1.0
**Autor**: Dante

