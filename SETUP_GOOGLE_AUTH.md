# 🔐 Configuración de Autenticación con Google

Este documento te guiará paso a paso para configurar la autenticación con Google OAuth en tu aplicación EnCasa.

## 📋 Pre-requisitos

- Node.js 18+ instalado
- Una cuenta de Google
- Acceso a [Google Cloud Console](https://console.cloud.google.com/)

## 🚀 Guía de Configuración

### Paso 1: Configurar Google Cloud Console

1. **Accedé a Google Cloud Console**

   - Visitá: https://console.cloud.google.com/

2. **Creá un nuevo proyecto**

   - Click en el selector de proyectos (arriba a la izquierda)
   - Click en "Nuevo Proyecto"
   - Nombre: `EnCasa` (o el que prefieras)
   - Click en "Crear"

3. **Habilitá Google+ API**

   - En el menú lateral, andá a **APIs y Servicios** > **Biblioteca**
   - Buscá "Google+ API"
   - Click en "Habilitar"

4. **Configurá la pantalla de consentimiento OAuth**

   - Andá a **APIs y Servicios** > **Pantalla de consentimiento de OAuth**
   - Seleccioná "Externo" (para testing)
   - Click en "Crear"
   - Completá la información básica:
     - Nombre de la aplicación: `EnCasa`
     - Email de asistencia: tu email
     - Email del desarrollador: tu email
   - Click en "Guardar y continuar"
   - En "Scopes", dejá los valores por defecto
   - Click en "Guardar y continuar"
   - En "Usuarios de prueba", agregá tu email de Google
   - Click en "Guardar y continuar"

5. **Creá las credenciales OAuth**

   - Andá a **APIs y Servicios** > **Credenciales**
   - Click en "+ CREAR CREDENCIALES" > "ID de cliente de OAuth 2.0"
   - Tipo de aplicación: "Aplicación web"
   - Nombre: `EnCasa Web Client`

   - **Orígenes de JavaScript autorizados:**

     ```
     http://localhost:3000
     ```

   - **URIs de redireccionamiento autorizados:**

     ```
     http://localhost:3000/api/auth/callback/google
     ```

   - Click en "Crear"
   - **¡Guardá el Client ID y Client Secret!**

### Paso 2: Configurar Variables de Entorno

1. **Generá un AUTH_SECRET**

   ```bash
   openssl rand -base64 32
   ```

   Copiá el resultado.

2. **Creá el archivo `.env.local`**

   ```bash
   cp .env.example .env.local
   ```

3. **Editá `.env.local`** con tus credenciales:

   ```env
   # El secret que generaste en el paso anterior
   AUTH_SECRET=tu-secret-aqui

   # URL de la aplicación
   NEXTAUTH_URL=http://localhost:3000

   # Credenciales de Google OAuth (del paso 1.5)
   GOOGLE_CLIENT_ID=tu-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=tu-client-secret
   ```

### Paso 3: Instalar Dependencias y Ejecutar

1. **Instalá las dependencias**

   ```bash
   npm install
   ```

2. **Ejecutá el servidor de desarrollo**

   ```bash
   npm run dev
   ```

3. **Abrí tu navegador**
   - Navegá a: http://localhost:3000
   - Click en "Iniciar Sesión" o "Registrarse"
   - Probá el flujo de autenticación con Google

## ✅ Verificación del Flujo

### Flujo de Login para Clientes:

1. Click en "Iniciar Sesión" → `/auth/signin`
2. Click en "Continuar con Google"
3. Autorizá la aplicación en Google
4. Serás redirigido a la home (`/`) con sesión activa
5. Verás tu foto y nombre en la navbar

### Flujo de Registro para Profesionales:

1. Click en "Registrarse" → `/register`
2. Click en "Continuar con Google"
3. Autorizá la aplicación en Google
4. Serás redirigido a `/professional/setup`
5. Completá tu perfil profesional

### Rutas Protegidas:

Estas rutas requieren autenticación:

- `/dashboard` - Panel de control del usuario
- `/profile` - Perfil del usuario
- `/professional/setup` - Configuración de perfil profesional
- `/settings` - Configuración de la cuenta

## 🔍 Características Implementadas

✅ **Autenticación con Google OAuth 2.0**
✅ **Gestión de sesiones con NextAuth.js v5**
✅ **Rutas protegidas con middleware**
✅ **Páginas de perfil y dashboard**
✅ **Configuración de perfil profesional**
✅ **Navbar con menú de usuario**
✅ **Responsive en mobile y desktop**
✅ **Dark mode ready (estructura)**

## 🛠️ Troubleshooting

### Error: "Configuration required"

- Verificá que el archivo `.env.local` existe
- Verificá que todas las variables están configuradas
- Reiniciá el servidor: `Ctrl+C` y luego `npm run dev`

### Error: "Invalid callback URL"

- Verificá que la URL de callback en Google Console sea exactamente:
  `http://localhost:3000/api/auth/callback/google`
- No debe tener espacios ni caracteres extra

### Error: "Access blocked: This app's request is invalid"

- Verificá que tu email esté agregado como "Usuario de prueba" en la pantalla de consentimiento
- Verificá que Google+ API esté habilitada

### No aparece mi nombre/foto

- Verificá que hayas autorizado el acceso a tu información básica en Google
- Chequeá la consola del navegador para errores
- Verificá que los callbacks en `auth.ts` estén correctos

### Error 401 o 403

- Verificá que las credenciales en `.env.local` sean correctas
- Regenerá el AUTH_SECRET: `openssl rand -base64 32`
- Verificá que el proyecto en Google Cloud esté activo

## 📱 Próximos Pasos

### Para usar en producción:

1. **Actualizá las URLs en Google Console**

   - Agregá tu dominio de producción a los orígenes autorizados
   - Agregá: `https://tu-dominio.com/api/auth/callback/google`

2. **Actualizá `.env.local` para producción**

   ```env
   AUTH_SECRET=nuevo-secret-super-seguro
   NEXTAUTH_URL=https://tu-dominio.com
   GOOGLE_CLIENT_ID=tu-client-id
   GOOGLE_CLIENT_SECRET=tu-client-secret
   ```

3. **Cambiá el tipo de aplicación a "Producción"**

   - En Google Console > Pantalla de consentimiento OAuth
   - Click en "Publicar aplicación"

4. **Considerá usar una base de datos**
   - Para persistir usuarios y sesiones
   - Recomendado: Prisma + PostgreSQL

## 📚 Recursos Útiles

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [Next.js 16 Documentation](https://nextjs.org/docs)
- [AUTH_FLOW.md](./AUTH_FLOW.md) - Documentación técnica detallada

## 🆘 Ayuda

Si tenés problemas con la configuración:

1. Revisá el archivo [AUTH_FLOW.md](./AUTH_FLOW.md) para documentación técnica
2. Verificá la consola del navegador para errores
3. Verificá los logs del servidor de desarrollo
4. Asegurate de que todas las dependencias estén instaladas

---

**¿Todo funcionando?** ¡Genial! Ahora podés empezar a desarrollar las funcionalidades de tu aplicación. 🎉
