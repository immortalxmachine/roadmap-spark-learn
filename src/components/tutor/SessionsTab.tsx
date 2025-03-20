import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { MessageCircle, Phone, Video, Calendar, Clock, Star } from 'lucide-react';
import { useTutorSessions } from '@/hooks/useTutorSessions';
import { Session } from '@/types/session';
import { Skeleton } from '@/components/ui/skeleton';

const SessionsTab = () => {
  const { sessions, isLoading, error, updateSessionStatus, provideSessionFeedback, refreshSessions } = useTutorSessions();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);

  // Filter sessions based on active tab
  const upcomingSessions = sessions.filter(s => s.status === 'scheduled');
  const activeSessions = sessions.filter(s => s.status === 'in-progress');
  const pastSessions = sessions.filter(s => s.status === 'completed');

  const handleStartSession = async (session: Session) => {
    // Redirect to Google Meet
    window.open("https://meet.google.com/kho-pjuf-hpt", "_blank");
    
    // Update session status
    await updateSessionStatus(session.id, 'in-progress');
    setActiveTab('active');
  };

  const handleCompleteSession = async (session: Session) => {
    setSelectedSession(session);
    setIsFeedbackDialogOpen(true);
  };

  const handleSubmitFeedback = async () => {
    if (!selectedSession) return;
    
    setIsSubmittingFeedback(true);
    const success = await provideSessionFeedback(selectedSession.id, rating, feedback);
    
    if (success) {
      setIsFeedbackDialogOpen(false);
      setFeedback('');
      setRating(5);
      setSelectedSession(null);
      refreshSessions();
    }
    
    setIsSubmittingFeedback(false);
  };

  const getSessionIcon = (mode: string) => {
    switch (mode) {
      case 'text':
        return <MessageCircle className="mr-2 h-4 w-4" />;
      case 'voice':
        return <Phone className="mr-2 h-4 w-4" />;
      case 'video':
        return <Video className="mr-2 h-4 w-4" />;
      default:
        return <MessageCircle className="mr-2 h-4 w-4" />;
    }
  };

  const renderSessionsList = (sessionsList: Session[]) => {
    if (isLoading) {
      return Array(3).fill(0).map((_, i) => (
        <Card key={i} className="mb-4">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
              <Skeleton className="h-9 w-[100px]" />
            </div>
          </CardContent>
        </Card>
      ));
    }

    if (error) {
      return (
        <Card className="mb-4">
          <CardContent className="p-6 text-center">
            <p className="text-destructive mb-2">Error loading your sessions</p>
            <Button variant="outline" onClick={refreshSessions}>Try Again</Button>
          </CardContent>
        </Card>
      );
    }

    if (sessionsList.length === 0) {
      return (
        <Card className="mb-4">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No sessions found</p>
          </CardContent>
        </Card>
      );
    }

    return sessionsList.map((session) => (
      <Card key={session.id} className="mb-4">
        <CardContent className="p-6">
          <div className="flex items-start flex-col sm:flex-row sm:justify-between gap-4">
            <div className="flex space-x-4">
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-xl font-bold">
                {session.tutorAvatar || session.tutorName.charAt(0)}
              </div>
              <div>
                <h4 className="font-medium">{session.tutorName}</h4>
                <p className="text-sm text-muted-foreground">{session.subject} - {session.topic}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Badge variant="outline" className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    {session.startTime}
                  </Badge>
                  <Badge variant="outline" className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {session.duration}
                  </Badge>
                  <Badge className="flex items-center">
                    {getSessionIcon(session.mode)}
                    {session.mode.charAt(0).toUpperCase() + session.mode.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
              {session.status === 'scheduled' && (
                <Button 
                  onClick={() => handleStartSession(session)}
                  className="w-full sm:w-auto"
                >
                  Start Session
                </Button>
              )}
              
              {session.status === 'in-progress' && (
                <Button 
                  onClick={() => handleCompleteSession(session)}
                  className="w-full sm:w-auto"
                >
                  End Session
                </Button>
              )}
              
              {session.status === 'completed' && (
                <div className="text-right">
                  <div className="flex items-center justify-end mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star}
                        className={`h-4 w-4 ${star <= (session.rating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  {session.feedback && (
                    <p className="text-sm italic text-muted-foreground">"{session.feedback}"</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    ));
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>My Tutoring Sessions</CardTitle>
          <CardDescription>
            View and manage your scheduled, active, and past tutoring sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="upcoming" className="relative">
                Upcoming
                {upcomingSessions.length > 0 && (
                  <Badge className="ml-2 bg-primary text-primary-foreground">
                    {upcomingSessions.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="active" className="relative">
                Active
                {activeSessions.length > 0 && (
                  <Badge className="ml-2 bg-green-500">
                    {activeSessions.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="past">Past Sessions</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              {renderSessionsList(upcomingSessions)}
            </TabsContent>

            <TabsContent value="active">
              {renderSessionsList(activeSessions)}
            </TabsContent>

            <TabsContent value="past">
              {renderSessionsList(pastSessions)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={isFeedbackDialogOpen} onOpenChange={setIsFeedbackDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Session Feedback</DialogTitle>
            <DialogDescription>
              Please rate your session and provide feedback to help us improve.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Rate your experience:</Label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    className={`h-6 w-6 cursor-pointer transition-all ${star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback (optional):</Label>
              <Textarea 
                id="feedback" 
                placeholder="Share your thoughts about the session..." 
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsFeedbackDialogOpen(false)}
              disabled={isSubmittingFeedback}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitFeedback}
              disabled={isSubmittingFeedback}
            >
              {isSubmittingFeedback ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SessionsTab;
