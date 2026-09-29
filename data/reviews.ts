import { Review } from "@/types";

export const mockReviews: Review[] = [
  // Roberto Martínez (electricidad) — id 1
  {
    id: 1,
    bookingId: 101,
    clientUserId: 20,
    professionalId: 1,
    rating: 5,
    comment: "Excelente trabajo. Llegó puntual, solucionó el problema del tablero en menos de una hora y dejó todo ordenado. Lo recomiendo sin dudar.",
    createdAt: "2025-11-10T10:30:00Z",
  },
  {
    id: 2,
    bookingId: 102,
    clientUserId: 21,
    professionalId: 1,
    rating: 5,
    comment: "Muy profesional. Instaló los tomas e hizo el cableado de la habitación nueva impecablemente. Precio justo y trabajo garantizado.",
    createdAt: "2025-10-28T15:00:00Z",
  },
  {
    id: 3,
    bookingId: 103,
    clientUserId: 22,
    professionalId: 1,
    rating: 4,
    comment: "Buen trabajo en general, tardó un poco más de lo estimado pero el resultado fue bueno. Recomendable.",
    createdAt: "2025-09-15T09:00:00Z",
  },

  // Claudia Fernández (limpieza) — id 2
  {
    id: 4,
    bookingId: 201,
    clientUserId: 23,
    professionalId: 2,
    rating: 5,
    comment: "Increíble! La casa quedó reluciente. Trabajó con sus propios productos ecológicos y el resultado fue mejor que cualquier empresa de limpieza que contraté antes.",
    createdAt: "2025-12-01T11:00:00Z",
  },
  {
    id: 5,
    bookingId: 202,
    clientUserId: 24,
    professionalId: 2,
    rating: 5,
    comment: "Para la mudanza fue perfecta. En 4 horas dejó el departamento listo para entregar. Muy recomendable y súper puntual.",
    createdAt: "2025-11-20T08:30:00Z",
  },
  {
    id: 6,
    bookingId: 203,
    clientUserId: 25,
    professionalId: 2,
    rating: 5,
    comment: "Ya lleva 6 meses viniendo cada dos semanas y siempre el mismo nivel de calidad. Una profesional de verdad.",
    createdAt: "2025-10-05T13:00:00Z",
  },

  // Jorge Suárez (plomería) — id 3
  {
    id: 7,
    bookingId: 301,
    clientUserId: 26,
    professionalId: 3,
    rating: 5,
    comment: "Se rompió una cañería a las 11 de la noche y llegó en 40 minutos. Solucionó todo y cobró lo que dijo. Un capo.",
    createdAt: "2025-12-10T23:15:00Z",
  },
  {
    id: 8,
    bookingId: 302,
    clientUserId: 27,
    professionalId: 3,
    rating: 4,
    comment: "Cambio de termotanque sin inconvenientes. Explicó bien lo que hizo y dio garantía. Muy conforme.",
    createdAt: "2025-11-02T14:00:00Z",
  },

  // Diego Torres (cerrajería) — id 7
  {
    id: 9,
    bookingId: 701,
    clientUserId: 28,
    professionalId: 7,
    rating: 5,
    comment: "Me quedé afuera con las llaves adentro. Llegó en 25 minutos, abrió sin dañar la cerradura y de paso la cambió. Excelente servicio.",
    createdAt: "2025-12-05T19:00:00Z",
  },
  {
    id: 10,
    bookingId: 702,
    clientUserId: 29,
    professionalId: 7,
    rating: 5,
    comment: "Cambié las cerraduras del local al mejor precio que encontré. Rápido, prolijo y con garantía de un año. Muy recomendable.",
    createdAt: "2025-10-22T10:00:00Z",
  },
];

export function getMockReviewsForProfessional(professionalId: number): Review[] {
  return mockReviews.filter((r) => r.professionalId === professionalId);
}
