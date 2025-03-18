
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Clock, FileText, BarChart3, CheckCircle, AlertCircle, TrendingUp, ChevronRight, Timer, Award } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

const MockTests = () => {
  const [activeTab, setActiveTab] = useState('available');
  
  const mockTests = {
    available: [
      {
        id: 1,
        title: 'Physics: Mechanics & Waves',
        description: 'Test your understanding of mechanical principles and wave phenomena',
        questions: 30,
        time: 45,
        difficulty: 'Intermediate'
      },
      {
        id: 2,
        title: 'Chemistry: Organic Compounds',
        description: 'Covers nomenclature, reactions, and mechanisms of organic chemistry',
        questions: 35,
        time: 50,
        difficulty: 'Advanced'
      },
      {
        id: 3,
        title: 'Biology: Cell Structure & Function',
        description: 'Test your knowledge about cellular biology and organelle functions',
        questions: 25,
        time: 40,
        difficulty: 'Beginner'
      },
      {
        id: 4,
        title: 'Mathematics: Calculus Fundamentals',
        description: 'Covers differentiation, integration, and applications',
        questions: 20,
        time: 45,
        difficulty: 'Intermediate'
      }
    ],
    completed: [
      {
        id: 5,
        title: 'Physics: Electromagnetics',
        description: 'Electric fields, magnetic fields, and electromagnetic interactions',
        questions: 30,
        time: 45,
        difficulty: 'Intermediate',
        score: 85,
        date: '2023-10-10',
        strengths: ['Magnetic Fields', 'Electromagnetic Induction'],
        weaknesses: ['Capacitance', 'Circuit Analysis']
      },
      {
        id: 6,
        title: 'Chemistry: Periodic Table & Elements',
        description: 'Properties of elements and periodic trends examination',
        questions: 40,
        time: 60,
        difficulty: 'Beginner',
        score: 72,
        date: '2023-10-05',
        strengths: ['Element Properties', 'Electron Configuration'],
        weaknesses: ['Periodic Trends', 'Transition Metals']
      }
    ]
  };
  
  const filterBadgeColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-amber-100 text-amber-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getPerformanceColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 85) return 'bg-green-600';
    if (score >= 70) return 'bg-amber-600';
    return 'bg-red-600';
  };

  return (
    <DashboardLayout>
      <FadeIn direction="up">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Mock Tests</h1>
          <p className="text-muted-foreground">Evaluate your knowledge with practice exams and performance analysis</p>
        </div>

        <div className="mb-6 flex space-x-1 border-b">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'available'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('available')}
          >
            Available Tests
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'completed'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            Completed Tests
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'performance'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('performance')}
          >
            Performance Analysis
          </button>
        </div>

        {activeTab === 'available' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockTests.available.map((test) => (
              <Card key={test.id} className="overflow-hidden hover:shadow-md transition-all">
                <CardHeader className="pb-3">
                  <div className="flex justify-between">
                    <CardTitle>{test.title}</CardTitle>
                    <Badge className={filterBadgeColor(test.difficulty)}>{test.difficulty}</Badge>
                  </div>
                  <CardDescription>{test.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{test.questions} Questions</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{test.time} Minutes</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 py-3">
                  <div className="w-full flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      Recommended based on your study plan
                    </div>
                    <Button>
                      Start Test
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'completed' && (
          <div className="grid grid-cols-1 gap-6">
            {mockTests.completed.map((test) => (
              <Card key={test.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-grow">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold text-lg">{test.title}</h3>
                        <Badge className={filterBadgeColor(test.difficulty)}>{test.difficulty}</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">{test.description}</p>
                      
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="bg-secondary rounded-md px-3 py-2 text-sm flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          <span>{test.questions} Questions</span>
                        </div>
                        <div className="bg-secondary rounded-md px-3 py-2 text-sm flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{test.time} Minutes</span>
                        </div>
                        <div className="bg-secondary rounded-md px-3 py-2 text-sm flex items-center">
                          <Timer className="h-4 w-4 mr-2" />
                          <span>Completed on {new Date(test.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span className="font-medium">Strengths:</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {test.strengths.map((strength, i) => (
                              <Badge key={i} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                {strength}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span className="font-medium">Areas to Improve:</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {test.weaknesses.map((weakness, i) => (
                              <Badge key={i} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                {weakness}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center min-w-[160px] p-4 bg-secondary rounded-lg">
                      <div className="text-3xl font-bold mb-1 text-center">
                        <span className={getPerformanceColor(test.score)}>{test.score}%</span>
                      </div>
                      <Progress value={test.score} className={`h-2 w-full mb-3 ${getProgressColor(test.score)}`} />
                      <div className="flex items-center text-xs text-muted-foreground mb-4">
                        <span>Percentile: </span>
                        <span className="font-medium ml-1">75th</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-4 w-4 mr-1" />
                          Analysis
                        </Button>
                        <Button size="sm">
                          <Award className="h-4 w-4 mr-1" />
                          Retry
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Your test performance trends and analytics</CardDescription>
              </CardHeader>
              <CardContent className="pb-1">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-muted-foreground text-sm mb-1">Average Score</div>
                        <div className="text-3xl font-bold text-green-600">78.5%</div>
                        <div className="flex items-center justify-center text-xs text-green-600 mt-1">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>↑ 12% from last month</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-muted-foreground text-sm mb-1">Tests Completed</div>
                        <div className="text-3xl font-bold">14</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Out of 20 assigned tests
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-muted-foreground text-sm mb-1">Time Efficiency</div>
                        <div className="text-3xl font-bold text-amber-600">82%</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Average time utilization
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="font-medium mb-3">Subject-wise Performance</h3>
                <div className="space-y-4">
                  {[
                    { subject: 'Physics', score: 85, trend: 'up' },
                    { subject: 'Chemistry', score: 72, trend: 'up' },
                    { subject: 'Mathematics', score: 68, trend: 'down' },
                    { subject: 'Biology', score: 90, trend: 'up' }
                  ].map((subject, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{subject.subject}</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-1">
                            {subject.score}%
                          </span>
                          {subject.trend === 'up' ? (
                            <TrendingUp className="h-3 w-3 text-green-600" />
                          ) : (
                            <TrendingUp className="h-3 w-3 text-red-600 transform rotate-180" />
                          )}
                        </div>
                      </div>
                      <Progress value={subject.score} className={getProgressColor(subject.score)} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recommended Focus Areas</CardTitle>
                <CardDescription>Based on your test performance, here are topics you should review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      subject: 'Physics',
                      topics: ['Circular Motion', 'Rotational Dynamics'],
                      resources: 2
                    },
                    {
                      subject: 'Chemistry',
                      topics: ['Redox Reactions', 'Coordination Compounds'],
                      resources: 3
                    },
                    {
                      subject: 'Mathematics',
                      topics: ['Integration Techniques', 'Differential Equations', 'Vector Calculus'],
                      resources: 4
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <AlertCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.subject}</h4>
                        <div className="flex flex-wrap gap-2 my-2">
                          {item.topics.map((topic, i) => (
                            <Badge key={i} variant="outline">{topic}</Badge>
                          ))}
                        </div>
                        <Button variant="link" size="sm" className="px-0 h-auto text-primary">
                          View {item.resources} Recommended Resources
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </FadeIn>
    </DashboardLayout>
  );
};

export default MockTests;
