
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import FadeIn from '@/components/animations/FadeIn';
import { AlertCircle, Clock, CheckCircle, ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { mockTestQuestions } from '@/data/mockTestQuestions';
import { TestQuestion, TestResult } from '@/types/mockTest';
import { useToast } from '@/hooks/use-toast';

const TakeMockTest = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [startTime] = useState(new Date());
  
  // Get questions for this test
  const questions = mockTestQuestions.filter(q => q.testId === Number(testId));
  const currentQuestion = questions[currentQuestionIndex];
  
  // Initialize the timer
  useEffect(() => {
    if (!testId) return;
    
    // Set initial time (from mock data)
    const mockTests = [
      { id: 1, time: 45 },
      { id: 2, time: 50 },
      { id: 3, time: 40 },
      { id: 4, time: 45 }
    ];
    
    const test = mockTests.find(t => t.id === Number(testId));
    if (test) {
      setTimeRemaining(test.time * 60); // Convert minutes to seconds
    }
    
    // Start the timer
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!isFinished) {
            handleFinishTest();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [testId, isFinished]);
  
  // Format time remaining
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };
  
  // Handle answer selection
  const handleSelectAnswer = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };
  
  // Navigation between questions
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  // Calculate test results
  const handleFinishTest = () => {
    const endTime = new Date();
    const timeTaken = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
    
    const correctAnswers: number[] = [];
    const incorrectAnswers: number[] = [];
    
    questions.forEach(question => {
      const selectedAnswer = selectedAnswers[question.id];
      if (selectedAnswer === question.correctAnswer) {
        correctAnswers.push(question.id);
      } else {
        incorrectAnswers.push(question.id);
      }
    });
    
    // Group strengths and weaknesses by topic
    const strengths = Array.from(new Set(
      questions
        .filter(q => correctAnswers.includes(q.id))
        .map(q => q.topic)
    ));
    
    const weaknesses = Array.from(new Set(
      questions
        .filter(q => incorrectAnswers.includes(q.id))
        .map(q => q.topic)
    ));
    
    const score = Math.round((correctAnswers.length / questions.length) * 100);
    
    const result: TestResult = {
      testId: Number(testId),
      score,
      totalQuestions: questions.length,
      timeTaken,
      date: new Date().toISOString(),
      correctAnswers,
      incorrectAnswers,
      strengths: strengths.slice(0, 3), // Top 3 strengths
      weaknesses: weaknesses.slice(0, 3) // Top 3 weaknesses
    };
    
    setTestResult(result);
    setIsFinished(true);
    
    // Save result to localStorage (in a real app this would go to a database)
    const savedResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    localStorage.setItem('testResults', JSON.stringify([...savedResults, result]));
    
    toast({
      title: "Test Completed!",
      description: `You scored ${score}% on this test.`,
      variant: score >= 70 ? "default" : "destructive"
    });
  };
  
  // Progress calculation
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercentage = (answeredCount / questions.length) * 100;
  
  // Determine if user can finish the test (at least 70% answered)
  const canFinish = answeredCount >= Math.ceil(questions.length * 0.7);
  
  if (isFinished && testResult) {
    return (
      <DashboardLayout>
        <FadeIn direction="up">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Test Results</h1>
            <p className="text-muted-foreground">Your performance analysis and insights</p>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Your Score: {testResult.score}%</CardTitle>
              <CardDescription>
                Completed on {new Date(testResult.date).toLocaleDateString()} in {Math.floor(testResult.timeTaken / 60)} minutes {testResult.timeTaken % 60} seconds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Progress value={testResult.score} className={
                  testResult.score >= 85 ? "bg-green-600" : 
                  testResult.score >= 70 ? "bg-amber-600" : "bg-red-600"
                } />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Your Strengths</h3>
                  {testResult.strengths.length > 0 ? (
                    <div className="space-y-2">
                      {testResult.strengths.map((strength, i) => (
                        <div key={i} className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span>{strength}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No clear strengths identified yet.</p>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Areas to Improve</h3>
                  {testResult.weaknesses.length > 0 ? (
                    <div className="space-y-2">
                      {testResult.weaknesses.map((weakness, i) => (
                        <div key={i} className="flex items-center gap-2 text-red-600">
                          <AlertCircle className="h-5 w-5" />
                          <span>{weakness}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No clear weaknesses identified.</p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full flex justify-between">
                <Button variant="outline" onClick={() => navigate('/mock-tests')}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Tests
                </Button>
                <Button onClick={() => navigate('/mock-tests/performance')}>
                  View All Results
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Question Analysis</CardTitle>
              <CardDescription>Detailed breakdown of your answers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {questions.map((question, index) => {
                  const userAnswer = selectedAnswers[question.id];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <div key={question.id} className={`p-4 rounded-lg border ${
                      userAnswer === undefined ? 'bg-secondary/50' :
                      isCorrect ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800' : 
                      'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800'
                    }`}>
                      <div className="flex items-start gap-3">
                        <div className={`rounded-full w-8 h-8 flex items-center justify-center ${
                          userAnswer === undefined ? 'bg-secondary text-muted-foreground' :
                          isCorrect ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' : 
                          'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="mb-2">{question.question}</p>
                          
                          {userAnswer !== undefined && (
                            <div className="mt-2">
                              <p className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                                {isCorrect ? (
                                  <span className="flex items-center">
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Correct answer: {question.options[question.correctAnswer]}
                                  </span>
                                ) : (
                                  <span>
                                    <span className="flex items-center mb-1">
                                      <AlertCircle className="h-4 w-4 mr-1" />
                                      Your answer: {question.options[userAnswer]}
                                    </span>
                                    <span className="flex items-center">
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Correct answer: {question.options[question.correctAnswer]}
                                    </span>
                                  </span>
                                )}
                              </p>
                              
                              {!isCorrect && (
                                <div className="mt-2 p-3 bg-secondary/50 rounded text-sm">
                                  <p className="font-medium">Explanation:</p>
                                  <p>{question.explanation}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <FadeIn direction="up">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-1">Taking Mock Test</h1>
              <p className="text-muted-foreground">Answer all questions to the best of your ability</p>
            </div>
            <div className="bg-secondary px-4 py-2 rounded-md flex items-center text-lg font-mono">
              <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
              <span className={timeRemaining < 300 ? 'text-red-500 animate-pulse' : ''}>{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress: {answeredCount}/{questions.length} questions answered</span>
            <span className={
              progressPercentage < 30 ? 'text-red-500' :
              progressPercentage < 70 ? 'text-amber-500' :
              'text-green-500'
            }>
              {Math.round(progressPercentage)}% complete
            </span>
          </div>
          <Progress value={progressPercentage} className={
            progressPercentage < 30 ? 'bg-red-500' :
            progressPercentage < 70 ? 'bg-amber-500' :
            'bg-green-500'
          } />
        </div>
        
        <div className="flex gap-4">
          <div className="w-full max-w-4xl">
            <Card className="mb-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Question {currentQuestionIndex + 1} of {questions.length}</div>
                    <CardTitle>{currentQuestion?.question}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={selectedAnswers[currentQuestion?.id]?.toString()} 
                  onValueChange={(value) => handleSelectAnswer(currentQuestion.id, parseInt(value))}
                  className="space-y-3"
                >
                  {currentQuestion?.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-secondary/50">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                        {option}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={handleFinishTest}
                    disabled={!canFinish}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Finish Test
                  </Button>
                  <Button 
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === questions.length - 1}
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            <div className="p-4 bg-secondary/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Note:</span> You must answer at least 70% of questions to submit. You can navigate between questions using the Previous and Next buttons.
              </p>
            </div>
          </div>
          
          <div className="hidden lg:block w-64 bg-card border rounded-lg p-4 h-fit sticky top-24">
            <h3 className="font-medium mb-3">Question Navigator</h3>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, i) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isCurrent = i === currentQuestionIndex;
                
                return (
                  <button
                    key={q.id}
                    className={`h-10 w-10 rounded-md flex items-center justify-center text-sm font-medium transition-colors
                      ${isAnswered 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary hover:bg-secondary/80 text-muted-foreground'}
                      ${isCurrent ? 'ring-2 ring-primary ring-offset-2' : ''}
                    `}
                    onClick={() => setCurrentQuestionIndex(i)}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-3 w-3 rounded-full bg-primary"></div>
                <span>Answered: {answeredCount}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-3 w-3 rounded-full bg-secondary"></div>
                <span>Unanswered: {questions.length - answeredCount}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                className="w-full"
                onClick={handleFinishTest}
                disabled={!canFinish}
              >
                Submit Test
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </DashboardLayout>
  );
};

export default TakeMockTest;
