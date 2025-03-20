
import React from 'react';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import { Session } from '@/types/session';
import ActiveSessionsList from './ActiveSessionsList';
import PastSessionsList from './PastSessionsList';

interface SessionTabsProps {
  activeSessions: Session[];
  pastSessions: Session[];
  sessionFilter: 'upcoming' | 'past';
  onFilterChange: (filter: 'upcoming' | 'past') => void;
  onJoinSession: (sessionId: number) => void;
  onCancelSession: (sessionId: number) => void;
  onAddToCalendar: (session: Session) => void;
  onReviewSubmit: (sessionId: number, rating: number, feedback: string) => void;
}

const SessionTabs: React.FC<SessionTabsProps> = ({
  activeSessions = [],
  pastSessions = [],
  sessionFilter,
  onFilterChange,
  onJoinSession,
  onCancelSession,
  onAddToCalendar,
  onReviewSubmit
}) => {
  return (
    <>
      <div className="border-b">
        <div className="flex border-b">
          <button 
            className={`flex-1 px-4 py-2 text-sm font-medium text-center ${
              sessionFilter === 'upcoming' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-muted-foreground'
            }`}
            onClick={() => onFilterChange('upcoming')}
          >
            Active & Upcoming
          </button>
          <button 
            className={`flex-1 px-4 py-2 text-sm font-medium text-center ${
              sessionFilter === 'past' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-muted-foreground'
            }`}
            onClick={() => onFilterChange('past')}
          >
            <History className="h-4 w-4 inline mr-1" />
            Past Sessions
          </button>
        </div>
      </div>
      
      {sessionFilter === 'upcoming' && (
        <ActiveSessionsList 
          sessions={activeSessions || []}
          onJoinSession={onJoinSession}
          onCancelSession={onCancelSession}
          onAddToCalendar={onAddToCalendar}
        />
      )}
      
      {sessionFilter === 'past' && (
        <PastSessionsList 
          sessions={pastSessions || []}
          onReviewSubmit={onReviewSubmit}
        />
      )}
    </>
  );
};

export default SessionTabs;
