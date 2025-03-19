
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { TutorFilters } from '@/types/tutor';

interface TutorFiltersContextType {
  filters: TutorFilters;
  setFilters: React.Dispatch<React.SetStateAction<TutorFilters>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}

const TutorFiltersContext = createContext<TutorFiltersContextType | undefined>(undefined);

export const useTutorFilters = () => {
  const context = useContext(TutorFiltersContext);
  if (!context) {
    throw new Error('useTutorFilters must be used within a TutorFiltersProvider');
  }
  return context;
};

interface TutorFiltersProviderProps {
  children: ReactNode;
}

export const TutorFiltersProvider: React.FC<TutorFiltersProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<TutorFilters>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <TutorFiltersContext.Provider value={{ 
      filters, 
      setFilters,
      searchQuery,
      setSearchQuery,
      isSubmitting,
      setIsSubmitting
    }}>
      {children}
    </TutorFiltersContext.Provider>
  );
};
