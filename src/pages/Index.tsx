
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen, Brain, Award, CircleCheck, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import FadeIn from '@/components/animations/FadeIn';
import AnimatedAvatar from '@/components/ui/avatar-animated';

const Index = () => {
  // Smooth scrolling for anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }, []);

  return (
    <ScrollArea className="h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        
        {/* Roadmap Section */}
        <section id="roadmap" className="app-section bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/50 to-transparent -z-10 rounded-l-3xl"></div>
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="right">
                <div className="relative">
                  <div className="glass rounded-xl p-6 shadow-lg relative z-10">
                    <div className="bg-gradient-to-br from-primary/5 to-accent/5 absolute inset-0 rounded-xl -z-10"></div>
                    <h3 className="text-xl font-semibold mb-3">Your Study Roadmap</h3>
                    <p className="text-muted-foreground text-sm mb-6">Customized for Physics Exam in 30 days</p>
                    
                    <div className="space-y-4 mb-6">
                      {[
                        { 
                          day: 'Day 1-3', 
                          title: 'Mechanics Fundamentals', 
                          icon: BookOpen, 
                          status: 'completed',
                          color: 'text-green-600',
                          bgColor: 'bg-green-100' 
                        },
                        { 
                          day: 'Day 4-6', 
                          title: 'Thermodynamics', 
                          icon: Brain, 
                          status: 'in-progress',
                          color: 'text-blue-600',
                          bgColor: 'bg-blue-100' 
                        },
                        { 
                          day: 'Day 7-9', 
                          title: 'Electrostatics', 
                          icon: FileText, 
                          status: 'upcoming',
                          color: 'text-gray-600',
                          bgColor: 'bg-gray-100' 
                        },
                        { 
                          day: 'Day 10-12', 
                          title: 'Mock Test & Review', 
                          icon: Clock, 
                          status: 'upcoming',
                          color: 'text-amber-600',
                          bgColor: 'bg-amber-100' 
                        }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className={`${item.bgColor} rounded-full p-2 mt-1`}>
                            <item.icon className={`h-5 w-5 ${item.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">{item.day}</p>
                                <p className="font-medium">{item.title}</p>
                              </div>
                              {item.status === 'completed' && (
                                <CircleCheck className="h-5 w-5 text-green-600" />
                              )}
                            </div>
                            {index < 3 && <Separator className="my-3" />}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full">View Full Roadmap</Button>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-10 -right-12 glass p-3 rounded-lg shadow-md animate-float">
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-amber-500" />
                      <p className="text-sm font-medium">75% Complete</p>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-8 -left-8 glass p-3 rounded-lg shadow-md animate-float" style={{ animationDelay: '1.5s' }}>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-purple-600" />
                      <p className="text-sm font-medium">24 days remaining</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn direction="left">
                <h2 className="section-title mb-6">AI-Powered Study Roadmap Generator</h2>
                <p className="text-muted-foreground mb-8">
                  Our advanced AI algorithm creates a personalized study plan tailored to your unique learning needs, available time, and exam requirements.
                </p>
                
                <ul className="space-y-4 mb-8">
                  {[
                    "Optimized study slots to balance all subjects",
                    "Strategic revision breaks and practice tests",
                    "Dynamically adjusts based on your performance",
                    "Identifies and focuses on weak areas automatically",
                    "Includes daily goals and achievement tracking"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="rounded-full bg-green-100 p-1 mr-3 mt-1">
                        <CircleCheck className="h-4 w-4 text-green-600" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Button size="lg" className="mr-4">Generate Your Roadmap</Button>
                <Button size="lg" variant="outline">Learn More</Button>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* AI Assistant Section */}
        <section id="assistant" className="app-section bg-gradient-to-b from-background to-secondary/30">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <FadeIn direction="up">
                <h2 className="section-title mb-4">AI-Powered Virtual Assistant</h2>
                <p className="text-muted-foreground">
                  Get instant help with your academic doubts through our intelligent assistant that supports both text and voice interactions.
                </p>
              </FadeIn>
            </div>
            
            <div className="max-w-4xl mx-auto glass rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-border">
                <div className="flex items-center">
                  <AnimatedAvatar 
                    src="" 
                    fallback="AI" 
                    size="md"
                    animation="pulse"
                    className="mr-3"
                  />
                  <div>
                    <h3 className="font-medium">Study Assistant</h3>
                    <p className="text-xs text-muted-foreground">Always ready to help</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 h-[400px] overflow-y-auto flex flex-col space-y-4">
                <FadeIn direction="right" delay={100}>
                  <div className="flex items-start max-w-[80%]">
                    <AnimatedAvatar fallback="AI" size="sm" className="mr-3 mt-1" />
                    <div className="glass-dark p-3 rounded-lg rounded-tl-none">
                      <p className="text-sm">Hello! I'm your AI study assistant. How can I help you today?</p>
                    </div>
                  </div>
                </FadeIn>
                
                <FadeIn direction="left" delay={200}>
                  <div className="flex items-start max-w-[80%] self-end">
                    <div className="bg-primary/10 p-3 rounded-lg rounded-tr-none">
                      <p className="text-sm">I'm struggling with understanding the concept of electromagnetism. Can you explain it simply?</p>
                    </div>
                    <AnimatedAvatar fallback="U" size="sm" className="ml-3 mt-1" />
                  </div>
                </FadeIn>
                
                <FadeIn direction="right" delay={300}>
                  <div className="flex items-start max-w-[90%]">
                    <AnimatedAvatar fallback="AI" size="sm" className="mr-3 mt-1" />
                    <div className="glass-dark p-3 rounded-lg rounded-tl-none">
                      <p className="text-sm">
                        Absolutely! Electromagnetism is about the relationship between electricity and magnetism. 
                        <br /><br />
                        At its core, it describes how electric currents create magnetic fields, and how changing magnetic fields create electric currents. This relationship is fundamental to many technologies we use today.
                        <br /><br />
                        Would you like me to explain more about how this works in practical applications, or would you prefer to explore the mathematical formulations?
                      </p>
                    </div>
                  </div>
                </FadeIn>
                
                <FadeIn direction="left" delay={400}>
                  <div className="flex items-start max-w-[80%] self-end">
                    <div className="bg-primary/10 p-3 rounded-lg rounded-tr-none">
                      <p className="text-sm">Practical applications would be helpful, thanks!</p>
                    </div>
                    <AnimatedAvatar fallback="U" size="sm" className="ml-3 mt-1" />
                  </div>
                </FadeIn>
                
                <FadeIn direction="right" delay={500}>
                  <div className="flex items-start max-w-[90%]">
                    <AnimatedAvatar fallback="AI" size="sm" className="mr-3 mt-1" />
                    <div className="glass-dark p-3 rounded-lg rounded-tl-none">
                      <p className="text-sm">
                        Great choice! Here are some practical applications of electromagnetism:
                        <br /><br />
                        1. <b>Electric Motors</b>: Found in fans, electric cars, and washing machines. They use electromagnetic forces to convert electrical energy into mechanical movement.
                        <br /><br />
                        2. <b>Generators</b>: The opposite of motors! They convert mechanical energy into electricity by moving magnets near coils of wire.
                        <br /><br />
                        3. <b>Transformers</b>: These change the voltage of electricity and are essential for power distribution.
                        <br /><br />
                        Would you like me to recommend some simple experiments you can try to see electromagnetism in action?
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </div>
              
              <div className="p-6 border-t border-border">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Type your question here..." 
                    className="w-full p-3 pr-12 rounded-md border border-border bg-background"
                  />
                  <Button className="absolute right-1 top-1" size="sm">Send</Button>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="text-xs text-muted-foreground">
                    Voice input available for accessibility
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <BookOpen className="h-4 w-4 mr-1" /> 
                      <span className="text-xs">Suggest Resources</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-primary/5 to-accent/5"></div>
          </div>
          
          <div className="container-custom">
            <FadeIn direction="up" className="text-center max-w-3xl mx-auto">
              <h2 className="section-title mb-6">Ready to Transform Your Learning Experience?</h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of students who are already benefiting from our AI-powered study platform. Get started today and see the difference!
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="px-8">Get Started Now</Button>
                <Button size="lg" variant="outline">Schedule a Demo</Button>
              </div>
            </FadeIn>
          </div>
        </section>
        
        <Footer />
      </main>
    </ScrollArea>
  );
};

export default Index;
