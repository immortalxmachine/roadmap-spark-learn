
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Session } from '@/types/session';
import TutorChat from './sessions/TutorChat';
import ScheduleSessionForm from './sessions/ScheduleSessionForm';
import SessionTabs from './sessions/SessionTabs';
import { format } from 'date-fns';

interface SessionsTabProps {
  activeSessions: Session[];
}

const SessionsTab: React.FC<SessionsTabProps> = ({ activeSessions: initialSessions }) => {
  const [sessionFilter, setSessionFilter] = useState<'upcoming' | 'past'>('upcoming');
  const [activeSessions, setActiveSessions] = useState<Session[]>(initialSessions);
  const { toast } = useToast();
  const [pastSessions, setPastSessions] = useState<Session[]>([
    {
      id: 101,
      tutorName: "Prof. David Williams",
      tutorAvatar: "DW",
      subject: "Mathematics",
      topic: "Algebra Fundamentals",
      startTime: "May 12, 2023, 11:00 AM",
      duration: "60 minutes",
      status: 'completed',
      mode: 'video',
      rating: 5,
      feedback: "Excellent session! The tutor explained concepts very clearly."
    },
    {
      id: 102,
      tutorName: "Dr. Emily Peterson",
      tutorAvatar: "EP",
      subject: "Biology",
      topic: "Cell Structure and Function",
      startTime: "April 28, 2023, 02:00 PM",
      duration: "45 minutes",
      status: 'completed',
      mode: 'text',
      rating: 4
    }
  ]);

  const handleJoinSession = (sessionId: number) => {
    toast({
      title: "Joining session",
      description: "Connecting to your tutoring session...",
    });
    
    setTimeout(() => {
      window.open(`/session/${sessionId}`, '_blank');
    }, 1000);
  };

  const handleCancelSession = (sessionId: number) => {
    toast({
      title: "Session canceled",
      description: "Your session has been canceled.",
    });
    
    setActiveSessions(activeSessions.filter(session => session.id !== sessionId));
  };

  const handleAddToCalendar = (session: Session) => {
    toast({
      title: "Added to calendar",
      description: `${session.topic} with ${session.tutorName} has been added to your calendar.`,
    });
  };

  const handleSubmitReview = (sessionId: number, rating: number, feedback: string) => {
    setPastSessions(prevSessions => 
      prevSessions.map(session => 
        session.id === sessionId 
          ? { ...session, rating, feedback }
          : session
      )
    );

    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
  };

  const handleScheduleSession = (
    subject: string, 
    topic: string, 
    date: Date, 
    time: string, 
    duration: string, 
    sessionType: 'text' | 'voice' | 'video',
    language: string
  ) => {
    if (!subject || !date || !time || !duration || !topic) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields to schedule a session.",
        variant: "destructive"
      });
      return;
    }
    
    const newSession: Session = {
      id: Math.floor(Math.random() * 1000) + activeSessions.length + 1,
      tutorName: "Dr. Sarah Johnson",
      tutorAvatar: "SJ",
      subject: subject,
      topic: topic,
      startTime: `${format(date, 'PPP')}, ${time}`,
      duration: `${duration} minutes`,
      status: 'scheduled',
      mode: sessionType,
      language: language
    };
    
    setActiveSessions([...activeSessions, newSession]);
    
    toast({
      title: "Session scheduled!",
      description: `Your ${duration} minute ${sessionType} session in ${language} has been scheduled for ${format(date, 'PPP')} at ${time}.`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              My Tutoring Sessions
            </CardTitle>
            <CardDescription>
              View and manage your upcoming and past tutoring sessions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <SessionTabs
              activeSessions={activeSessions}
              pastSessions={pastSessions}
              sessionFilter={sessionFilter}
              onFilterChange={setSessionFilter}
              onJoinSession={handleJoinSession}
              onCancelSession={handleCancelSession}
              onAddToCalendar={handleAddToCalendar}
              onReviewSubmit={handleSubmitReview}
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-1">
        <TutorChat />
        <ScheduleSessionForm onSchedule={handleScheduleSession} />
      </div>
    </div>
  );
};

export default SessionsTab;
