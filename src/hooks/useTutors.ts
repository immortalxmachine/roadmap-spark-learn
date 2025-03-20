
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

        if (filters?.availability) {
          // Note: This assumes 'status' column exists or we're using active_session
          if (filters.availability === 'available') {
            query = query.eq('active_session', false);
          } else {
            query = query.eq('active_session', true);
          }
        }

        if (filters?.communicationMode) {
          // This assumes communication_modes is a JSON array
          query = query.contains('communication_modes', [filters.communicationMode]);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        // Transform the data to match our Tutor interface
        const transformedData = data.map((tutor): Tutor => {
          // Safely parse JSON fields
          const parseJsonArray = (json: Json | null): string[] => {
            if (Array.isArray(json)) {
              return json.map(item => String(item));
            }
            if (typeof json === 'string') {
              try {
                const parsed = JSON.parse(json);
                return Array.isArray(parsed) ? parsed.map(String) : [];
              } catch {
                return [];
              }
            }
            return [];
          };

          // Convert expertise and badges
          const expertise = parseJsonArray(tutor.expertise);
          const badges = parseJsonArray(tutor.badges);
          const communicationModes = parseJsonArray(tutor.communication_modes);

          // Create tutor with default values
          return {
            id: tutor.id,
            name: tutor.name,
            specialty: tutor.specialty || 'General',
            expertise: expertise,
            rating: tutor.rating || 0,
            reviews: 0, // Default value since it doesn't exist in DB
            status: tutor.active_session ? 'busy' : 'available', // Derive status from active_session
            avatar: tutor.avatar || '',
            level: 1, // Default value since it doesn't exist in DB
            badges: badges,
            communicationModes: communicationModes,
            available_in: '10 minutes', // Default value 
            next_session: 'Tomorrow' // Default value
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
