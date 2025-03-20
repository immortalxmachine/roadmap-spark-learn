
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, SessionRequest } from '@/types/session';
import { useToast } from '@/hooks/use-toast';

export const useTutorSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchSessions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if the 'topic' column exists in the tutor_sessions table
      const { data: tableInfo, error: tableError } = await supabase
        .from('tutor_sessions')
        .select('*')
        .limit(1);

      if (tableError) {
        throw tableError;
      }

      // Get the columns available in the table
      const sampleSession = tableInfo && tableInfo[0];
      const hasTopicColumn = sampleSession && 'topic' in sampleSession;

      // Adjust query based on available columns
      const { data: userSessions, error: sessionsError } = await supabase
        .from('tutor_sessions')
        .select(`
          id, 
          subject, 
          ${hasTopicColumn ? 'topic,' : ''}
          start_time, 
          duration, 
          status, 
          mode, 
          rating, 
          feedback,
          tutor_id,
          tutors(id, name, avatar)
        `)
        .order('start_time', { ascending: false });

      if (sessionsError) {
        throw sessionsError;
      }

      if (userSessions) {
        const transformedSessions = userSessions.map((session): Session => ({
          id: session.id,
          tutorName: session.tutors?.name || 'Unknown Tutor',
          tutorAvatar: session.tutors?.avatar || '',
          subject: session.subject,
          topic: session.topic || 'General Session', // Fallback if topic column doesn't exist
          startTime: new Date(session.start_time).toLocaleString(),
          duration: session.duration,
          status: session.status as 'scheduled' | 'in-progress' | 'completed',
          mode: session.mode as 'text' | 'voice' | 'video',
          feedback: session.feedback,
          rating: session.rating
        }));

        setSessions(transformedSessions);
      }
    } catch (err: any) {
      console.error('Error fetching sessions:', err);
      setError(err.message || 'Failed to fetch sessions');
      toast({
        title: 'Error',
        description: 'Failed to load your sessions. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scheduleSession = async (sessionData: SessionRequest) => {
    try {
      // Check if the table has a topic column before inserting
      const { data: tableInfo, error: tableError } = await supabase
        .from('tutor_sessions')
        .select('*')
        .limit(1);

      if (tableError) {
        throw tableError;
      }

      const sampleSession = tableInfo && tableInfo[0];
      const hasTopicColumn = sampleSession && 'topic' in sampleSession;

      // Prepare insert data based on available columns
      const insertData = {
        tutor_id: sessionData.tutor_id,
        subject: sessionData.subject,
        start_time: sessionData.start_time,
        duration: sessionData.duration,
        status: 'scheduled',
        mode: sessionData.mode
      };

      // Only add topic if the column exists
      if (hasTopicColumn) {
        Object.assign(insertData, { topic: sessionData.topic });
      }

      const { error } = await supabase
        .from('tutor_sessions')
        .insert(insertData);

      if (error) {
        throw error;
      }

      toast({
        title: 'Session Scheduled',
        description: 'Your tutoring session has been scheduled successfully.',
      });

      // Refresh the sessions list
      fetchSessions();
      return true;
    } catch (err: any) {
      console.error('Error scheduling session:', err);
      toast({
        title: 'Error',
        description: 'Failed to schedule session. Please try again.',
        variant: 'destructive'
      });
      return false;
    }
  };

  const updateSessionStatus = async (sessionId: string, status: 'scheduled' | 'in-progress' | 'completed') => {
    try {
      const { error } = await supabase
        .from('tutor_sessions')
        .update({ status })
        .eq('id', sessionId);

      if (error) {
        throw error;
      }

      toast({
        title: 'Status Updated',
        description: `Session status changed to ${status}.`,
      });

      // Refresh the sessions list
      fetchSessions();
      return true;
    } catch (err: any) {
      console.error('Error updating session status:', err);
      toast({
        title: 'Error',
        description: 'Failed to update session status. Please try again.',
        variant: 'destructive'
      });
      return false;
    }
  };

  const provideSessionFeedback = async (sessionId: string, rating: number, feedback: string) => {
    try {
      const { error } = await supabase
        .from('tutor_sessions')
        .update({ 
          rating, 
          feedback,
          status: 'completed' 
        })
        .eq('id', sessionId);

      if (error) {
        throw error;
      }

      toast({
        title: 'Feedback Submitted',
        description: 'Thank you for your feedback!',
      });

      // Refresh the sessions list
      fetchSessions();
      return true;
    } catch (err: any) {
      console.error('Error submitting feedback:', err);
      toast({
        title: 'Error',
        description: 'Failed to submit feedback. Please try again.',
        variant: 'destructive'
      });
      return false;
    }
  };

  return { 
    sessions, 
    isLoading, 
    error,
    scheduleSession,
    updateSessionStatus,
    provideSessionFeedback,
    refreshSessions: fetchSessions
  };
};
