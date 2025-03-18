
import React from 'react';
import { BookOpen, Brain, Award, BookCheck, Users, BarChart3, Settings, Lightbulb } from 'lucide-react';
import FeatureCard from './FeatureCard';
import FadeIn from './animations/FadeIn';

const Features: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Digital Library',
      description: 'Access study materials, previous year papers, and resources with filtering options by subject and difficulty.',
      iconColor: 'text-blue-600',
      iconBgColor: 'bg-blue-100',
      delay: 100
    },
    {
      icon: Brain,
      title: 'AI Study Roadmap',
      description: 'Get a personalized study plan based on your subjects, exam type, and available preparation time.',
      iconColor: 'text-purple-600',
      iconBgColor: 'bg-purple-100',
      delay: 200
    },
    {
      icon: Lightbulb,
      title: 'AI Assistant',
      description: 'Resolve your doubts instantly with our AI assistant using text or voice interactions.',
      iconColor: 'text-amber-600',
      iconBgColor: 'bg-amber-100',
      delay: 300
    },
    {
      icon: BookCheck,
      title: 'Mock Tests',
      description: 'Practice with subject-specific tests and get detailed performance analysis to improve.',
      iconColor: 'text-green-600',
      iconBgColor: 'bg-green-100',
      delay: 100
    },
    {
      icon: Award,
      title: 'Gamification',
      description: 'Earn XP, badges, and rewards as you complete tasks and maintain study streaks.',
      iconColor: 'text-rose-600',
      iconBgColor: 'bg-rose-100',
      delay: 200
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with real-time updates on completed milestones and pending tasks.',
      iconColor: 'text-cyan-600',
      iconBgColor: 'bg-cyan-100',
      delay: 300
    },
    {
      icon: Users,
      title: 'Inclusive Learning',
      description: 'Accessibility features for blind and deaf students including text-to-speech and visual cues.',
      iconColor: 'text-indigo-600',
      iconBgColor: 'bg-indigo-100',
      delay: 100
    },
    {
      icon: Settings,
      title: 'Customizable',
      description: 'Personalize your learning experience with adjustable study pace and interaction preferences.',
      iconColor: 'text-gray-600',
      iconBgColor: 'bg-gray-100',
      delay: 200
    }
  ];

  return (
    <section id="features" className="app-section relative overflow-hidden bg-gradient-to-b from-background to-secondary/30">
      <div className="container-custom">
        <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title mb-4">Powerful Features for Enhanced Learning</h2>
          <p className="text-muted-foreground">
            Our platform combines cutting-edge AI technology with effective learning methodologies to create a comprehensive study environment.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconColor={feature.iconColor}
              iconBgColor={feature.iconBgColor}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
