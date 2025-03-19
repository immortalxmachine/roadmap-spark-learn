import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FadeIn from '@/components/animations/FadeIn';
import TextToSpeech from '@/components/accessibility/TextToSpeech';
import FindTutorTab from '@/components/tutor/FindTutorTab';
import SessionsTab from '@/components/tutor/SessionsTab';
import TutorLeaderboard from '@/components/tutor/TutorLeaderboard';
import { Tutor } from '@/types/tutor';
import { Session } from '@/types/session';

const TutorConnection = () => {
  const [activeTab, setActiveTab] = useState('find-tutor');
  
  // Mock data for tutors
  const tutors: Tutor[] = [
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
  
  // Mock data for active sessions
  const activeSessions: Session[] = [
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

  return (
    <DashboardLayout>
      <FadeIn direction="up">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Volunteer Tutor Connection</h1>
          <p className="text-muted-foreground">Connect with volunteer tutors to get help with your studies</p>
          <TextToSpeech text="Volunteer Tutor Connection. Connect with volunteer tutors to get help with your studies" />
        </div>

        <Tabs defaultValue="find-tutor" className="mb-6">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger 
              value="find-tutor" 
              onClick={() => setActiveTab('find-tutor')}
            >
              Find a Tutor
            </TabsTrigger>
            <TabsTrigger 
              value="sessions" 
              onClick={() => setActiveTab('sessions')}
            >
              My Sessions
            </TabsTrigger>
            <TabsTrigger 
              value="leaderboard" 
              onClick={() => setActiveTab('leaderboard')}
            >
              Tutor Leaderboard
            </TabsTrigger>
          </TabsList>

          {/* Find a Tutor Tab */}
          <TabsContent value="find-tutor">
            <FindTutorTab tutors={tutors} />
          </TabsContent>

          {/* My Sessions Tab */}
          <TabsContent value="sessions">
            <SessionsTab activeSessions={activeSessions} />
          </TabsContent>

          {/* Tutor Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <TutorLeaderboard tutors={tutors} />
          </TabsContent>
        </Tabs>
      </FadeIn>
    </DashboardLayout>
  );
};

export default TutorConnection;
