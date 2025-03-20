
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tutor, TutorFilters } from '@/types/tutor';
import { useToast } from '@/hooks/use-toast';
import { Json } from '@/integrations/supabase/types';

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

        // We're using active_session instead of "status" in our database
        if (filters?.availability) {
          query = query.eq('active_session', filters.availability === 'busy');
        }

        if (filters?.communicationMode) {
          // Using contains with a string value since our DB uses JSONB arrays
          query = query.contains('communication_modes', [filters.communicationMode]);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        // Transform the data to match our Tutor interface
        const transformedData = data.map((tutor): Tutor => {
          // Safely convert values to match the Tutor interface
          const communicationModesArray = Array.isArray(tutor.communication_modes) 
            ? tutor.communication_modes 
            : (tutor.communication_modes ? [tutor.communication_modes.toString()] : []);
            
          const badgesArray = Array.isArray(tutor.badges) 
            ? tutor.badges 
            : (tutor.badges ? [tutor.badges.toString()] : []);

          const expertiseArray = tutor.expertise 
            ? (Array.isArray(tutor.expertise) ? tutor.expertise : [tutor.expertise.toString()]) 
            : [];

          return {
            id: tutor.id,
            name: tutor.name,
            specialty: tutor.specialty || '',
            expertise: expertiseArray,
            rating: tutor.rating || 0,
            reviews: 0, // Default value since it's not in DB
            status: tutor.active_session ? 'busy' : 'available', // Convert boolean to status
            avatar: tutor.avatar || '',
            level: 1, // Default value since it's not in DB
            badges: badgesArray,
            communicationModes: communicationModesArray,
            available_in: 'Now', // Default value since it's not in DB
            next_session: 'N/A' // Default value since it's not in DB
          };
        });

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
