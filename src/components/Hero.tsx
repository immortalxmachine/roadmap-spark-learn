
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Brain, Award } from 'lucide-react';
import FadeIn from './animations/FadeIn';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 py-20">
        {/* Left Column - Text Content */}
        <div className="flex flex-col justify-center">
          <FadeIn direction="up" className="mb-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <span className="mr-2">✨</span>
              <span>AI-Powered Learning for Remote Students</span>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={100}>
            <h1 className="hero-text mb-6">
              Your Personalized
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent px-2">
                  Study Roadmap
                </span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-accent/20 rounded-sm -z-0"></span>
              </span>
              Powered by AI
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={200}>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl text-balance">
              Empowering students in remote areas with personalized learning experiences through AI-driven guidance, gamification, and inclusive features for all learners.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={300}>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="group">
                Get Started
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline">
                Explore Features
              </Button>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={400}>
            <div className="mt-12 flex items-center space-x-8">
              <div className="flex items-center">
                <div className="rounded-full bg-primary/10 p-2">
                  <BookOpen size={18} className="text-primary" />
                </div>
                <span className="ml-2 text-sm">Digital Library</span>
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-accent/10 p-2">
                  <Brain size={18} className="text-accent" />
                </div>
                <span className="ml-2 text-sm">AI Assistant</span>
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-amber-500/10 p-2">
                  <Award size={18} className="text-amber-500" />
                </div>
                <span className="ml-2 text-sm">Gamification</span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right Column - Hero Image/Illustration */}
        <FadeIn direction="left" delay={200} className="flex items-center justify-center">
          <div className="relative w-full max-w-lg">
            {/* Main Image Container with glass effect */}
            <div className="glass rounded-2xl shadow-xl overflow-hidden aspect-[4/3] w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
              
              {/* Placeholder for an actual image - would be replaced with an actual image in a real implementation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4 animate-float">
                    <BookOpen size={40} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">Personalized Learning</h3>
                  <p className="text-sm text-muted-foreground mt-2">Tailored to your unique needs</p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 glass p-4 rounded-lg shadow-lg animate-float">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Award size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-medium">Weekly Goal</p>
                  <p className="text-sm font-bold">85% Complete</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 glass p-4 rounded-lg shadow-lg animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Brain size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-medium">AI Assistant</p>
                  <p className="text-sm font-bold">Ready to help</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Hero;
