
export interface Tutor {
  id: number;
  name: string;
  specialty: string;
  expertise: string[];
  rating: number;
  reviews: number;
  status: 'available' | 'busy' | 'scheduled';
  availableIn?: string;
  nextSession?: string;
  avatar: string;
  level: number;
  badges: string[];
  communicationModes: ('text' | 'voice' | 'video')[];
  languages?: string[]; // Languages spoken by the tutor
}
