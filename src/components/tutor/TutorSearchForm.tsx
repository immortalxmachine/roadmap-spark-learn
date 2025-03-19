
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Phone, Video, Search, Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { subjects } from '@/data/subjects';
import { TutorFilters } from '@/types/tutor';
import { useTutorFilters } from '@/contexts/TutorFiltersContext';

const TutorSearchForm: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [urgencyLevel, setUrgencyLevel] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [commPreferences, setCommPreferences] = useState<{ 
    text: boolean; 
    voice: boolean; 
    video: boolean 
  }>({ text: false, voice: false, video: false });
  
  const { setFilters, setIsSubmitting } = useTutorFilters();
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

  const toggleCommPreference = (type: 'text' | 'voice' | 'video') => {
    setCommPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
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
  );
};

export default TutorSearchForm;
