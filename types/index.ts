export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Professional {
  id: string;
  name: string;
  service: string;
  serviceId: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  image: string;
  location: string;
  description: string;
  experience: number;
  verified: boolean;
  availability: "disponible" | "ocupado" | "no-disponible";
}

export interface Review {
  id: string;
  professionalId: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
}

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


