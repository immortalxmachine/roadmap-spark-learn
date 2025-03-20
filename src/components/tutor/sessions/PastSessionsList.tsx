
import React, { useState } from 'react';
import { Session } from '@/types/session';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, ClockIcon, MessageSquare, Video, PhoneCall } from 'lucide-react';
import SessionReviewForm from './SessionReviewForm';

interface PastSessionsListProps {
  sessions: Session[];
  onReviewSubmit: (sessionId: number, rating: number, feedback: string) => void;
}

const PastSessionsList: React.FC<PastSessionsListProps> = ({ sessions = [], onReviewSubmit }) => {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  
  // Ensure sessions is always an array
  const sessionList = Array.isArray(sessions) ? sessions : [];
  
  if (sessionList.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">You don't have any past sessions yet.</p>
      </div>
    );
  }

  const getCommunicationIcon = (mode: 'text' | 'voice' | 'video') => {
    switch (mode) {
      case 'text':
        return <MessageSquare className="h-4 w-4" />;
      case 'voice':
        return <PhoneCall className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="divide-y">
      {sessionList.map((session) => (
        <div key={session.id} className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {session.tutorAvatar}
                </div>
                <div>
                  <h3 className="font-medium">{session.tutorName}</h3>
                  <p className="text-sm text-muted-foreground">{session.subject}</p>
                </div>
              </div>
              
              <div className="mt-3 space-y-1">
                <p className="text-sm font-medium">{session.topic}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  <span>{session.startTime}</span>
                  <span className="mx-1">•</span>
                  <ClockIcon className="h-3.5 w-3.5 mr-1" />
                  <span>{session.duration}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="px-2 py-0 h-5">
                  {getCommunicationIcon(session.mode)}
                  <span className="ml-1 text-xs capitalize">{session.mode}</span>
                </Badge>
                
                {session.language && (
                  <Badge variant="outline" className="px-2 py-0 h-5">
                    <span className="text-xs">{session.language}</span>
                  </Badge>
                )}
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedSession(session)}
                  >
                    {session.rating ? "Update Review" : "Leave Review"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {session.rating ? "Update Your Review" : "Leave a Review"}
                    </DialogTitle>
                  </DialogHeader>
                  
                  {selectedSession && (
                    <SessionReviewForm
                      session={selectedSession}
                      initialRating={session.rating}
                      initialFeedback={session.feedback}
                      onSubmit={(rating, feedback) => {
                        onReviewSubmit(session.id, rating, feedback);
                      }}
                    />
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {session.rating && (
            <Card className="mt-3 bg-muted/40">
              <CardContent className="p-3 text-sm">
                <div className="flex items-center mb-1">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${
                          i < (session.rating || 0) ? "text-amber-500 fill-amber-500" : "text-gray-300"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 font-medium">{session.rating}/5</span>
                </div>
                {session.feedback && <p className="text-muted-foreground">{session.feedback}</p>}
              </CardContent>
            </Card>
          )}
        </div>
      ))}
    </div>
  );
};

export default PastSessionsList;
