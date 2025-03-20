
import React from 'react';
import { Tutor } from '@/types/tutor';
import TutorSearchForm from './TutorSearchForm';
import TutorResults from './TutorResults';
import { TutorFiltersProvider } from '@/contexts/TutorFiltersContext';

interface FindTutorTabProps {
  onScheduleWithTutor?: (tutor: Tutor) => void;
}

const FindTutorTab: React.FC<FindTutorTabProps> = ({ onScheduleWithTutor }) => {
  return (
    <TutorFiltersProvider>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TutorSearchForm />
        </div>
        
        <div className="lg:col-span-2">
          <TutorResults onScheduleWithTutor={onScheduleWithTutor} />
        </div>
      </div>
    </TutorFiltersProvider>
  );
};

export default FindTutorTab;
