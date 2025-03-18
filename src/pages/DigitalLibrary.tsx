
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, BookOpen, Video, Volume2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import VisualAlert from '@/components/accessibility/VisualAlert';
import TextToSpeech from '@/components/accessibility/TextToSpeech';
import StudyMaterialCard from '@/components/library/StudyMaterialCard';
import FadeIn from '@/components/animations/FadeIn';

const mockStudyMaterials = [
  {
    id: 1,
    title: 'Introduction to Biology: Cell Structure',
    description: 'Comprehensive notes covering the basics of cell structure and functions. Includes diagrams and examples.',
    type: 'notes' as const,
    subject: 'Biology',
    difficulty: 'easy' as const
  },
  {
    id: 2,
    title: 'Newton\'s Laws of Motion Explained',
    description: 'Video lecture by Prof. Johnson explaining the three laws of motion with real-world examples and demonstrations.',
    type: 'video' as const,
    subject: 'Physics',
    difficulty: 'medium' as const
  },
  {
    id: 3,
    title: 'Organic Chemistry: Functional Groups',
    description: 'Detailed audio lessons on functional groups in organic chemistry, including nomenclature and reactions.',
    type: 'audio' as const,
    subject: 'Chemistry',
    difficulty: 'hard' as const
  },
  {
    id: 4,
    title: 'Calculus: Limits and Continuity',
    description: 'Study notes covering the fundamentals of limits, continuity, and their applications in calculus.',
    type: 'notes' as const,
    subject: 'Mathematics',
    difficulty: 'hard' as const
  },
  {
    id: 5,
    title: 'Human Digestive System',
    description: 'Animated video explaining the human digestive system, its organs, and the digestion process.',
    type: 'video' as const,
    subject: 'Biology',
    difficulty: 'medium' as const
  },
  {
    id: 6,
    title: 'Acids, Bases and Salts',
    description: 'Audio lecture covering the properties of acids, bases, and salts with everyday examples.',
    type: 'audio' as const,
    subject: 'Chemistry',
    difficulty: 'easy' as const
  }
];

const DigitalLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { speak } = useAccessibility();
  
  const filteredMaterials = mockStudyMaterials.filter(material => {
    // Filter by search term
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          material.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by tab (material type)
    const matchesTab = activeTab === 'all' || material.type === activeTab;
    
    // Filter by subject
    const matchesSubject = selectedSubject === 'all' || material.subject === selectedSubject;
    
    // Filter by difficulty
    const matchesDifficulty = selectedDifficulty === 'all' || material.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesTab && matchesSubject && matchesDifficulty;
  });
  
  const handleDownload = (material: typeof mockStudyMaterials[0]) => {
    setAlertMessage(`Downloaded: ${material.title}`);
    setShowAlert(true);
    // In a real app, implement actual download functionality
  };
  
  const handleView = (material: typeof mockStudyMaterials[0]) => {
    setAlertMessage(`Viewing: ${material.title}`);
    setShowAlert(true);
    
    // Demonstrate TTS for visually impaired users
    speak(`Opening ${material.title}. ${material.description}`);
    
    // In a real app, implement actual view functionality
  };
  
  const subjects = Array.from(new Set(mockStudyMaterials.map(m => m.subject)));
  const difficulties = ['easy', 'medium', 'hard'];

  return (
    <DashboardLayout>
      <FadeIn direction="up">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Digital Library</h1>
          <p className="text-muted-foreground">Access study materials, previous year papers, and resources</p>
        </div>
        
        <VisualAlert 
          show={showAlert} 
          message={alertMessage} 
          type="success" 
          onClose={() => setShowAlert(false)} 
        />
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search study materials..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <select 
                  className="border rounded-md px-3 py-2 bg-background"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  <option value="all">All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                <select 
                  className="border rounded-md px-3 py-2 bg-background"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  <option value="all">All Difficulties</option>
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </option>
                  ))}
                </select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Materials</TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Notes
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center">
              <Video className="h-4 w-4 mr-2" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center">
              <Volume2 className="h-4 w-4 mr-2" />
              Audio
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.length > 0 ? (
                filteredMaterials.map(material => (
                  <StudyMaterialCard
                    key={material.id}
                    title={material.title}
                    description={material.description}
                    type={material.type}
                    subject={material.subject}
                    difficulty={material.difficulty}
                    onDownload={() => handleDownload(material)}
                    onView={() => handleView(material)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-muted-foreground">No study materials found matching your criteria</p>
                  <Button variant="outline" className="mt-4" onClick={() => {
                    setSearchTerm('');
                    setSelectedSubject('all');
                    setSelectedDifficulty('all');
                    setActiveTab('all');
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="notes" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.length > 0 ? (
                filteredMaterials.map(material => (
                  <StudyMaterialCard
                    key={material.id}
                    title={material.title}
                    description={material.description}
                    type={material.type}
                    subject={material.subject}
                    difficulty={material.difficulty}
                    onDownload={() => handleDownload(material)}
                    onView={() => handleView(material)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-muted-foreground">No notes found matching your criteria</p>
                  <Button variant="outline" className="mt-4" onClick={() => {
                    setSearchTerm('');
                    setSelectedSubject('all');
                    setSelectedDifficulty('all');
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="video" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.length > 0 ? (
                filteredMaterials.map(material => (
                  <StudyMaterialCard
                    key={material.id}
                    title={material.title}
                    description={material.description}
                    type={material.type}
                    subject={material.subject}
                    difficulty={material.difficulty}
                    onDownload={() => handleDownload(material)}
                    onView={() => handleView(material)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-muted-foreground">No videos found matching your criteria</p>
                  <Button variant="outline" className="mt-4" onClick={() => {
                    setSearchTerm('');
                    setSelectedSubject('all');
                    setSelectedDifficulty('all');
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="audio" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.length > 0 ? (
                filteredMaterials.map(material => (
                  <StudyMaterialCard
                    key={material.id}
                    title={material.title}
                    description={material.description}
                    type={material.type}
                    subject={material.subject}
                    difficulty={material.difficulty}
                    onDownload={() => handleDownload(material)}
                    onView={() => handleView(material)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-muted-foreground">No audio lessons found matching your criteria</p>
                  <Button variant="outline" className="mt-4" onClick={() => {
                    setSearchTerm('');
                    setSelectedSubject('all');
                    setSelectedDifficulty('all');
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </FadeIn>
    </DashboardLayout>
  );
};

export default DigitalLibrary;
