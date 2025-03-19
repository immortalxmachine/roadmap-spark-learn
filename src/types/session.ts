
export interface Session {
  id: string;
  tutorName: string;
  tutorAvatar: string;
  subject: string;
  topic: string;
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
  topic: string;
  start_time: string;
  duration: string;
  mode: 'text' | 'voice' | 'video';
}
