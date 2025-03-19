
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tutor, TutorFilters } from '@/types/tutor';
import { useToast } from '@/hooks/use-toast';

export const useTutors = (filters?: TutorFilters) => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTutors = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let query = supabase.from('tutors').select('*');

        // Apply filters if they exist
        if (filters?.subject) {
          query = query.eq('specialty', filters.subject);
        }

        if (filters?.availability) {
          query = query.eq('status', filters.availability);
        }

        if (filters?.communicationMode) {
          query = query.contains('communication_modes', [filters.communicationMode]);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        // Transform the data to match our Tutor interface
        const transformedData = data.map((tutor): Tutor => ({
          id: tutor.id,
          name: tutor.name,
          specialty: tutor.specialty,
          expertise: tutor.expertise,
          rating: tutor.rating,
          reviews: tutor.reviews,
          status: tutor.status as 'available' | 'busy' | 'scheduled',
          avatar: tutor.avatar,
          level: tutor.level,
          badges: tutor.badges || [],
          communicationModes: tutor.communication_modes,
          available_in: tutor.available_in,
          next_session: tutor.next_session
        }));

        setTutors(transformedData);
      } catch (err: any) {
        console.error('Error fetching tutors:', err);
        setError(err.message || 'Failed to fetch tutors');
        toast({
          title: 'Error',
          description: 'Failed to load tutors. Please try again later.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutors();
  }, [filters, toast]);

  return { tutors, isLoading, error };
};
