import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageCircle, 
  Phone, 
  Video, 
  Calendar, 
  Clock, 
  Send, 
  Star, 
  History,
  FileText,
  Globe
} from 'lucide-react';
import AnimatedAvatar from '@/components/ui/avatar-animated';
import { useToast } from "@/hooks/use-toast";
import { subjects } from '@/data/subjects';
import { Session } from '@/types/session';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Slider } from '@/components/ui/slider';

interface SessionsTabProps {
  activeSessions: Session[];
}

const SessionsTab: React.FC<SessionsTabProps> = ({ activeSessions: initialSessions }) => {
  const [message, setMessage] = useState('');
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [selectedSessionType, setSelectedSessionType] = useState<'text' | 'voice' | 'video'>('video');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [activeSessions, setActiveSessions] = useState<Session[]>(initialSessions);
  const [sessionFilter, setSessionFilter] = useState<'upcoming' | 'past'>('upcoming');
  const [reviewData, setReviewData] = useState<{ rating: number; feedback: string }>({
    rating: 3,
    feedback: '',
  });
  const [sessionBeingReviewed, setSessionBeingReviewed] = useState<number | null>(null);
  const [pastSessions, setPastSessions] = useState<Session[]>([
    {
      id: 101,
      tutorName: "Prof. David Williams",
      tutorAvatar: "DW",
      subject: "Mathematics",
      topic: "Algebra Fundamentals",
      startTime: "May 12, 2023, 11:00 AM",
      duration: "60 minutes",
      status: 'completed',
      mode: 'video',
      rating: 5,
      feedback: "Excellent session! The tutor explained concepts very clearly."
    },
    {
      id: 102,
      tutorName: "Dr. Emily Peterson",
      tutorAvatar: "EP",
      subject: "Biology",
      topic: "Cell Structure and Function",
      startTime: "April 28, 2023, 02:00 PM",
      duration: "45 minutes",
      status: 'completed',
      mode: 'text',
      rating: 4
    }
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('english');

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

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    toast({
      title: "Message sent",
      description: "Your message has been sent to the tutor.",
    });
    setMessage('');
  };

  const handleJoinSession = (sessionId: number) => {
    toast({
      title: "Joining session",
      description: "Connecting to your tutoring session...",
    });
    
    setTimeout(() => {
      window.open(`/session/${sessionId}`, '_blank');
    }, 1000);
  };

  const handleScheduleSession = () => {
    if (!selectedSubject || !date || !selectedTime || !selectedDuration || !topic) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields to schedule a session.",
        variant: "destructive"
      });
      return;
    }
    
    const newSession: Session = {
      id: Math.floor(Math.random() * 1000) + activeSessions.length + 1,
      tutorName: "Dr. Sarah Johnson",
      tutorAvatar: "SJ",
      subject: selectedSubject,
      topic: topic,
      startTime: `${format(date, 'PPP')}, ${selectedTime}`,
      duration: `${selectedDuration} minutes`,
      status: 'scheduled',
      mode: selectedSessionType,
      language: selectedLanguage
    };
    
    setActiveSessions([...activeSessions, newSession]);
    
    toast({
      title: "Session scheduled!",
      description: `Your ${selectedDuration} minute ${selectedSessionType} session in ${selectedLanguage} has been scheduled for ${format(date, 'PPP')} at ${selectedTime}.`,
    });
    
    setSelectedSubject('');
    setDate(undefined);
    setSelectedTime('');
    setSelectedDuration('');
    setTopic('');
    setSelectedSessionType('video');
    setSelectedLanguage('english');
  };

  const handleCancelSession = (sessionId: number) => {
    toast({
      title: "Session canceled",
      description: "Your session has been canceled.",
    });
    
    setActiveSessions(activeSessions.filter(session => session.id !== sessionId));
  };

  const handleAddToCalendar = (session: Session) => {
    toast({
      title: "Added to calendar",
      description: `${session.topic} with ${session.tutorName} has been added to your calendar.`,
    });
  };

  const handleSubmitReview = (sessionId: number) => {
    if (!sessionBeingReviewed) return;

    setPastSessions(prevSessions => 
      prevSessions.map(session => 
        session.id === sessionId 
          ? { ...session, rating: reviewData.rating, feedback: reviewData.feedback }
          : session
      )
    );

    setSessionBeingReviewed(null);
    setReviewData({ rating: 3, feedback: '' });

    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
  };

  const handleStartReview = (sessionId: number) => {
    const session = pastSessions.find(s => s.id === sessionId);
    setSessionBeingReviewed(sessionId);
    
    if (session) {
      setReviewData({
        rating: session.rating || 3,
        feedback: session.feedback || '',
      });
    }
  };

  const renderStarRating = (rating: number | undefined) => {
    if (!rating) return "Not rated";
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star 
            key={index} 
            className={`h-4 w-4 ${index < rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`} 
          />
        ))}
      </div>
    );
  };

  const today = new Date();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              My Tutoring Sessions
            </CardTitle>
            <CardDescription>
              View and manage your upcoming and past tutoring sessions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="border-b">
              <div className="flex border-b">
                <button 
                  className={`flex-1 px-4 py-2 text-sm font-medium text-center ${
                    sessionFilter === 'upcoming' 
                      ? 'border-b-2 border-primary text-primary' 
                      : 'text-muted-foreground'
                  }`}
                  onClick={() => setSessionFilter('upcoming')}
                >
                  Active & Upcoming
                </button>
                <button 
                  className={`flex-1 px-4 py-2 text-sm font-medium text-center ${
                    sessionFilter === 'past' 
                      ? 'border-b-2 border-primary text-primary' 
                      : 'text-muted-foreground'
                  }`}
                  onClick={() => setSessionFilter('past')}
                >
                  <History className="h-4 w-4 inline mr-1" />
                  Past Sessions
                </button>
              </div>
            </div>
            
            {sessionFilter === 'upcoming' && (
              <div className="divide-y">
                {activeSessions.length > 0 ? (
                  activeSessions.map((session) => (
                    <div key={session.id} className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start space-x-4">
                          <AnimatedAvatar 
                            fallback={session.tutorAvatar} 
                            size="md" 
                            animation={session.status === 'in-progress' ? 'pulse' : 'none'}
                            className={session.status === 'in-progress' ? 'ring-2 ring-green-500' : ''}
                          />
                          <div>
                            <h3 className="font-medium">{session.topic}</h3>
                            <p className="text-sm text-muted-foreground mb-1">
                              with {session.tutorName} • {session.subject}
                            </p>
                            <div className="flex flex-wrap gap-3 text-sm">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                {session.startTime}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                {session.duration}
                              </div>
                              <div className="flex items-center">
                                {session.mode === 'video' ? (
                                  <Video className="h-4 w-4 mr-1 text-muted-foreground" />
                                ) : session.mode === 'voice' ? (
                                  <Phone className="h-4 w-4 mr-1 text-muted-foreground" />
                                ) : (
                                  <MessageCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                                )}
                                {session.mode.charAt(0).toUpperCase() + session.mode.slice(1)} Session
                              </div>
                              {session.language && (
                                <div className="flex items-center">
                                  <Globe className="h-4 w-4 mr-1 text-muted-foreground" />
                                  {session.language}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 flex-wrap">
                          {session.status === 'in-progress' ? (
                            <>
                              <Badge className="bg-green-500">In Progress</Badge>
                              <Button onClick={() => handleJoinSession(session.id)}>
                                Join Now
                              </Button>
                            </>
                          ) : session.status === 'scheduled' ? (
                            <>
                              <Badge variant="outline">Scheduled</Badge>
                              <Button variant="outline" onClick={() => handleAddToCalendar(session)}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Add to Calendar
                              </Button>
                              <Button variant="destructive" onClick={() => handleCancelSession(session.id)}>
                                Cancel
                              </Button>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">You don't have any active sessions yet.</p>
                    <Button className="mt-4" onClick={() => document.getElementById('schedule-session')?.scrollIntoView({ behavior: 'smooth' })}>
                      Schedule Your First Session
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            {sessionFilter === 'past' && (
              <div className="p-6">
                {pastSessions.length > 0 ? (
                  <div className="space-y-8">
                    {sessionBeingReviewed && (
                      <div className="bg-secondary/30 p-6 rounded-lg border mb-6">
                        <h3 className="text-lg font-medium mb-4">Rate Your Session</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Rating</Label>
                            <div className="flex items-center space-x-2">
                              <Slider 
                                value={[reviewData.rating]} 
                                min={1} 
                                max={5} 
                                step={1}
                                onValueChange={(value) => setReviewData({...reviewData, rating: value[0]})}
                                className="max-w-[200px]"
                              />
                              <div className="flex">
                                {[...Array(5)].map((_, index) => (
                                  <Star
                                    key={index}
                                    onClick={() => setReviewData({...reviewData, rating: index + 1})}
                                    className={`h-5 w-5 cursor-pointer ${
                                      index < reviewData.rating 
                                        ? "text-amber-500 fill-amber-500" 
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Feedback (Optional)</Label>
                            <Textarea 
                              placeholder="Share your experience with the tutor..."
                              value={reviewData.feedback}
                              onChange={(e) => setReviewData({...reviewData, feedback: e.target.value})}
                            />
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              onClick={() => handleSubmitReview(sessionBeingReviewed)}
                              className="w-full"
                            >
                              Submit Review
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => setSessionBeingReviewed(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Topic</TableHead>
                          <TableHead>Tutor</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Language</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pastSessions.map((session) => (
                          <TableRow key={session.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                {session.mode === 'video' ? (
                                  <Video className="h-4 w-4 mr-2 text-muted-foreground" />
                                ) : session.mode === 'voice' ? (
                                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                                ) : (
                                  <MessageCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                                )}
                                {session.topic}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <AnimatedAvatar 
                                  fallback={session.tutorAvatar} 
                                  size="sm" 
                                />
                                <span>{session.tutorName}</span>
                              </div>
                            </TableCell>
                            <TableCell>{session.startTime}</TableCell>
                            <TableCell>{session.duration}</TableCell>
                            <TableCell>{session.language || 'English'}</TableCell>
                            <TableCell>
                              {renderStarRating(session.rating)}
                            </TableCell>
                            <TableCell className="text-right">
                              {session.rating ? (
                                <Button variant="ghost" size="sm" className="h-8">
                                  <FileText className="h-4 w-4 mr-2" />
                                  Notes
                                </Button>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-8"
                                  onClick={() => handleStartReview(session.id)}
                                >
                                  <Star className="h-4 w-4 mr-2" />
                                  Rate
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">You don't have any past sessions yet.</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-1">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Chat with Tutor</CardTitle>
            <CardDescription>
              Send a message to your current tutor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3 mb-4">
              <AnimatedAvatar fallback="SJ" size="sm" />
              <div>
                <p className="text-sm font-medium">Dr. Sarah Johnson</p>
                <p className="text-xs text-muted-foreground">Physics Tutor</p>
              </div>
              <Badge className="ml-auto bg-green-500">Online</Badge>
            </div>
            
            <div className="border rounded-md p-4 mb-4 h-[200px] overflow-y-auto bg-secondary/30 chat-messages">
              <div className="space-y-4">
                <div className="flex justify-start">
                  <div className="bg-secondary rounded-lg p-2 max-w-[80%]">
                    <p className="text-sm">Hello! How can I help with your physics questions today?</p>
                    <span className="text-xs text-muted-foreground">10:34 AM</span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-primary/10 rounded-lg p-2 max-w-[80%]">
                    <p className="text-sm">I'm having trouble understanding Newton's Third Law. Could you explain it with examples?</p>
                    <span className="text-xs text-muted-foreground">10:36 AM</span>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-secondary rounded-lg p-2 max-w-[80%]">
                    <p className="text-sm">Sure! Newton's Third Law states that for every action, there's an equal and opposite reaction. For example, when you push against a wall, the wall pushes back with equal force.</p>
                    <span className="text-xs text-muted-foreground">10:38 AM</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
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
      </div>
    </div>
  );
};

export default SessionsTab;
