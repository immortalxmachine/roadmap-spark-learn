
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, FileText, Video, Headphones, Download, Volume2, Search, Filter, ChevronDown } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DigitalLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['All']);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['All']);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>(['All']);
  
  // Mock data for library materials
  const libraryMaterials = [
    {
      id: 1,
      title: 'Introduction to Physics Mechanics',
      description: 'Comprehensive guide to basic mechanics concepts including Newton\'s laws, energy, and momentum.',
      type: 'notes',
      subject: 'Physics',
      difficulty: 'Beginner',
      icon: FileText,
      iconColor: 'text-blue-600',
      iconBgColor: 'bg-blue-100',
    },
    {
      id: 2,
      title: 'Organic Chemistry Fundamentals',
      description: 'Detailed explanation of organic compounds, reactions, and mechanisms with practice problems.',
      type: 'notes',
      subject: 'Chemistry',
      difficulty: 'Intermediate',
      icon: FileText,
      iconColor: 'text-green-600',
      iconBgColor: 'bg-green-100',
    },
    {
      id: 3,
      title: 'Calculus Video Lecture Series',
      description: 'Video series covering differential and integral calculus with visual examples and applications.',
      type: 'video',
      subject: 'Mathematics',
      difficulty: 'Advanced',
      icon: Video,
      iconColor: 'text-purple-600',
      iconBgColor: 'bg-purple-100',
    },
    {
      id: 4,
      title: 'Biology Cell Structure Explained',
      description: 'Comprehensive guide to cellular biology, organelles, and their functions with colorful diagrams.',
      type: 'notes',
      subject: 'Biology',
      difficulty: 'Beginner',
      icon: FileText,
      iconColor: 'text-red-600',
      iconBgColor: 'bg-red-100',
    },
    {
      id: 5,
      title: 'JEE Physics Previous Year Questions',
      description: 'Collection of JEE Main and Advanced physics questions from past 10 years with detailed solutions.',
      type: 'practice',
      subject: 'Physics',
      difficulty: 'Advanced',
      icon: BookOpen,
      iconColor: 'text-amber-600',
      iconBgColor: 'bg-amber-100',
    },
    {
      id: 6,
      title: 'Thermodynamics Audio Lectures',
      description: 'Audio explanations of thermodynamic principles, laws, and their applications in physical systems.',
      type: 'audio',
      subject: 'Physics',
      difficulty: 'Intermediate',
      icon: Headphones,
      iconColor: 'text-cyan-600',
      iconBgColor: 'bg-cyan-100',
    },
  ];
  
  // Filter library materials based on search and filters
  const filteredMaterials = libraryMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          material.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = selectedSubjects.includes('All') || selectedSubjects.includes(material.subject);
    const matchesType = selectedTypes.includes('All') || selectedTypes.includes(material.type);
    const matchesDifficulty = selectedDifficulty.includes('All') || selectedDifficulty.includes(material.difficulty);
    
    return matchesSearch && matchesSubject && matchesType && matchesDifficulty;
  });
  
  // Function to toggle selection in a filter array
  const toggleSelection = (array: string[], item: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (item === 'All') {
      setter(['All']);
      return;
    }
    
    if (array.includes(item)) {
      // If item is already selected, remove it
      const newArray = array.filter(i => i !== item);
      if (newArray.length === 0 || (array.includes('All') && newArray.length === 1)) {
        setter(['All']);
      } else {
        // Remove 'All' if it exists
        setter(newArray.filter(i => i !== 'All'));
      }
    } else {
      // If item is not selected, add it
      const newArray = array.includes('All') ? [item] : [...array.filter(i => i !== 'All'), item];
      setter(newArray);
    }
  };
  
  // Get unique subjects, types, and difficulties for filters
  const subjects = ['All', ...new Set(libraryMaterials.map(m => m.subject))];
  const types = ['All', ...new Set(libraryMaterials.map(m => m.type))];
  const difficulties = ['All', ...new Set(libraryMaterials.map(m => m.difficulty))];
  
  // Get icon for material type
  const getIconForType = (type: string) => {
    switch (type) {
      case 'notes':
        return FileText;
      case 'video':
        return Video;
      case 'audio':
        return Headphones;
      case 'practice':
        return BookOpen;
      default:
        return FileText;
    }
  };

  return (
    <DashboardLayout>
      <FadeIn direction="up">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Digital Library</h1>
          <p className="text-muted-foreground">Access study materials, practice questions, and resources</p>
        </div>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for study materials..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Subject
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by Subject</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {subjects.map((subject) => (
                  <DropdownMenuCheckboxItem
                    key={subject}
                    checked={selectedSubjects.includes(subject)}
                    onCheckedChange={() => toggleSelection(selectedSubjects, subject, setSelectedSubjects)}
                  >
                    {subject}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Type
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {types.map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={selectedTypes.includes(type)}
                    onCheckedChange={() => toggleSelection(selectedTypes, type, setSelectedTypes)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Difficulty
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by Difficulty</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {difficulties.map((difficulty) => (
                  <DropdownMenuCheckboxItem
                    key={difficulty}
                    checked={selectedDifficulty.includes(difficulty)}
                    onCheckedChange={() => toggleSelection(selectedDifficulty, difficulty, setSelectedDifficulty)}
                  >
                    {difficulty}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => {
            const MaterialIcon = material.icon;
            return (
              <Card key={material.id} className="overflow-hidden group hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex justify-between mb-4">
                      <div className={`${material.iconBgColor} rounded-full p-2 h-fit`}>
                        <MaterialIcon className={`h-4 w-4 ${material.iconColor}`} />
                      </div>
                      <div className="flex gap-1">
                        <Badge variant="secondary">{material.subject}</Badge>
                        <Badge variant="outline">{material.difficulty}</Badge>
                      </div>
                    </div>
                    <h3 className="font-medium mb-2">{material.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{material.description}</p>
                    <div className="flex justify-between">
                      <Badge className="capitalize">{material.type}</Badge>
                      <div className="flex gap-2">
                        <Button size="icon" variant="outline" className="h-8 w-8">
                          <Volume2 className="h-4 w-4" />
                        </Button>
                        <Button size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {filteredMaterials.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No materials found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query</p>
          </div>
        )}
      </FadeIn>
    </DashboardLayout>
  );
};

export default DigitalLibrary;
