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
  availability: string;
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
  id: number;
  email: string;
  name: string | null;
  phone: string | null;
  avatar: string | null;
  bio: string | null;
  location: string | null;
  role: string;
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


