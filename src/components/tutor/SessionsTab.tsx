
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { MessageCircle, Phone, Video, Calendar, Clock, Send } from 'lucide-react';
import AnimatedAvatar from '@/components/ui/avatar-animated';
import { useToast } from "@/hooks/use-toast";
import { subjects } from '@/data/subjects';
import { Session } from '@/types/session';

interface SessionsTabProps {
  activeSessions: Session[];
}

const SessionsTab: React.FC<SessionsTabProps> = ({ activeSessions }) => {
  const [message, setMessage] = useState('');
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [selectedSessionType, setSelectedSessionType] = useState<'text' | 'voice' | 'video'>('video');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  
  // Handler for sending a message
  const handleSendMessage = () => {
    if (message.trim() === '') return;
    toast({
      title: "Message sent",
      description: "Your message has been sent to the tutor.",
    });
    setMessage('');
  };
  
  // Handler for joining a session
  const handleJoinSession = (sessionId: number) => {
    toast({
      title: "Joining session",
      description: "Connecting to your tutoring session...",
    });
    
    // In a real application, this would redirect to the session room or open a modal
    window.open(`/session/${sessionId}`, '_blank');
  };
  
  // Handler for scheduling a new session
  const handleScheduleSession = () => {
    if (!selectedSubject || !selectedDate || !selectedTime || !selectedDuration) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields to schedule a session.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Session scheduled!",
      description: `Your ${selectedDuration} minute ${selectedSessionType} session has been scheduled.`,
    });
    
    // Reset form
    setSelectedSubject('');
    setSelectedDate('');
    setSelectedTime('');
    setSelectedDuration('');
    setSelectedSessionType('video');
  };
  
  // Handler for adding session to calendar
  const handleAddToCalendar = (session: Session) => {
    toast({
      title: "Added to calendar",
      description: `${session.topic} with ${session.tutorName} has been added to your calendar.`,
    });
    
    // In a real application, this would generate an iCal file or integrate with calendar APIs
  };
  
  // Get current date in YYYY-MM-DD format for the date input min value
  const today = new Date().toISOString().split('T')[0];
  
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
                <button className="flex-1 px-4 py-2 text-sm font-medium text-center border-b-2 border-primary text-primary">
                  Active & Upcoming
                </button>
                <button className="flex-1 px-4 py-2 text-sm font-medium text-center text-muted-foreground">
                  Past Sessions
                </button>
              </div>
            </div>
            
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
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {session.status === 'in-progress' ? (
                          <>
                            <Badge className="bg-green-500">In Progress</Badge>
                            <Button onClick={() => handleJoinSession(session.id)}>
                              Join Now
                            </Button>
                          </>
                        ) : (
                          <>
                            <Badge variant="outline">Scheduled</Badge>
                            <Button variant="outline" onClick={() => handleAddToCalendar(session)}>
                              <Calendar className="mr-2 h-4 w-4" />
                              Add to Calendar
                            </Button>
                          </>
                        )}
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
                <Label>Date & Time</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input 
                    type="date" 
                    min={today}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                  <Input 
                    type="time" 
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  />
                </div>
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
