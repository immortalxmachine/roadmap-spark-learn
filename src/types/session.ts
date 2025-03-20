
export interface Session {
  id: string;
  tutorName: string;
  tutorAvatar: string;
  subject: string;
  topic: string; // Even though it's not in DB, keep in interface for UI
  startTime: string;
  duration: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  mode: 'text' | 'voice' | 'video';
  feedback?: string;
  rating?: number;
}

export interface SessionRequest {
  tutor_id: string;
  subject: string;
  topic?: string; // Made optional since it doesn't exist in DB
  start_time: string;
  duration: string;
  mode: 'text' | 'voice' | 'video';
}
