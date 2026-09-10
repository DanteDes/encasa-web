# Solicitudes y reseñas (bookings + reviews)

Cómo funciona el ciclo completo: un cliente contacta a un profesional, el trabajo se confirma como completado por las dos partes, y recién ahí el cliente puede calificarlo. Diseñado así porque en un marketplace de servicios las reseñas son el activo de confianza — el objetivo es que nadie pueda dejar (ni bloquear) una calificación sin que el trabajo haya pasado realmente por la plataforma.

## Por qué "confirmación de dos partes"

El trabajo (plomería, pintura, etc.) pasa fuera de la app, así que el backend nunca puede verificar objetivamente que se hizo. Lo que sí puede verificar es que **ambas partes** — cliente y profesional — dicen que se completó:

- Si solo confirma el profesional, no alcanza (podría inflar reviews de trabajos que no pasaron).
- Si solo confirma el cliente, no alcanza tampoco (evita que el profesional bloquee para siempre una mala reseña no confirmando nunca).
- Si una sola parte confirma y la otra no responde en `booking.auto-complete-days` días (5 por defecto, backend), la solicitud se cierra sola.

## Ciclo de vida de una solicitud (`Booking`)

```
REQUESTED  →  IN_PROGRESS  →  COMPLETED
(cliente       (profesional      (ambas partes confirmaron,
 contacta)      la toma)          o venció el timeout)
```

1. **Cliente contacta** a un profesional desde `ProfessionalActions` (botón "Contactar" en `/professional/[id]`) → `POST /bookings`. Si el cliente no está logueado, solo puede usar el fallback de WhatsApp (no se puede crear un booking sin sesión).
2. **Profesional ve la solicitud** en `/solicitudes` (`getMyBookings`) y la marca "en proceso" → `PATCH /bookings/{id}/status`.
3. **Cualquiera de las dos partes confirma finalización**: el cliente desde su dashboard (`ClientBookingsList`, botón "Confirmar que se completó"), el profesional desde `/solicitudes` (botón "Confirmar finalización") → `POST /bookings/{id}/confirm-completion`. Cuando confirmaron ambas (o venció el timeout), el booking pasa a `COMPLETED`.
4. **Cliente deja la reseña** en `/professional/[id]` (`LeaveReviewForm`, que solo aparece si el cliente tiene un booking `COMPLETED` con ese profesional sin reseñar todavía) → `POST /reviews`.

## Dónde está cada pieza (frontend)

| Archivo | Qué hace |
|---|---|
| `lib/api.ts` | `createBooking`, `getMyBookings`, `markBookingInProgress`, `confirmBookingCompletion`, `createReview` |
| `components/ProfessionalActions.tsx` | botón "Contactar" → crea el booking (si hay sesión) + fallback WhatsApp |
| `app/solicitudes/page.tsx` | vista del profesional: lista sus bookings, marca en proceso, confirma finalización |
| `components/ClientBookingsList.tsx` | vista del cliente (en `/dashboard`): lista sus bookings, confirma finalización |
| `components/LeaveReviewForm.tsx` | formulario de reseña en `/professional/[id]`, gateado por booking `COMPLETED` sin reseña |

El backend (repo `encasa-web-BE`) tiene el detalle de endpoints y el modelo de datos en su propio `README.md`.

## Qué falta (a propósito, fuera de esta vuelta)

- Auto-cierre por timeout ya existe en el backend, pero no hay ningún aviso/notificación al usuario cuando pasa — hoy solo se nota si recarga la página.
- `Credentials.authorize` en `auth.ts` sigue mockeado (no valida contra el backend) — el `backendToken` real se consigue vía `/auth/sync`, no vía `/auth/login`.
- No hay forma de cancelar un booking (`CANCELLED` no existe como estado, para no construir algo que todavía nadie pidió).
- Derecho a réplica del profesional sobre una reseña, y reporte de reseñas abusivas: no implementado.
