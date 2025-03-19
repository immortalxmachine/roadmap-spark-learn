
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
}
