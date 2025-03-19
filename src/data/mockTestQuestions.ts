
import { TestQuestion } from '@/types/mockTest';

export const mockTestQuestions: (TestQuestion & { testId: number })[] = [
  // Physics: Mechanics & Waves (Test ID: 1)
  {
    id: 101,
    testId: 1,
    question: "Which of Newton's laws states that an object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force?",
    options: ["First Law", "Second Law", "Third Law", "Fourth Law"],
    correctAnswer: 0,
    explanation: "Newton's First Law of Motion, also known as the law of inertia, states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.",
    subject: "Physics",
    topic: "Newton's Laws"
  },
  {
    id: 102,
    testId: 1,
    question: "What is the formula for kinetic energy?",
    options: ["KE = mgh", "KE = mv", "KE = 0.5mv²", "KE = Fd"],
    correctAnswer: 2,
    explanation: "The kinetic energy of an object is given by KE = 0.5mv², where m is the mass and v is the velocity of the object.",
    subject: "Physics",
    topic: "Energy"
  },
  {
    id: 103,
    testId: 1,
    question: "What type of wave requires a medium to travel through?",
    options: ["Electromagnetic wave", "Mechanical wave", "Matter wave", "Gravitational wave"],
    correctAnswer: 1,
    explanation: "Mechanical waves require a medium to travel through, such as sound waves traveling through air or water waves traveling through water.",
    subject: "Physics",
    topic: "Waves"
  },
  {
    id: 104,
    testId: 1,
    question: "What is the relationship between frequency (f) and wavelength (λ) for a wave with velocity (v)?",
    options: ["v = f/λ", "v = fλ", "v = f²λ", "v = f + λ"],
    correctAnswer: 1,
    explanation: "The wave equation states that velocity equals frequency multiplied by wavelength (v = fλ).",
    subject: "Physics",
    topic: "Waves"
  },
  {
    id: 105,
    testId: 1,
    question: "According to the law of conservation of momentum, what must be true in a closed system?",
    options: ["Total energy must increase", "Total momentum must remain constant", "Total force must be zero", "Total mass must decrease"],
    correctAnswer: 1,
    explanation: "The law of conservation of momentum states that in a closed system (no external forces), the total momentum remains constant.",
    subject: "Physics",
    topic: "Momentum"
  },
  
  // Chemistry: Organic Compounds (Test ID: 2)
  {
    id: 201,
    testId: 2,
    question: "Which functional group is characteristic of alcohols?",
    options: ["Carbonyl (-C=O)", "Hydroxyl (-OH)", "Carboxyl (-COOH)", "Amino (-NH₂)"],
    correctAnswer: 1,
    explanation: "Alcohols are characterized by the presence of a hydroxyl (-OH) functional group attached to a carbon atom.",
    subject: "Chemistry",
    topic: "Functional Groups"
  },
  {
    id: 202,
    testId: 2,
    question: "What type of reaction converts an alkene to an alkane?",
    options: ["Oxidation", "Reduction", "Hydrolysis", "Condensation"],
    correctAnswer: 1,
    explanation: "The conversion of an alkene to an alkane involves the addition of hydrogen across the double bond, which is a reduction reaction.",
    subject: "Chemistry",
    topic: "Organic Reactions"
  },
  {
    id: 203,
    testId: 2,
    question: "Which of the following is not an isomer of C₄H₁₀?",
    options: ["n-butane", "isobutane", "neopentane", "cyclobutane"],
    correctAnswer: 2,
    explanation: "Neopentane has a molecular formula of C₅H₁₂, not C₄H₁₀. The isomers of C₄H₁₀ are n-butane and isobutane.",
    subject: "Chemistry",
    topic: "Isomerism"
  },
  
  // Biology: Cell Structure (Test ID: 3)
  {
    id: 301,
    testId: 3,
    question: "Which organelle is responsible for protein synthesis in the cell?",
    options: ["Mitochondrion", "Ribosome", "Golgi apparatus", "Lysosome"],
    correctAnswer: 1,
    explanation: "Ribosomes are the cellular organelles responsible for protein synthesis. They can be found free in the cytoplasm or attached to the endoplasmic reticulum.",
    subject: "Biology",
    topic: "Cell Organelles"
  },
  {
    id: 302,
    testId: 3,
    question: "The fluid mosaic model describes the structure of:",
    options: ["DNA", "Cell membrane", "Mitochondrion", "Nucleus"],
    correctAnswer: 1,
    explanation: "The fluid mosaic model describes the structure of the cell membrane, which consists of a phospholipid bilayer with embedded proteins that can move laterally.",
    subject: "Biology",
    topic: "Cell Membrane"
  },
  
  // Mathematics: Calculus (Test ID: 4)
  {
    id: 401,
    testId: 4,
    question: "What is the derivative of sin(x) with respect to x?",
    options: ["cos(x)", "-sin(x)", "-cos(x)", "tan(x)"],
    correctAnswer: 0,
    explanation: "The derivative of sin(x) with respect to x is cos(x).",
    subject: "Mathematics",
    topic: "Differentiation"
  },
  {
    id: 402,
    testId: 4,
    question: "What is the integration of 2x with respect to x?",
    options: ["x²", "x² + C", "2x² + C", "x² - C"],
    correctAnswer: 1,
    explanation: "The integration of 2x with respect to x is x² + C, where C is the constant of integration.",
    subject: "Mathematics",
    topic: "Integration"
  }
];
