
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Session } from '@/types/session';
import SessionTabs from './sessions/SessionTabs';
import ScheduleSessionForm from './sessions/ScheduleSessionForm';

interface SessionsTabProps {
  activeSessions?: Session[];
  pastSessions?: Session[];
  onJoinSession?: (sessionId: number) => void;
  onCancelSession?: (sessionId: number) => void;
  onAddToCalendar?: (session: Session) => void;
  onReviewSubmit?: (sessionId: number, rating: number, feedback: string) => void;
}

const SessionsTab: React.FC<SessionsTabProps> = ({
  activeSessions = [],
  pastSessions = [],
  onJoinSession = () => {},
  onCancelSession = () => {},
  onAddToCalendar = () => {},
  onReviewSubmit = () => {}
}) => {
  const [sessionFilter, setSessionFilter] = useState<'upcoming' | 'past'>('upcoming');
  const [scheduleTab, setScheduleTab] = useState<'active' | 'schedule'>('active');

  const handleFilterChange = (filter: 'upcoming' | 'past') => {
    setSessionFilter(filter);
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Sessions List */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Your Sessions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={scheduleTab} onValueChange={(value) => setScheduleTab(value as 'active' | 'schedule')}>
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="active">Active Sessions</TabsTrigger>
              <TabsTrigger value="schedule">Schedule New</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="border-t pt-0">
              <SessionTabs
                activeSessions={activeSessions}
                pastSessions={pastSessions}
                sessionFilter={sessionFilter}
                onFilterChange={handleFilterChange}
                onJoinSession={onJoinSession}
                onCancelSession={onCancelSession}
                onAddToCalendar={onAddToCalendar}
                onReviewSubmit={onReviewSubmit}
              />
            </TabsContent>
            <TabsContent value="schedule">
              <div className="p-4">
                <ScheduleSessionForm />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Tutor Chat / Tips */}
      <Card>
        <CardHeader>
          <CardTitle>
            {sessionFilter === 'upcoming' 
              ? "Session Tips" 
              : "Review Guidelines"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessionFilter === 'upcoming' ? (
              <>
                <p className="text-sm text-muted-foreground">
                  Get the most out of your tutoring sessions with these tips:
                </p>
                <ul className="text-sm space-y-2 list-disc pl-5">
                  <li>Prepare specific questions or topics you want to cover</li>
                  <li>Have your study materials ready before the session</li>
                  <li>Test your microphone and camera before joining</li>
                  <li>Take notes during your session</li>
                  <li>Follow up on concepts you didn't fully understand</li>
                </ul>
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  When leaving reviews for your tutors:
                </p>
                <ul className="text-sm space-y-2 list-disc pl-5">
                  <li>Be specific about what was helpful</li>
                  <li>Mention teaching techniques that worked for you</li>
                  <li>Provide constructive feedback</li>
                  <li>Your feedback helps tutors improve and helps other students</li>
                </ul>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionsTab;
