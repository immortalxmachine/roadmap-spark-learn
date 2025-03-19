
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Phone, Video, Calendar, Star, GraduationCap, Award, Upload, Search, Filter, Heart } from 'lucide-react';
import AnimatedAvatar from '@/components/ui/avatar-animated';
import { useToast } from "@/hooks/use-toast";
import { subjects } from '@/data/subjects';
import TutorCard from './TutorCard';
import { Tutor } from '@/types/tutor';

interface FindTutorTabProps {
  tutors: Tutor[];
}

const FindTutorTab: React.FC<FindTutorTabProps> = ({ tutors }) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [urgencyLevel, setUrgencyLevel] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [commPreferences, setCommPreferences] = useState<{ 
    text: boolean; 
    voice: boolean; 
    video: boolean 
  }>({ text: false, voice: false, video: false });
  const [filteredTutors, setFilteredTutors] = useState<Tutor[]>(tutors);
  const { toast } = useToast();

  const handleSubmitRequest = () => {
    if (!selectedSubject || !question) {
      toast({
        title: "Missing information",
        description: "Please select a subject and describe your question.",
        variant: "destructive"
      });
      return;
    }

    // Filter tutors based on subject and communication preferences
    const matchedTutors = tutors.filter(tutor => {
      // Match by subject
      const subjectMatch = tutor.specialty.toLowerCase() === selectedSubject.toLowerCase() ||
        tutor.expertise.some(exp => exp.toLowerCase().includes(selectedSubject.toLowerCase()));
      
      // Match by communication preference if any selected
      const commMatch = !Object.values(commPreferences).some(Boolean) || 
        (commPreferences.text && tutor.communicationModes.includes('text')) ||
        (commPreferences.voice && tutor.communicationModes.includes('voice')) ||
        (commPreferences.video && tutor.communicationModes.includes('video'));
      
      return subjectMatch && commMatch;
    });

    setFilteredTutors(matchedTutors.length > 0 ? matchedTutors : tutors);

    toast({
      title: "Tutoring request submitted!",
      description: "We'll match you with a tutor shortly.",
    });
  };

  const handleFilterChange = (subject: string) => {
    if (subject === "all") {
      setFilteredTutors(tutors);
      return;
    }
    
    const filtered = tutors.filter(tutor => 
      tutor.specialty.toLowerCase() === subject.toLowerCase() ||
      tutor.expertise.some(exp => exp.toLowerCase().includes(subject.toLowerCase()))
    );
    setFilteredTutors(filtered);
  };

  const toggleCommPreference = (type: 'text' | 'voice' | 'video') => {
    setCommPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
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
              >
                Submit Tutoring Request
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
              <div className="flex items-center">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 mr-2">
                  <Filter className="h-4 w-4" />
                </Button>
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
              Browse and connect with our volunteer tutors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTutors.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FindTutorTab;
