
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Video, Phone, MessageCircle, Globe } from 'lucide-react';
import AnimatedAvatar from '@/components/ui/avatar-animated';
import { Session } from '@/types/session';
import { useToast } from "@/hooks/use-toast";

interface SessionCardProps {
  session: Session;
  onJoin: (sessionId: number) => void;
  onCancel: (sessionId: number) => void;
  onAddToCalendar: (session: Session) => void;
}

const SessionCard: React.FC<SessionCardProps> = ({ 
  session, 
  onJoin, 
  onCancel, 
  onAddToCalendar 
}) => {
  return (
    <div key={session.id} className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start space-x-4">
          <AnimatedAvatar 
            fallback={session.tutorAvatar} 
            size="md" 
            animation={session.status === 'in-progress' ? 'pulse' : 'none'}
            className={session.status === 'in-progress' ? 'ring-2 ring-green-500' : ''}
          />
          <div>
            <h3 className="font-medium">{session.topic}</h3>
            <p className="text-sm text-muted-foreground mb-1">
              with {session.tutorName} • {session.subject}
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                {session.startTime}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                {session.duration}
              </div>
              <div className="flex items-center">
                {session.mode === 'video' ? (
                  <Video className="h-4 w-4 mr-1 text-muted-foreground" />
                ) : session.mode === 'voice' ? (
                  <Phone className="h-4 w-4 mr-1 text-muted-foreground" />
                ) : (
                  <MessageCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                )}
                {session.mode.charAt(0).toUpperCase() + session.mode.slice(1)} Session
              </div>
              {session.language && (
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-1 text-muted-foreground" />
                  {session.language}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 flex-wrap">
          {session.status === 'in-progress' ? (
            <>
              <Badge className="bg-green-500">In Progress</Badge>
              <Button onClick={() => onJoin(session.id)}>
                Join Now
              </Button>
            </>
          ) : session.status === 'scheduled' ? (
            <>
              <Badge variant="outline">Scheduled</Badge>
              <Button variant="outline" onClick={() => onAddToCalendar(session)}>
                <Calendar className="mr-2 h-4 w-4" />
                Add to Calendar
              </Button>
              <Button variant="destructive" onClick={() => onCancel(session.id)}>
                Cancel
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
