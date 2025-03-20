
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Tutor } from '@/types/tutor';
import { subjects } from '@/data/subjects';
import TutorCard from './TutorCard';
import { useTutors } from '@/hooks/useTutors';
import { useTutorFilters } from '@/contexts/TutorFiltersContext';

interface TutorResultsProps {
  onScheduleWithTutor?: (tutor: Tutor) => void;
}

const TutorResults: React.FC<TutorResultsProps> = ({ onScheduleWithTutor }) => {
  const { filters, setFilters, searchQuery, setSearchQuery } = useTutorFilters();
  const { tutors, isLoading, error } = useTutors(filters);
  const [filteredTutors, setFilteredTutors] = useState<Tutor[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTutors(tutors);
      return;
    }
    
    const lowercaseQuery = searchQuery.toLowerCase();
    const results = tutors.filter(tutor => 
      tutor.name.toLowerCase().includes(lowercaseQuery) ||
      tutor.specialty.toLowerCase().includes(lowercaseQuery) ||
      tutor.expertise.some(skill => skill.toLowerCase().includes(lowercaseQuery))
    );
    
    setFilteredTutors(results);
  }, [searchQuery, tutors]);

  const handleFilterChange = (subject: string) => {
    if (subject === "all") {
      setFilters({});
      return;
    }
    
    setFilters(prev => ({
      ...prev,
      subject
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Available Tutors</CardTitle>
          <div className="flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Search tutors..."
              className="h-8 w-[180px]"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Select onValueChange={handleFilterChange}>
              <SelectTrigger className="w-[160px] h-8">
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject.value} value={subject.value}>
                    {subject.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <CardDescription>
          {isLoading ? "Loading tutors..." : 
            `Showing ${filteredTutors.length} tutor${filteredTutors.length !== 1 ? 's' : ''}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 p-4 border rounded-lg">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                  <div className="flex gap-2">
                    <Skeleton className="h-3 w-[60px]" />
                    <Skeleton className="h-3 w-[80px]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-9 w-[100px]" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-destructive">Error loading tutors: {error}</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setFilters({})}
            >
              Try again
            </Button>
          </div>
        ) : filteredTutors.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No tutors found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setFilters({})}
            >
              Show all tutors
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTutors.map((tutor) => (
              <TutorCard 
                key={tutor.id} 
                tutor={tutor} 
                onSchedule={onScheduleWithTutor}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TutorResults;
