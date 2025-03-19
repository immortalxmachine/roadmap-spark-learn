import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Phone, Video, Calendar, Search, Filter, Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { subjects } from '@/data/subjects';
import TutorCard from './TutorCard';
import { Tutor, TutorFilters } from '@/types/tutor';
import { useTutors } from '@/hooks/useTutors';
import { Skeleton } from '@/components/ui/skeleton';

interface FindTutorTabProps {
  onScheduleWithTutor?: (tutor: Tutor) => void;
}

const FindTutorTab: React.FC<FindTutorTabProps> = ({ onScheduleWithTutor }) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [urgencyLevel, setUrgencyLevel] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [commPreferences, setCommPreferences] = useState<{ 
    text: boolean; 
    voice: boolean; 
    video: boolean 
  }>({ text: false, voice: false, video: false });
  const [filters, setFilters] = useState<TutorFilters>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
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

  const handleSubmitRequest = () => {
    if (!selectedSubject || !question) {
      toast({
        title: "Missing information",
        description: "Please select a subject and describe your question.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    const newFilters: TutorFilters = { subject: selectedSubject };
    
    const selectedModes = [];
    if (commPreferences.text) selectedModes.push('text');
    if (commPreferences.voice) selectedModes.push('voice');
    if (commPreferences.video) selectedModes.push('video');
    
    if (selectedModes.length > 0) {
      newFilters.communicationMode = selectedModes[0];
    }
    
    if (urgencyLevel === 'high') {
      newFilters.availability = 'available';
    }
    
    setFilters(newFilters);
    
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Tutoring request submitted!",
        description: `We're matching you with tutors based on your request.`,
      });
    }, 1000);
  };

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

  const toggleCommPreference = (type: 'text' | 'voice' | 'video') => {
    setCommPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Find a Tutor
            </CardTitle>
            <CardDescription>
              Submit your query and get connected with a volunteer tutor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.value} value={subject.value}>
                        {subject.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="question">Your Question</Label>
                <Textarea 
                  placeholder="Describe your question or topic you need help with..."
                  className="min-h-[120px]"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Preferred Communication</Label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="comm-text" 
                      checked={commPreferences.text}
                      onCheckedChange={() => toggleCommPreference('text')}
                    />
                    <Label htmlFor="comm-text" className="text-sm flex items-center">
                      <MessageCircle className="mr-1 h-4 w-4" />
                      Text
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="comm-voice" 
                      checked={commPreferences.voice}
                      onCheckedChange={() => toggleCommPreference('voice')}
                    />
                    <Label htmlFor="comm-voice" className="text-sm flex items-center">
                      <Phone className="mr-1 h-4 w-4" />
                      Voice
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="comm-video" 
                      checked={commPreferences.video}
                      onCheckedChange={() => toggleCommPreference('video')}
                    />
                    <Label htmlFor="comm-video" className="text-sm flex items-center">
                      <Video className="mr-1 h-4 w-4" />
                      Video
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Urgency Level</Label>
                <Select value={urgencyLevel} onValueChange={setUrgencyLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Within a few days</SelectItem>
                    <SelectItem value="medium">Medium - Within 24 hours</SelectItem>
                    <SelectItem value="high">High - As soon as possible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file" className="text-sm flex items-center">
                  <Upload className="mr-2 h-4 w-4" />
                  Attach Files (Optional)
                </Label>
                <Input id="file" type="file" />
                <p className="text-xs text-muted-foreground">
                  Upload images, PDFs, or documents to provide more context.
                </p>
              </div>

              <Button 
                type="button" 
                className="w-full" 
                onClick={handleSubmitRequest}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Finding tutors..." : "Submit Tutoring Request"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-2">
        <Card className="mb-6">
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
      </div>
    </div>
  );
};

export default FindTutorTab;
