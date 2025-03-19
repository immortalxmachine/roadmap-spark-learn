
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { MessageCircle, Phone, Video, Calendar, Clock, Users, BookOpen, Brain, Send, Star, GraduationCap, Award, Upload, Search, FileText, Filter, Heart } from 'lucide-react';
import TextToSpeech from '@/components/accessibility/TextToSpeech';
import FadeIn from '@/components/animations/FadeIn';
import AnimatedAvatar from '@/components/ui/avatar-animated';
import { useToast } from "@/hooks/use-toast";

const TutorConnection = () => {
  const [activeTab, setActiveTab] = useState('find-tutor');
  const [message, setMessage] = useState('');
  const { toast } = useToast();
  
  const subjects = [
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'english', label: 'English' },
    { value: 'history', label: 'History' },
    { value: 'geography', label: 'Geography' },
    { value: 'languages', label: 'Languages' },
    { value: 'music', label: 'Music' },
    { value: 'art', label: 'Art' }
  ];

  const tutors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Physics",
      expertise: ["Mechanics", "Electromagnetism", "Optics"],
      rating: 4.9,
      reviews: 128,
      status: "available",
      avatar: "SJ",
      level: 24,
      badges: ["Top Physics Tutor", "Session Expert"],
      communicationModes: ["text", "voice", "video"]
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
      avatar: "MC",
      level: 18,
      badges: ["Chemistry Wizard"],
      communicationModes: ["text", "voice"]
    },
    {
      id: 3,
      name: "Dr. Emily Peterson",
      specialty: "Biology",
      expertise: ["Cell Biology", "Genetics", "Human Physiology"],
      rating: 4.7,
      reviews: 112,
      status: "available",
      avatar: "EP",
      level: 21,
      badges: ["Biology Master", "Patient Teacher"],
      communicationModes: ["text", "voice", "video"]
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
      avatar: "DW",
      level: 32,
      badges: ["Math Genius", "Top Rated"],
      communicationModes: ["text", "video"]
    }
  ];
  
  const activeSessions = [
    {
      id: 1,
      tutorName: "Dr. Sarah Johnson",
      tutorAvatar: "SJ",
      subject: "Physics",
      topic: "Understanding Newton's Laws of Motion",
      startTime: "Today, 2:00 PM",
      duration: "45 minutes",
      status: "in-progress",
      mode: "video"
    },
    {
      id: 2,
      tutorName: "Prof. Michael Chen",
      tutorAvatar: "MC",
      subject: "Chemistry",
      topic: "Balancing Chemical Equations",
      startTime: "Tomorrow, 4:00 PM",
      duration: "60 minutes",
      status: "scheduled",
      mode: "voice"
    }
  ];
  
  const studyResources = [
    {
      id: 1,
      title: "Physics Formula Sheet",
      type: "PDF",
      subject: "Physics",
      uploadedBy: "Dr. Sarah Johnson",
      downloadCount: 235,
      size: "1.2 MB",
      uploadDate: "Oct 12, 2023"
    },
    {
      id: 2,
      title: "Organic Chemistry Reaction Guide",
      type: "PDF",
      subject: "Chemistry",
      uploadedBy: "Prof. Michael Chen",
      downloadCount: 189,
      size: "2.4 MB",
      uploadDate: "Oct 10, 2023"
    },
    {
      id: 3,
      title: "Introduction to Cell Biology",
      type: "Video",
      subject: "Biology",
      uploadedBy: "Dr. Emily Peterson",
      downloadCount: 312,
      duration: "45:20",
      uploadDate: "Oct 8, 2023"
    },
    {
      id: 4,
      title: "Linear Algebra Explained",
      type: "Video",
      subject: "Mathematics",
      uploadedBy: "Prof. David Williams",
      downloadCount: 276,
      duration: "58:15",
      uploadDate: "Oct 5, 2023"
    }
  ];

  // Handle submitting a tutoring request
  const handleSubmitRequest = () => {
    toast({
      title: "Tutoring request submitted!",
      description: "We'll match you with a tutor shortly.",
    });
  };

  // Handle becoming a tutor
  const handleBecomeTutor = () => {
    toast({
      title: "Application submitted!",
      description: "Thank you for volunteering as a tutor. We'll review your application and get back to you.",
    });
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (message.trim() === '') return;
    toast({
      title: "Message sent",
      description: "Your message has been sent to the tutor.",
    });
    setMessage('');
  };

  return (
    <DashboardLayout>
      <FadeIn direction="up">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Volunteer Tutor Connection</h1>
          <p className="text-muted-foreground">Connect with volunteer tutors or become a tutor to help others</p>
          <TextToSpeech text="Volunteer Tutor Connection. Connect with volunteer tutors or become a tutor to help others" />
        </div>

        <Tabs defaultValue="find-tutor" className="mb-6">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="find-tutor" onClick={() => setActiveTab('find-tutor')}>Find a Tutor</TabsTrigger>
            <TabsTrigger value="become-tutor" onClick={() => setActiveTab('become-tutor')}>Become a Tutor</TabsTrigger>
            <TabsTrigger value="sessions" onClick={() => setActiveTab('sessions')}>My Sessions</TabsTrigger>
            <TabsTrigger value="resources" onClick={() => setActiveTab('resources')}>Learning Resources</TabsTrigger>
          </TabsList>

          {/* Find a Tutor Tab */}
          <TabsContent value="find-tutor">
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
                        <Select>
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
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Preferred Communication</Label>
                        <div className="flex space-x-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="comm-text" />
                            <Label htmlFor="comm-text" className="text-sm flex items-center">
                              <MessageCircle className="mr-1 h-4 w-4" />
                              Text
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="comm-voice" />
                            <Label htmlFor="comm-voice" className="text-sm flex items-center">
                              <Phone className="mr-1 h-4 w-4" />
                              Voice
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="comm-video" />
                            <Label htmlFor="comm-video" className="text-sm flex items-center">
                              <Video className="mr-1 h-4 w-4" />
                              Video
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Urgency Level</Label>
                        <Select>
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

                      <Button type="button" className="w-full" onClick={handleSubmitRequest}>
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
                        <Select>
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
                      {tutors.map((tutor) => (
                        <Card key={tutor.id} className="overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-start gap-4">
                              <div className="flex-shrink-0">
                                <AnimatedAvatar 
                                  fallback={tutor.avatar} 
                                  size="lg"
                                  animation={tutor.status === 'available' ? 'pulse' : 'none'}
                                  className={tutor.status === 'available' ? 'ring-2 ring-green-500' : ''}
                                />
                                <div className="mt-2 text-center">
                                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                                    Level {tutor.level}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h3 className="font-medium flex items-center">
                                      {tutor.name}
                                      <GraduationCap className="ml-1 h-4 w-4 text-muted-foreground" />
                                    </h3>
                                    <p className="text-sm text-muted-foreground">Expert in {tutor.specialty}</p>
                                  </div>
                                  <div>
                                    {tutor.status === 'available' && (
                                      <Badge className="bg-green-500">Available Now</Badge>
                                    )}
                                    {tutor.status === 'busy' && (
                                      <Badge variant="outline" className="text-muted-foreground">
                                        Available in {tutor.availableIn}
                                      </Badge>
                                    )}
                                    {tutor.status === 'scheduled' && (
                                      <Badge variant="outline" className="text-muted-foreground">
                                        Next: {tutor.nextSession}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {tutor.expertise.map((skill, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
                                  ))}
                                </div>
                                
                                <div className="flex items-center mb-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${i < Math.floor(tutor.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                                    />
                                  ))}
                                  <span className="ml-1 text-sm font-medium">{tutor.rating}</span>
                                  <span className="mx-1.5 text-xs text-muted-foreground">•</span>
                                  <span className="text-xs text-muted-foreground">{tutor.reviews} reviews</span>
                                </div>
                                
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {tutor.badges.map((badge, index) => (
                                    <div key={index} className="flex items-center text-xs px-2 py-1 rounded-full bg-secondary">
                                      <Award className="h-3 w-3 mr-1 text-amber-500" />
                                      {badge}
                                    </div>
                                  ))}
                                </div>
                                
                                <div className="flex items-center mb-4 text-sm">
                                  <span className="mr-2">Available via:</span>
                                  {tutor.communicationModes.includes('text') && (
                                    <Badge variant="outline" className="mr-1">
                                      <MessageCircle className="h-3 w-3 mr-1" />
                                      Text
                                    </Badge>
                                  )}
                                  {tutor.communicationModes.includes('voice') && (
                                    <Badge variant="outline" className="mr-1">
                                      <Phone className="h-3 w-3 mr-1" />
                                      Voice
                                    </Badge>
                                  )}
                                  {tutor.communicationModes.includes('video') && (
                                    <Badge variant="outline">
                                      <Video className="h-3 w-3 mr-1" />
                                      Video
                                    </Badge>
                                  )}
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
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Become a Tutor Tab */}
          <TabsContent value="become-tutor">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <GraduationCap className="mr-2 h-5 w-5" />
                      Become a Volunteer Tutor
                    </CardTitle>
                    <CardDescription>
                      Share your knowledge and help students succeed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input id="fullName" placeholder="Enter your full name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" placeholder="Enter your email" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Subjects You Can Teach</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {subjects.map((subject) => (
                            <div key={subject.value} className="flex items-center space-x-2">
                              <Checkbox id={`subject-${subject.value}`} />
                              <Label htmlFor={`subject-${subject.value}`} className="text-sm">
                                {subject.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Communication Preferences</Label>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="pref-text" />
                            <Label htmlFor="pref-text" className="text-sm flex items-center">
                              <MessageCircle className="mr-1 h-4 w-4" />
                              Text Chat
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="pref-voice" />
                            <Label htmlFor="pref-voice" className="text-sm flex items-center">
                              <Phone className="mr-1 h-4 w-4" />
                              Voice Call
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="pref-video" />
                            <Label htmlFor="pref-video" className="text-sm flex items-center">
                              <Video className="mr-1 h-4 w-4" />
                              Video Call
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Availability</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="time-zone" className="text-sm">Time Zone</Label>
                            <Select>
                              <SelectTrigger id="time-zone">
                                <SelectValue placeholder="Select your time zone" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                                <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                                <SelectItem value="utc+0">Greenwich Mean Time (UTC+0)</SelectItem>
                                <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                                <SelectItem value="utc+8">China Standard Time (UTC+8)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="hours-per-week" className="text-sm">Hours Per Week</Label>
                            <Select>
                              <SelectTrigger id="hours-per-week">
                                <SelectValue placeholder="Select hours" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1-2">1-2 hours</SelectItem>
                                <SelectItem value="3-5">3-5 hours</SelectItem>
                                <SelectItem value="6-10">6-10 hours</SelectItem>
                                <SelectItem value="10+">10+ hours</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <Label className="text-sm">Available Days</Label>
                          <div className="flex flex-wrap gap-2">
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                              <div key={day} className="flex items-center space-x-2">
                                <Checkbox id={`day-${day.toLowerCase()}`} />
                                <Label htmlFor={`day-${day.toLowerCase()}`} className="text-sm">
                                  {day}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Additional Information</Label>
                        <Textarea 
                          placeholder="Tell us about your teaching experience and why you want to volunteer as a tutor..."
                          className="min-h-[120px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="credentials" className="text-sm flex items-center">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Credentials (Optional)
                        </Label>
                        <Input id="credentials" type="file" />
                        <p className="text-xs text-muted-foreground">
                          Upload any certifications, degrees, or documentation that establishes your expertise.
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the volunteer tutor terms and code of conduct
                        </Label>
                      </div>

                      <Button type="button" className="w-full" onClick={handleBecomeTutor}>
                        <GraduationCap className="mr-2 h-4 w-4" />
                        Submit Application
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Benefits of Being a Tutor</CardTitle>
                    <CardDescription>
                      Why volunteer as a tutor on our platform?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 rounded-full p-2 h-fit">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">Reinforce Your Knowledge</h3>
                          <p className="text-sm text-muted-foreground">
                            Teaching others helps solidify your own understanding
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 rounded-full p-2 h-fit">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">Build Your Network</h3>
                          <p className="text-sm text-muted-foreground">
                            Connect with students and fellow tutors in your field
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 rounded-full p-2 h-fit">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">Earn Recognition</h3>
                          <p className="text-sm text-muted-foreground">
                            Unlock achievements and build your reputation
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 rounded-full p-2 h-fit">
                          <Heart className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">Make a Difference</h3>
                          <p className="text-sm text-muted-foreground">
                            Help students overcome challenges and achieve their goals
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Top Tutors This Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tutors.slice(0, 3).map((tutor, idx) => (
                        <div key={tutor.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <AnimatedAvatar fallback={tutor.avatar} size="sm" />
                              {idx < 3 && (
                                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-xs font-bold">
                                  {idx + 1}
                                </span>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{tutor.name}</p>
                              <p className="text-xs text-muted-foreground">{tutor.specialty}</p>
                            </div>
                          </div>
                          <Badge variant="secondary" className="ml-2">
                            {tutor.reviews} sessions
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* My Sessions Tab */}
          <TabsContent value="sessions">
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
                      {activeSessions.map((session) => (
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
                                  <Button>
                                    Join Now
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Badge variant="outline">Scheduled</Badge>
                                  <Button variant="outline">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Add to Calendar
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
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
                    
                    <div className="border rounded-md p-4 mb-4 h-[200px] overflow-y-auto bg-secondary/30">
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
                      />
                      <Button onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
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
                        <Select>
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
                          <Input type="date" />
                          <Input type="time" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Session Duration</Label>
                        <Select>
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
                          <Button variant="outline" className="flex flex-col items-center justify-center h-20">
                            <MessageCircle className="mb-1 h-5 w-5" />
                            <span className="text-xs">Text</span>
                          </Button>
                          <Button variant="outline" className="flex flex-col items-center justify-center h-20">
                            <Phone className="mb-1 h-5 w-5" />
                            <span className="text-xs">Voice</span>
                          </Button>
                          <Button variant="outline" className="flex flex-col items-center justify-center h-20 bg-primary/10">
                            <Video className="mb-1 h-5 w-5" />
                            <span className="text-xs">Video</span>
                          </Button>
                        </div>
                      </div>
                      
                      <Button className="w-full">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule Session
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Learning Resources Tab */}
          <TabsContent value="resources">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Study Resources
                    </CardTitle>
                    <CardDescription>
                      Access study materials shared by tutors
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search resources..." className="pl-9 w-60" />
                      </div>
                      <div className="flex space-x-2">
                        <Select>
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="All Subjects" />
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
                        <Select>
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="All Types" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="pdf">PDF Documents</SelectItem>
                            <SelectItem value="video">Videos</SelectItem>
                            <SelectItem value="audio">Audio</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {studyResources.map((resource) => (
                        <Card key={resource.id}>
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex items-start space-x-4">
                                <div className={`rounded-md p-3 ${
                                  resource.type === 'PDF' ? 'bg-red-100 text-red-600' : 
                                  resource.type === 'Video' ? 'bg-blue-100 text-blue-600' : 
                                  'bg-green-100 text-green-600'
                                }`}>
                                  {resource.type === 'PDF' ? (
                                    <FileText className="h-6 w-6" />
                                  ) : resource.type === 'Video' ? (
                                    <Video className="h-6 w-6" />
                                  ) : (
                                    <BookOpen className="h-6 w-6" />
                                  )}
                                </div>
                                <div>
                                  <h3 className="font-medium">{resource.title}</h3>
                                  <p className="text-sm text-muted-foreground mb-1">
                                    {resource.subject} • {resource.uploadedBy}
                                  </p>
                                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                                    <span>Uploaded: {resource.uploadDate}</span>
                                    <span>{resource.downloadCount} downloads</span>
                                    {resource.size && <span>Size: {resource.size}</span>}
                                    {resource.duration && <span>Duration: {resource.duration}</span>}
                                  </div>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <BookOpen className="mr-2 h-4 w-4" />
                                  Preview
                                </Button>
                                <Button size="sm">
                                  Download
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-1">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Upload Resource</CardTitle>
                    <CardDescription>
                      Share your study materials with others
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Resource Title</Label>
                        <Input id="title" placeholder="Enter a descriptive title" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Select>
                          <SelectTrigger id="subject">
                            <SelectValue placeholder="Select subject" />
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
                        <Label htmlFor="resource-type">Resource Type</Label>
                        <Select>
                          <SelectTrigger id="resource-type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="document">Document (PDF, DOC)</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="audio">Audio</SelectItem>
                            <SelectItem value="link">External Link</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Describe what this resource contains or how it helps" />
                      </div>
                      
                      <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">Drag and drop your file here</p>
                        <p className="text-xs text-muted-foreground mb-2">or</p>
                        <Button variant="outline" size="sm">
                          Browse Files
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          Max file size: 50MB
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox id="public-resource" />
                        <Label htmlFor="public-resource" className="text-sm">
                          Make this resource public for all students
                        </Label>
                      </div>
                      
                      <Button className="w-full">
                        Upload Resource
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Popular Resources</CardTitle>
                    <CardDescription>
                      Most downloaded materials this month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {studyResources.slice(0, 3).map((resource, idx) => (
                        <div key={resource.id} className="flex items-start space-x-3">
                          <div className={`rounded-md p-2 ${
                            resource.type === 'PDF' ? 'bg-red-100 text-red-600' : 
                            resource.type === 'Video' ? 'bg-blue-100 text-blue-600' : 
                            'bg-green-100 text-green-600'
                          }`}>
                            {resource.type === 'PDF' ? (
                              <FileText className="h-4 w-4" />
                            ) : resource.type === 'Video' ? (
                              <Video className="h-4 w-4" />
                            ) : (
                              <BookOpen className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-medium">{resource.title}</h3>
                            <p className="text-xs text-muted-foreground">{resource.subject}</p>
                          </div>
                          <Badge variant="secondary">{resource.downloadCount}</Badge>
                        </div>
                      ))}
                      <Button variant="link" className="w-full">View All Resources</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </FadeIn>
    </DashboardLayout>
  );
};

export default TutorConnection;
