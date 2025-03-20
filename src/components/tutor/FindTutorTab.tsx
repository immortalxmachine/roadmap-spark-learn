
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Phone, Video, Calendar, Search, Filter, Upload, Globe } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { subjects } from '@/data/subjects';
import TutorCard from './TutorCard';
import { Tutor } from '@/types/tutor';

interface FindTutorTabProps {
  tutors: Tutor[];
  onScheduleWithTutor?: (tutor: Tutor) => void;
}

// Available languages list
const languages = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'german', label: 'German' },
  { value: 'russian', label: 'Russian' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'portuguese', label: 'Portuguese' },
  { value: 'japanese', label: 'Japanese' },
];

const FindTutorTab: React.FC<FindTutorTabProps> = ({ tutors, onScheduleWithTutor }) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [urgencyLevel, setUrgencyLevel] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [commPreferences, setCommPreferences] = useState<{ 
    text: boolean; 
    voice: boolean; 
    video: boolean 
  }>({ text: false, voice: false, video: false });
  const [filteredTutors, setFilteredTutors] = useState<Tutor[]>(tutors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  // When tutors prop changes, update the filtered tutors
  useEffect(() => {
    setFilteredTutors(tutors);
  }, [tutors]);

  // Update filtered tutors when search query changes
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
    
    // Find the best matching tutors
    const matchedTutors = findMatchingTutors();
    setFilteredTutors(matchedTutors.length > 0 ? matchedTutors : tutors);
    
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Tutoring request submitted!",
        description: `We've found ${matchedTutors.length} tutors that match your request.`,
      });
    }, 1000);
  };

  const findMatchingTutors = () => {
    // Match tutors by subject, language, and communication preferences
    return tutors.filter(tutor => {
      // Match by subject
      const subjectMatch = tutor.specialty.toLowerCase() === selectedSubject.toLowerCase() ||
        tutor.expertise.some(exp => exp.toLowerCase().includes(selectedSubject.toLowerCase()));
      
      // Match by language if selected
      const languageMatch = !selectedLanguage || 
        (tutor.languages && tutor.languages.some(lang => 
          lang.toLowerCase() === selectedLanguage.toLowerCase()));
      
      // Match by communication preference if any selected
      const commMatch = !Object.values(commPreferences).some(Boolean) || 
        (commPreferences.text && tutor.communicationModes.includes('text')) ||
        (commPreferences.voice && tutor.communicationModes.includes('voice')) ||
        (commPreferences.video && tutor.communicationModes.includes('video'));
      
      // Prioritize available tutors if urgency is high
      const urgencyMatch = urgencyLevel !== 'high' || tutor.status === 'available';
      
      return subjectMatch && languageMatch && commMatch && urgencyMatch;
    });
  };

  const handleFilterChange = (subject: string) => {
    if (subject === "all") {
      setFilteredTutors(tutors);
      return;
    }
    
    setIsSearching(true);
    
    setTimeout(() => {
      const filtered = tutors.filter(tutor => 
        tutor.specialty.toLowerCase() === subject.toLowerCase() ||
        tutor.expertise.some(exp => exp.toLowerCase().includes(subject.toLowerCase()))
      );
      setFilteredTutors(filtered);
      setIsSearching(false);
    }, 500);
  };

  const handleLanguageFilterChange = (language: string) => {
    setIsSearching(true);
    
    setTimeout(() => {
      if (language === "all") {
        setFilteredTutors(tutors);
      } else {
        const filtered = tutors.filter(tutor => 
          tutor.languages && tutor.languages.some(lang => 
            lang.toLowerCase() === language.toLowerCase())
        );
        setFilteredTutors(filtered);
      }
      setIsSearching(false);
    }, 500);
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
                <Label htmlFor="language">Preferred Language</Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Language</SelectItem>
                    {languages.map((language) => (
                      <SelectItem key={language.value} value={language.value}>
                        {language.label}
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
                <Select onValueChange={handleLanguageFilterChange}>
                  <SelectTrigger className="w-[160px] h-8">
                    <SelectValue placeholder="Filter by language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    {languages.map((language) => (
                      <SelectItem key={language.value} value={language.value}>
                        {language.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <CardDescription>
              {isSearching ? "Searching for tutors..." : 
                `Showing ${filteredTutors.length} tutor${filteredTutors.length !== 1 ? 's' : ''}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredTutors.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No tutors found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setFilteredTutors(tutors)}
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
