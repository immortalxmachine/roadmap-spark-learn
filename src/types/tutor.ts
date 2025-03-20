
export interface Tutor {
  id: string;
  name: string;
  specialty: string;
  expertise: string[];
  rating: number;
  reviews: number;
  status: 'available' | 'busy' | 'scheduled';
  avatar: string;
  level: number;
  badges: string[];
  communicationModes: string[];
  available_in?: string;
  next_session?: string;
}

export interface TutorFilters {
  subject?: string;
  availability?: string;
  communicationMode?: string;
}
