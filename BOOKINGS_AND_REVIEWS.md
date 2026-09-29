# Reservas y reseñas (bookings + reviews)

Cómo funciona el ciclo completo: un cliente reserva un turno con un profesional, el trabajo se confirma como completado por las dos partes, y recién ahí el cliente puede calificarlo. Diseñado así porque en un marketplace de servicios las reseñas son el activo de confianza — el objetivo es que nadie pueda dejar (ni bloquear) una calificación sin que el trabajo haya pasado realmente por la plataforma.

## Por qué "confirmación de dos partes"

El trabajo (plomería, pintura, etc.) pasa fuera de la app, así que el backend nunca puede verificar objetivamente que se hizo. Lo que sí puede verificar es que **ambas partes** — cliente y profesional — dicen que se completó:

- Si solo confirma el profesional, no alcanza (podría inflar reviews de trabajos que no pasaron, o simplemente marcar todo como completado sin que el cliente esté de acuerdo).
- Si solo confirma el cliente, no alcanza tampoco (el profesional podría no confirmar nunca para evitar que se cierre y se deje una reseña).
- Si una sola parte confirma y la otra no responde en `BOOKING_AUTO_COMPLETE_DAYS` días (5 por defecto, backend), la reserva se cierra sola.

Ver la tarjeta "Lógica para reviews de usuario" en Trello para el análisis completo de las alternativas que se descartaron (gate unilateral del profesional, o reviews libres sin gate).

## Ciclo de vida de una reserva (`Booking`)

```
PENDING  →  CONFIRMED  →  COMPLETED
(cliente     (profesional    (ambas partes confirmaron finalización
 reserva)     la confirma)    vía /bookings/{id}/complete, o venció
                              el timeout)
                 ↓
             CANCELLED (en cualquier momento antes de COMPLETED)
```

1. **Cliente reserva un turno** desde `ProfessionalActions` (botón "Solicitar turno" en `/professional/[id]`, con fecha/hora, horas estimadas y notas) → `POST /bookings`.
2. **Profesional confirma la reserva** en `/solicitudes` (`getProfessionalBookings`) → `PUT /bookings/{id}/confirm` (`PENDING → CONFIRMED`).
3. **Cualquiera de las dos partes confirma finalización**: el cliente desde su dashboard (`ClientBookingsPreview`, botón "Confirmar que se completó"), el profesional desde `/solicitudes` (botón "Marcar completada", que desaparece una vez que ya confirmó y queda "Esperando que el cliente confirme") → `PUT /bookings/{id}/complete`. Cuando confirmaron ambas (o venció el timeout), el booking pasa a `COMPLETED`.
4. **Cliente deja la reseña** en `/professional/[id]` (`ReviewForm`, que solo aparece si el cliente tiene un booking `COMPLETED` con ese profesional sin reseñar todavía) → `POST /reviews`.

## Dónde está cada pieza (frontend)

| Archivo | Qué hace |
|---|---|
| `lib/api.ts` | `createBooking`, `getClientBookings`, `getProfessionalBookings`, `updateBookingStatus` (`confirm`/`complete`/`cancel`), `createReview` |
| `components/ProfessionalActions.tsx` | botón "Solicitar turno" → crea la reserva (fecha, horas, notas) |
| `app/solicitudes/page.tsx` | vista del profesional: confirma, marca completada, cancela |
| `components/ClientBookingsPreview.tsx` | vista del cliente (en `/dashboard`): confirma finalización |
| `components/ReviewForm.tsx` | formulario de reseña en `/professional/[id]`, gateado por booking `COMPLETED` sin reseña — reemplaza un mock anterior que solo chequeaba si el cliente había clickeado WhatsApp |
| `components/ReviewsList.tsx` | lista de reseñas reales (`/reviews/professional/{id}`), con fallback a `data/reviews.ts` si el backend no responde |

El backend (repo `encasa-web-BE`) tiene el detalle de endpoints y el modelo de datos en su propio `README.md`.

## Qué falta (a propósito, fuera de esta vuelta)

- El auto-cierre por timeout ya existe en el backend, pero no hay ningún aviso/notificación al usuario cuando pasa — hoy solo se nota si recarga la página.
- Derecho a réplica del profesional sobre una reseña, y reporte de reseñas abusivas: no implementado.
