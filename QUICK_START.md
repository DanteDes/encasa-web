# 🚀 Quick Start - Autenticación con Google

## Inicio Rápido (5 minutos)

### 1️⃣ Configurar Variables de Entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env.local
```

### 2️⃣ Generar AUTH_SECRET

```bash
# Ejecutá este comando y copiá el resultado
openssl rand -base64 32
```

Pegá el resultado en `.env.local` en la variable `AUTH_SECRET`

### 3️⃣ Configurar Google OAuth

1. **Andá a:** https://console.cloud.google.com/
2. **Creá un proyecto** (o usá uno existente)
3. **Habilitá Google+ API**
4. **Configurá OAuth consent screen:**

   - Tipo: Externo
   - Nombre: EnCasa
   - Agregá tu email como usuario de prueba

5. **Creá credenciales OAuth 2.0:**

   - Tipo: Aplicación web
   - URIs autorizados:
     ```
     http://localhost:3000
     ```
   - URIs de redirección:
     ```
     http://localhost:3000/api/auth/callback/google
     ```

6. **Copiá Client ID y Client Secret** y pegalos en `.env.local`

### 4️⃣ Verificar Configuración

```bash
# Ejecutar script de verificación
./check-auth-setup.sh
```

### 5️⃣ Instalar y Ejecutar

```bash
# Instalar dependencias (solo la primera vez)
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### 6️⃣ Probar la Autenticación

1. Abrí http://localhost:3000
2. Click en "Iniciar Sesión" o "Registrarse"
3. Click en "Continuar con Google"
4. Autorizá la aplicación
5. ¡Listo! Deberías ver tu nombre y foto en la navbar

---

## 🆘 ¿Problemas?

### Error: "Configuration required"

- Verificá que `.env.local` exista y tenga todas las variables
- Reiniciá el servidor: `Ctrl+C` y `npm run dev`

### Error: "Invalid callback URL"

- Verificá que la URL de callback en Google Console sea exactamente:
  `http://localhost:3000/api/auth/callback/google`

### Error: "Access blocked"

- Verificá que tu email esté en "Usuarios de prueba" en Google Console
- Verificá que Google+ API esté habilitada

---

## 📚 Más Información

- **Guía detallada:** [SETUP_GOOGLE_AUTH.md](./SETUP_GOOGLE_AUTH.md)
- **Documentación técnica:** [AUTH_FLOW.md](./AUTH_FLOW.md)
- **Resumen de implementación:** [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)

---

## ✅ Checklist

- [ ] Copiado `.env.example` a `.env.local`
- [ ] Generado `AUTH_SECRET`
- [ ] Creado proyecto en Google Cloud Console
- [ ] Habilitado Google+ API
- [ ] Configurado OAuth consent screen
- [ ] Creado credenciales OAuth 2.0
- [ ] Actualizado `.env.local` con Client ID y Secret
- [ ] Ejecutado `./check-auth-setup.sh`
- [ ] Instalado dependencias con `npm install`
- [ ] Iniciado servidor con `npm run dev`
- [ ] Probado login con Google

---

**¡Listo para empezar!** 🎉
