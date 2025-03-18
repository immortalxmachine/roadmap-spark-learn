
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Heart, MessageCircle, Phone, Clock, Calendar, Users, BookOpen, Brain, Headphones, Send } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import AnimatedAvatar from '@/components/ui/avatar-animated';

const CrisisSupport = () => {
  const [activeTab, setActiveTab] = useState('mentors');
  const [message, setMessage] = useState('');
  
  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Physics",
      expertise: ["Mechanics", "Electromagnetism", "Optics"],
      rating: 4.9,
      reviews: 128,
      status: "available",
      avatar: "SJ"
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      specialty: "Chemistry",
      expertise: ["Organic Chemistry", "Chemical Bonding", "Thermodynamics"],
      rating: 4.8,
      reviews: 95,
      status: "busy",
      availableIn: "30 minutes",
      avatar: "MC"
    },
    {
      id: 3,
      name: "Dr. Emily Peterson",
      specialty: "Biology",
      expertise: ["Cell Biology", "Genetics", "Human Physiology"],
      rating: 4.7,
      reviews: 112,
      status: "available",
      avatar: "EP"
    },
    {
      id: 4,
      name: "Prof. David Williams",
      specialty: "Mathematics",
      expertise: ["Calculus", "Linear Algebra", "Statistics"],
      rating: 4.9,
      reviews: 143,
      status: "scheduled",
      nextSession: "Tomorrow, 3:00 PM",
      avatar: "DW"
    }
  ];
  
  const supportResources = [
    {
      title: "Exam Anxiety Management",
      description: "Techniques to manage test anxiety and perform better during exams",
      type: "guide",
      icon: Brain,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Time Management Strategies",
      description: "Effective methods for balancing study time and avoiding burnout",
      type: "video",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Stress Reduction Meditation",
      description: "Guided meditation sessions to reduce stress during intense study periods",
      type: "audio",
      icon: Headphones,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Effective Study Techniques",
      description: "Evidence-based approaches to improve retention and understanding",
      type: "guide",
      icon: BookOpen,
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    }
  ];
  
  const groupSessions = [
    {
      id: 1,
      title: "Physics Problem-Solving Workshop",
      description: "Group session focusing on advanced mechanics problems",
      date: "Oct 15, 2023",
      time: "4:00 PM - 5:30 PM",
      mentor: "Dr. Sarah Johnson",
      participants: 8,
      maxParticipants: 12
    },
    {
      id: 2,
      title: "Chemistry Concepts Clarification",
      description: "Interactive session on challenging organic chemistry topics",
      date: "Oct 17, 2023",
      time: "3:00 PM - 4:30 PM",
      mentor: "Prof. Michael Chen",
      participants: 10,
      maxParticipants: 15
    },
    {
      id: 3,
      title: "Biology Revision Marathon",
      description: "Comprehensive revision session covering key biology concepts",
      date: "Oct 20, 2023",
      time: "5:00 PM - 7:00 PM",
      mentor: "Dr. Emily Peterson",
      participants: 14,
      maxParticipants: 20
    }
  ];
  
  // Helper function to calculate spots left in a session
  const spotsLeft = (session: typeof groupSessions[0]) => {
    return session.maxParticipants - session.participants;
  };

  // Mock function for sending a message
  const sendMessage = () => {
    if (message.trim() === '') return;
    // In a real app, this would send the message to the backend
    alert(`Message sent: ${message}`);
    setMessage('');
  };

  return (
    <DashboardLayout>
      <FadeIn direction="up">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Support & Mentorship</h1>
          <p className="text-muted-foreground">Get help from mentors and access support resources</p>
        </div>

        <div className="mb-6 flex space-x-1 border-b">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'mentors'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('mentors')}
          >
            Mentors
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'resources'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('resources')}
          >
            Resources
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'groupSessions'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('groupSessions')}
          >
            Group Sessions
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'crisis'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('crisis')}
          >
            Crisis Support
          </button>
        </div>

        {activeTab === 'mentors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentors.map((mentor) => (
              <Card key={mentor.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <AnimatedAvatar 
                      fallback={mentor.avatar} 
                      size="lg"
                      animation={mentor.status === 'available' ? 'pulse' : 'none'}
                      className={mentor.status === 'available' ? 'ring-2 ring-green-500' : ''}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{mentor.name}</h3>
                        <div>
                          {mentor.status === 'available' && (
                            <Badge className="bg-green-500">Available Now</Badge>
                          )}
                          {mentor.status === 'busy' && (
                            <Badge variant="outline" className="text-muted-foreground">
                              Available in {mentor.availableIn}
                            </Badge>
                          )}
                          {mentor.status === 'scheduled' && (
                            <Badge variant="outline" className="text-muted-foreground">
                              Scheduled: {mentor.nextSession}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Expert in {mentor.specialty}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {mentor.expertise.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center text-sm mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(mentor.rating) ? 'text-amber-400' : 'text-gray-300'}`}
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-1 font-medium">{mentor.rating}</span>
                          <span className="mx-1.5 text-muted-foreground">•</span>
                          <span className="text-muted-foreground">{mentor.reviews} reviews</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button className="flex-1">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportResources.map((resource, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`${resource.bgColor} rounded-full p-3 h-fit`}>
                      <resource.icon className={`h-5 w-5 ${resource.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium">{resource.title}</h3>
                        <Badge>{resource.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                      <div className="flex justify-end space-x-2">
                        {resource.type === 'audio' && (
                          <Button variant="outline">
                            <Headphones className="mr-2 h-4 w-4" />
                            Listen
                          </Button>
                        )}
                        {resource.type === 'video' && (
                          <Button variant="outline">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2 h-4 w-4"
                            >
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                            Watch
                          </Button>
                        )}
                        <Button>
                          <BookOpen className="mr-2 h-4 w-4" />
                          Read Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'groupSessions' && (
          <div className="grid grid-cols-1 gap-6">
            {groupSessions.map((session) => (
              <Card key={session.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{session.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{session.description}</p>
                      <div className="flex flex-wrap gap-3 mb-4">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{session.time}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{session.participants}/{session.maxParticipants} Participants</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <span className="mr-1">Mentor:</span>
                        <AnimatedAvatar fallback={session.mentor.substring(0, 2)} size="sm" className="mx-1" />
                        <span>{session.mentor}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge variant="outline" className={spotsLeft(session) <= 3 ? "text-amber-600 bg-amber-50 border-amber-200" : ""}>
                        {spotsLeft(session)} spots left
                      </Badge>
                      <div className="mt-4 space-x-2">
                        <Button variant="outline">View Details</Button>
                        <Button>Join Session</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card>
              <CardHeader>
                <CardTitle>Need More Help?</CardTitle>
                <CardDescription>
                  Request a new group study session or suggest a topic you need help with
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  Request New Group Session
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'crisis' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Urgent Support</CardTitle>
                  <CardDescription>
                    Contact our support team for immediate assistance with academic or emotional concerns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-primary/5 border-primary/20">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 rounded-full p-3 h-fit">
                              <Phone className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium mb-1">Emergency Helpline</h3>
                              <p className="text-sm text-muted-foreground mb-3">
                                Available 24/7 for urgent academic or emotional support
                              </p>
                              <Button className="w-full">
                                <Phone className="mr-2 h-4 w-4" />
                                Call Now
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-primary/5 border-primary/20">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 rounded-full p-3 h-fit">
                              <MessageCircle className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium mb-1">Crisis Chat</h3>
                              <p className="text-sm text-muted-foreground mb-3">
                                Connect with a counselor immediately via text chat
                              </p>
                              <Button className="w-full">
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Start Chat
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="font-medium mb-4">Send a Message to Support Team</h3>
                      <div className="space-y-4">
                        <textarea 
                          placeholder="Describe your concern or issue..." 
                          rows={5}
                          className="w-full p-3 rounded-md border border-input bg-background"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-muted-foreground">
                            Our team typically responds within 30 minutes during business hours
                          </p>
                          <Button onClick={sendMessage}>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mental Wellness</CardTitle>
                  <CardDescription>Resources to support your mental health</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Stress Management Guide",
                        description: "Techniques to manage academic stress"
                      },
                      {
                        title: "Guided Meditation",
                        description: "10-minute meditation for anxiety relief"
                      },
                      {
                        title: "Sleep Improvement Tips",
                        description: "Better sleep for better learning"
                      }
                    ].map((resource, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="bg-secondary rounded-full p-2 h-fit">
                          <Heart className="h-4 w-4 text-red-500" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">{resource.title}</h3>
                          <p className="text-xs text-muted-foreground">{resource.description}</p>
                        </div>
                      </div>
                    ))}
                    <Button variant="link" className="w-full">View All Resources</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Community Forum</CardTitle>
                  <CardDescription>Connect with peers who may share similar experiences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Exam Anxiety Support Group",
                        members: 128,
                        active: true
                      },
                      {
                        title: "Balancing Study and Well-being",
                        members: 94,
                        active: false
                      },
                      {
                        title: "Remote Learning Challenges",
                        members: 156,
                        active: true
                      }
                    ].map((group, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium">{group.title}</h3>
                          {group.active && (
                            <Badge className="bg-green-500">Active Now</Badge>
                          )}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <Users className="h-3 w-3 mr-1" />
                          {group.members} members
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      <Users className="mr-2 h-4 w-4" />
                      Join a Support Group
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </FadeIn>
    </DashboardLayout>
  );
};

export default CrisisSupport;
