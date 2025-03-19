
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BookOpen, Brain, Award, FileText, Users, MessageCircle, Settings, BarChart3, Headphones, Volume2, VolumeX, Eye, EyeOff } from 'lucide-react';
import AnimatedAvatar from './ui/avatar-animated';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useAccessibility } from '@/contexts/AccessibilityContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { ttsEnabled, toggleTts, visualAlertsEnabled, toggleVisualAlerts, speak } = useAccessibility();
  
  const navItems = [
    { 
      path: '/dashboard', 
      label: 'Dashboard', 
      icon: BarChart3,
      notification: false
    },
    { 
      path: '/roadmap', 
      label: 'Study Roadmap', 
      icon: Brain,
      notification: false
    },
    { 
      path: '/library', 
      label: 'Digital Library', 
      icon: BookOpen,
      notification: 3
    },
    { 
      path: '/mock-tests', 
      label: 'Mock Tests', 
      icon: FileText,
      notification: false
    },
    { 
      path: '/assistant', 
      label: 'AI Assistant', 
      icon: MessageCircle,
      notification: false
    },
    { 
      path: '/gamification', 
      label: 'Achievements', 
      icon: Award,
      notification: 2
    },
    { 
      path: '/support', 
      label: 'Tutor Connection', 
      icon: Headphones,
      notification: false
    },
    { 
      path: '/profile', 
      label: 'Settings', 
      icon: Settings,
      notification: false
    },
  ];

  const handleNavItemClick = (label: string) => {
    if (ttsEnabled) {
      speak(`Navigating to ${label}`);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-card hidden md:flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Study<span className="font-extrabold">Spark</span>
            </span>
          </Link>
          
          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={toggleTts}
              title={ttsEnabled ? "Disable Text-to-Speech" : "Enable Text-to-Speech"}
            >
              {ttsEnabled ? <Volume2 className="h-4 w-4 text-primary" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={toggleVisualAlerts}
              title={visualAlertsEnabled ? "Disable Visual Alerts" : "Enable Visual Alerts"}
            >
              {visualAlertsEnabled ? <Eye className="h-4 w-4 text-primary" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
            </Button>
          </div>
        </div>
        
        <Separator />
        
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <AnimatedAvatar size="md" fallback="JS" animation="pulse" />
            <div>
              <h3 className="font-medium text-sm">John Smith</h3>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-muted-foreground">Level 12</span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">980 XP</Badge>
              </div>
            </div>
          </div>
        </div>
        
        <ScrollArea className="flex-1 py-2">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              onClick={() => handleNavItemClick(item.label)}
            >
              <div 
                className={cn(
                  "flex items-center justify-between px-4 py-2 mx-2 rounded-md cursor-pointer group transition-colors",
                  location.pathname === item.path 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-secondary"
                )}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={cn(
                    "h-4 w-4",
                    location.pathname === item.path ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )} />
                  <span className={cn(
                    "text-sm",
                    location.pathname === item.path ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )}>
                    {item.label}
                  </span>
                </div>
                {item.notification && (
                  <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4">
                    {item.notification}
                  </Badge>
                )}
              </div>
            </Link>
          ))}
        </ScrollArea>
        
        <div className="p-4 mt-auto">
          <div className="rounded-lg bg-secondary/50 p-3">
            <div className="flex items-center space-x-3 mb-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Daily Streak</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">14</span>
              <div className="text-xs text-right text-muted-foreground">
                <div>Days</div>
                <div className="font-medium text-green-600">+25 XP today</div>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <Button variant="outline" size="sm" className="w-full">
            <MessageCircle className="mr-2 h-4 w-4" />
            Get Help
          </Button>
        </div>
      </div>
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-background border-b border-border p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Study<span className="font-extrabold">Spark</span>
          </Link>
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTts}
            >
              {ttsEnabled ? <Volume2 className="h-5 w-5 text-primary" /> : <VolumeX className="h-5 w-5" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleVisualAlerts}
            >
              {visualAlertsEnabled ? <Eye className="h-5 w-5 text-primary" /> : <EyeOff className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <AnimatedAvatar size="sm" fallback="JS" />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 md:p-6 p-4 pt-16 md:pt-6 overflow-auto">
          {children}
        </main>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-30">
        <div className="flex justify-between p-2">
          {navItems.slice(0, 5).map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-md relative",
                location.pathname === item.path ? "text-primary" : "text-muted-foreground"
              )}
              onClick={() => handleNavItemClick(item.label)}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label.split(' ')[0]}</span>
              {item.notification && (
                <Badge 
                  variant="default" 
                  className="absolute -top-1 -right-1 text-[10px] w-4 h-4 flex items-center justify-center p-0"
                >
                  {item.notification}
                </Badge>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
