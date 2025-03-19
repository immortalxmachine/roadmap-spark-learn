
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FadeIn from '@/components/animations/FadeIn';
import TextToSpeech from '@/components/accessibility/TextToSpeech';
import FindTutorTab from '@/components/tutor/FindTutorTab';
import SessionsTab from '@/components/tutor/SessionsTab';
import TutorLeaderboard from '@/components/tutor/TutorLeaderboard';
import { Tutor } from '@/types/tutor';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowUp } from 'lucide-react';
import { useTutors } from '@/hooks/useTutors';

const TutorConnection = () => {
  const [activeTab, setActiveTab] = useState('find-tutor');
  const { tutors } = useTutors(); // Get tutors from our hook
  
  // Handler for scheduling a session from the FindTutorTab
  const handleScheduleWithTutor = (tutor: Tutor) => {
    // Switch to the sessions tab
    setActiveTab('sessions');
  };

  return (
    <DashboardLayout>
      <FadeIn direction="up">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-2xl font-bold">Volunteer Tutor Connection</h1>
            <Badge className="bg-amber-500 hover:bg-amber-600">
              <Star className="h-3 w-3 mr-1 fill-white" />
              High Priority
            </Badge>
            <Badge className="bg-rose-500 hover:bg-rose-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              Main Focus
            </Badge>
          </div>
          <p className="text-muted-foreground mb-1">Connect with volunteer tutors to get the help you need — our top priority service</p>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md mb-4 flex items-center">
            <Star className="h-5 w-5 text-amber-500 mr-2" />
            <p className="text-sm text-amber-800 dark:text-amber-200">
              This is a priority feature. Tutors are standing by to help with your questions.
            </p>
          </div>
          <TextToSpeech text="Volunteer Tutor Connection. Connect with volunteer tutors to get help with your studies. This is a high priority service." />
        </div>

        <Tabs defaultValue="find-tutor" className="mb-6" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger 
              value="find-tutor" 
              onClick={() => setActiveTab('find-tutor')}
              className="relative"
            >
              Find a Tutor
              {activeTab !== 'find-tutor' && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
              )}
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
            <FindTutorTab onScheduleWithTutor={handleScheduleWithTutor} />
          </TabsContent>

          {/* My Sessions Tab */}
          <TabsContent value="sessions">
            <SessionsTab />
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
