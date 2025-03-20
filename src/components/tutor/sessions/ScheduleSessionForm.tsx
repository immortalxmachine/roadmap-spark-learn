
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Phone, Video, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { subjects } from '@/data/subjects';

interface ScheduleSessionFormProps {
  onSchedule: (
    subject: string, 
    topic: string, 
    date: Date, 
    time: string, 
    duration: string, 
    sessionType: 'text' | 'voice' | 'video',
    language: string
  ) => void;
}

const ScheduleSessionForm: React.FC<ScheduleSessionFormProps> = ({ onSchedule }) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [selectedSessionType, setSelectedSessionType] = useState<'text' | 'voice' | 'video'>('video');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('english');

  const today = new Date();

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

  const handleScheduleSession = () => {
    if (!selectedSubject || !date || !selectedTime || !selectedDuration || !topic) {
      return;
    }
    
    onSchedule(
      selectedSubject,
      topic,
      date,
      selectedTime,
      selectedDuration,
      selectedSessionType,
      selectedLanguage
    );
    
    // Reset form
    setSelectedSubject('');
    setDate(undefined);
    setSelectedTime('');
    setSelectedDuration('');
    setTopic('');
    setSelectedSessionType('video');
    setSelectedLanguage('english');
  };

  return (
    <Card id="schedule-session">
      <CardHeader>
        <CardTitle>Schedule New Session</CardTitle>
        <CardDescription>
          Book a one-on-one tutoring session
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Subject</Label>
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
            <Label>Topic</Label>
            <Input 
              placeholder="What do you need help with?"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Language</Label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.value} value={language.value}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < today}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label>Time</Label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                <SelectItem value="01:00 PM">01:00 PM</SelectItem>
                <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                <SelectItem value="03:00 PM">03:00 PM</SelectItem>
                <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                <SelectItem value="05:00 PM">05:00 PM</SelectItem>
                <SelectItem value="06:00 PM">06:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Session Duration</Label>
            <Select value={selectedDuration} onValueChange={setSelectedDuration}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
                <SelectItem value="90">90 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Session Type</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant={selectedSessionType === 'text' ? 'default' : 'outline'} 
                className="flex flex-col items-center justify-center h-20"
                onClick={() => setSelectedSessionType('text')}
              >
                <MessageCircle className="mb-1 h-5 w-5" />
                <span className="text-xs">Text</span>
              </Button>
              <Button 
                variant={selectedSessionType === 'voice' ? 'default' : 'outline'} 
                className="flex flex-col items-center justify-center h-20"
                onClick={() => setSelectedSessionType('voice')}
              >
                <Phone className="mb-1 h-5 w-5" />
                <span className="text-xs">Voice</span>
              </Button>
              <Button 
                variant={selectedSessionType === 'video' ? 'default' : 'outline'} 
                className="flex flex-col items-center justify-center h-20"
                onClick={() => setSelectedSessionType('video')}
              >
                <Video className="mb-1 h-5 w-5" />
                <span className="text-xs">Video</span>
              </Button>
            </div>
          </div>
          
          <Button className="w-full" onClick={handleScheduleSession}>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleSessionForm;
