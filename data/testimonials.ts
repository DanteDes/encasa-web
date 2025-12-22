export interface Testimonial {
  id: string;
  name: string;
  location: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
  professionalName: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "María L.",
    location: "Centro",
    service: "Electricidad",
    rating: 5,
    comment:
      "Roberto vino el mismo día que lo contacté. Arregló el problema del tablero en menos de 2 horas. Super recomendable, profesional y prolijo.",
    date: "Hace 3 días",
    professionalName: "Roberto Martínez",
  },
  {
    id: "2",
    name: "Carlos M.",
    location: "Los Troncos",
    service: "Plomería",
    rating: 5,
    comment:
      "Jorge me salvó! Tenía una pérdida de agua un domingo y vino en 40 minutos. Precio justo y excelente atención. Ya lo tengo guardado para la próxima.",
    date: "Hace 1 semana",
    professionalName: "Jorge Suárez",
  },
  {
    id: "3",
    name: "Lucía R.",
    location: "Güemes",
    service: "Limpieza",
    rating: 5,
    comment:
      "Claudia es un lujo. Dejó mi depto impecable después de la mudanza. Súper detallista y puntual. La voy a contratar mensualmente.",
    date: "Hace 2 semanas",
    professionalName: "Claudia Fernández",
  },
  {
    id: "4",
    name: "Roberto S.",
    location: "La Perla",
    service: "Pintura",
    rating: 5,
    comment:
      "Ana pintó todo mi departamento en 4 días. Quedó perfecto, sin manchas y respetó los tiempos que habíamos acordado. Muy profesional.",
    date: "Hace 3 semanas",
    professionalName: "Ana García",
  },
  {
    id: "5",
    name: "Fernanda G.",
    location: "Constitución",
    service: "Carpintería",
    rating: 5,
    comment:
      "Martín me hizo un placar a medida espectacular. Me mostró fotos de otros trabajos y quedó igual de bien. Cumplió con los plazos y el presupuesto.",
    date: "Hace 1 mes",
    professionalName: "Martín Rodríguez",
  },
  {
    id: "6",
    name: "Diego P.",
    location: "Punta Mogotes",
    service: "Aire Acondicionado",
    rating: 5,
    comment:
      "Laura me instaló el aire antes del verano. Explicó todo súper claro, trabajo prolijo y me dio tips de mantenimiento. Recomendadísima.",
    date: "Hace 1 mes",
    professionalName: "Laura Sánchez",
  },
];







