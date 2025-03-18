
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CircleCheck, Clock, FileText, BookOpen, Brain, Award, Calendar } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

const StudyRoadmap = () => {
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [formData, setFormData] = useState({
    examType: 'NEET',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    startDate: '2023-10-15',
    endDate: '2023-11-15',
    studyPace: 'balanced'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRoadmap(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => {
      if (prev.subjects.includes(subject)) {
        return { ...prev, subjects: prev.subjects.filter(s => s !== subject) };
      } else {
        return { ...prev, subjects: [...prev.subjects, subject] };
      }
    });
  };

  const availableSubjects = ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'English'];
  const studyPaceOptions = [
    { value: 'intensive', label: 'Intensive' },
    { value: 'balanced', label: 'Balanced' },
    { value: 'relaxed', label: 'Relaxed' }
  ];

  const roadmapWeeks = [
    {
      week: 1,
      focus: 'Physics: Mechanics',
      tasks: [
        { id: 1, title: 'Study Newton\'s Laws of Motion', completed: true, duration: '3 hours', type: 'study' },
        { id: 2, title: 'Practice problems on Force and Motion', completed: false, duration: '2 hours', type: 'practice' },
        { id: 3, title: 'Mock Test: Basic Mechanics', completed: false, duration: '1 hour', type: 'test' }
      ]
    },
    {
      week: 2,
      focus: 'Chemistry: Atomic Structure',
      tasks: [
        { id: 4, title: 'Study Atomic Models and Theories', completed: false, duration: '3 hours', type: 'study' },
        { id: 5, title: 'Practice Electronic Configuration Problems', completed: false, duration: '2 hours', type: 'practice' },
        { id: 6, title: 'Revision Session: Atomic Structure', completed: false, duration: '2 hours', type: 'revision' }
      ]
    },
    {
      week: 3,
      focus: 'Biology: Cell Biology',
      tasks: [
        { id: 7, title: 'Study Cell Structure and Organelles', completed: false, duration: '4 hours', type: 'study' },
        { id: 8, title: 'Review Cell Division Process', completed: false, duration: '2 hours', type: 'review' },
        { id: 9, title: 'Mock Test: Cell Biology Concepts', completed: false, duration: '1 hour', type: 'test' }
      ]
    },
    {
      week: 4,
      focus: 'Revision and Practice Tests',
      tasks: [
        { id: 10, title: 'Comprehensive Revision: Physics', completed: false, duration: '3 hours', type: 'revision' },
        { id: 11, title: 'Comprehensive Revision: Chemistry', completed: false, duration: '3 hours', type: 'revision' },
        { id: 12, title: 'Comprehensive Revision: Biology', completed: false, duration: '3 hours', type: 'revision' },
        { id: 13, title: 'Full-Length Mock Test', completed: false, duration: '3 hours', type: 'test' }
      ]
    }
  ];

  const getIconForTask = (type: string) => {
    switch (type) {
      case 'study':
        return BookOpen;
      case 'practice':
        return FileText;
      case 'test':
        return Brain;
      case 'revision':
        return Award;
      case 'review':
        return Clock;
      default:
        return FileText;
    }
  };

  return (
    <DashboardLayout>
      <FadeIn direction="up">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Study Roadmap Generator</h1>
          <p className="text-muted-foreground">Create a personalized study plan tailored to your exam needs</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`${showRoadmap ? 'lg:col-span-1' : 'lg:col-span-3'}`}>
            <Card>
              <CardHeader>
                <CardTitle>Configure Your Study Plan</CardTitle>
                <CardDescription>
                  Customize your study roadmap based on your exam type, subjects, and available time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="examType">Exam Type</Label>
                    <select 
                      id="examType" 
                      name="examType"
                      value={formData.examType}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-md border border-input bg-background"
                    >
                      <option value="JEE">JEE (Engineering)</option>
                      <option value="NEET">NEET (Medical)</option>
                      <option value="UPSC">UPSC (Civil Services)</option>
                      <option value="CAT">CAT (MBA)</option>
                      <option value="GENERAL">General Academic</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Select Subjects</Label>
                    <div className="flex flex-wrap gap-2">
                      {availableSubjects.map(subject => (
                        <Badge 
                          key={subject}
                          variant={formData.subjects.includes(subject) ? "default" : "outline"}
                          className="cursor-pointer py-1.5 px-3"
                          onClick={() => handleSubjectToggle(subject)}
                        >
                          {subject}
                          {formData.subjects.includes(subject) && (
                            <CircleCheck className="ml-1 h-3 w-3" />
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input 
                        id="startDate" 
                        name="startDate"
                        type="date" 
                        value={formData.startDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date (Exam)</Label>
                      <Input 
                        id="endDate" 
                        name="endDate"
                        type="date" 
                        value={formData.endDate}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studyPace">Study Pace</Label>
                    <div className="flex gap-2">
                      {studyPaceOptions.map(option => (
                        <Button
                          key={option.value}
                          type="button"
                          variant={formData.studyPace === option.value ? "default" : "outline"}
                          className="flex-1"
                          onClick={() => setFormData(prev => ({ ...prev, studyPace: option.value }))}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Generate Study Roadmap
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {showRoadmap && (
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Your Personalized Study Roadmap</CardTitle>
                      <CardDescription>
                        Created for {formData.examType} with {formData.subjects.length} subjects 
                        ({formData.subjects.join(', ')})
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Add to Calendar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {roadmapWeeks.map((week) => (
                      <div key={week.week} className="relative">
                        <div className="flex items-center mb-3">
                          <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                            {week.week}
                          </div>
                          <h3 className="ml-3 font-semibold">{week.focus}</h3>
                        </div>
                        
                        <div className="pl-4 border-l border-border ml-3.5 space-y-4">
                          {week.tasks.map((task) => {
                            const TaskIcon = getIconForTask(task.type);
                            return (
                              <div key={task.id} className="flex items-start space-x-4">
                                <div className={`rounded-full p-2 ${task.completed ? 'bg-green-100' : 'bg-secondary'}`}>
                                  <TaskIcon className={`h-4 w-4 ${task.completed ? 'text-green-600' : 'text-muted-foreground'}`} />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <h4 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                      {task.title}
                                    </h4>
                                    <div className="flex items-center space-x-2">
                                      <Badge variant="outline" className="flex items-center space-x-1">
                                        <Clock className="h-3 w-3" />
                                        <span>{task.duration}</span>
                                      </Badge>
                                      <Button size="sm" variant={task.completed ? "outline" : "default"}>
                                        {task.completed ? 'Completed' : 'Start'}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <Button variant="outline" size="sm">
                      Adjust Roadmap
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Export as PDF
                      </Button>
                      <Button size="sm">
                        Start Following Plan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </FadeIn>
    </DashboardLayout>
  );
};

export default StudyRoadmap;
