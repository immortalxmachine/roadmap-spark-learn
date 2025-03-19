
export interface MockTest {
  id: number;
  title: string;
  description: string;
  questions: number;
  time: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  subject: string;
}

export interface TestQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  explanation: string;
  subject: string;
  topic: string;
}

export interface TestResult {
  testId: number;
  score: number;
  totalQuestions: number;
  timeTaken: number; // in seconds
  date: string;
  correctAnswers: number[];
  incorrectAnswers: number[];
  strengths: string[];
  weaknesses: string[];
}
