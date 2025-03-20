
import React from 'react';
import { Button } from '@/components/ui/button';
import { Session } from '@/types/session';
import SessionCard from './SessionCard';

interface ActiveSessionsListProps {
  sessions: Session[];
  onJoinSession: (sessionId: number) => void;
  onCancelSession: (sessionId: number) => void;
  onAddToCalendar: (session: Session) => void;
}

const ActiveSessionsList: React.FC<ActiveSessionsListProps> = ({ 
  sessions, 
  onJoinSession, 
  onCancelSession, 
  onAddToCalendar 
}) => {
  // Ensure sessions is always an array, default to empty array if undefined
  const sessionList = Array.isArray(sessions) ? sessions : [];
  
  if (sessionList.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">You don't have any active sessions yet.</p>
        <Button className="mt-4" onClick={() => document.getElementById('schedule-session')?.scrollIntoView({ behavior: 'smooth' })}>
          Schedule Your First Session
        </Button>
      </div>
    );
  }

  return (
    <div className="divide-y">
      {sessionList.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          onJoin={onJoinSession}
          onCancel={onCancelSession}
          onAddToCalendar={onAddToCalendar}
        />
      ))}
    </div>
  );
};

export default ActiveSessionsList;
