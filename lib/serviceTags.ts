export const AVAILABLE_TAGS = [
  "Presupuesto sin cargo",
  "Garantía de trabajo",
  "Atención urgente",
  "Disponible 24hs",
  "Servicio a domicilio",
  "Materiales incluidos",
  "Matriculado habilitado",
  "Trabaja fines de semana",
  "Certificado de trabajo",
  "Acepta transferencia",
  "Acepta tarjeta",
  "Factura A/B",
  "Sin cargo por visita",
  "Trabajo prolijo y limpio",
] as const;

export type ServiceTag = (typeof AVAILABLE_TAGS)[number];
export const MAX_TAGS = 5;
