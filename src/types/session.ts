
export interface Session {
  id: number;
  tutorName: string;
  tutorAvatar: string;
  subject: string;
  topic: string;
  startTime: string;
  duration: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  mode: 'text' | 'voice' | 'video';
  language?: string; // Language for the session
  rating?: number; // 1-5 star rating
  feedback?: string; // User feedback for the session
}
