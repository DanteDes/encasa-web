export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Professional {
  id: number;
  userId?: number | null;
  name: string;
  service: string;
  serviceId: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number | null;
  image: string | null;
  location: string | null;
  description: string | null;
  experience: number | null;
  verified: boolean;
  matriculado?: boolean;
  availability: string;
  phone?: string | null;
}

export interface Booking {
  id: number;
  clientUserId: number;
  clientName?: string | null;
  clientEmail?: string | null;
  professionalId: number;
  serviceId: string;
  serviceName?: string | null;
  scheduledDate: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  notes: string | null;
  estimatedHours: number | null;
  totalPrice: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: number;
  bookingId: number;
  clientUserId: number;
  professionalId: number;
  rating: number;
  comment: string | null;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  picture: string | null;
  role: string;
  hasProfessionalProfile: boolean;
  emailNotifications: boolean;
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


