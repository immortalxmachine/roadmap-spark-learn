
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { BadgeAlert, User, Bell, BarChart3, Lock, Eye, EyeOff, Volume, VolumeX, Moon, SunMedium } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import AnimatedAvatar from '@/components/ui/avatar-animated';
import { Badge } from '@/components/ui/badge';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    darkMode: false,
    ttsEnabled: true,
    visualAlerts: true,
    notificationsEnabled: true,
    studyReminders: true,
    streakAlerts: true,
    testReminders: true,
    showPassword: false,
    studyPace: 'balanced',
    interactionMode: 'both',
    accessibilityMode: 'standard'
  });
  
  const handleToggle = (setting: string) => {
    setSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };
  
  const studyPaceOptions = [
    { value: 'intensive', label: 'Intensive - More content, longer sessions' },
    { value: 'balanced', label: 'Balanced - Standard pace and content' },
    { value: 'relaxed', label: 'Relaxed - Slower pace, shorter sessions' }
  ];
  
  const interactionModeOptions = [
    { value: 'text', label: 'Text Only', description: 'All interactions through text' },
    { value: 'voice', label: 'Voice Only', description: 'Voice commands and audio responses' },
    { value: 'both', label: 'Combined', description: 'Text and voice interactions' }
  ];
  
  const accessibilityModeOptions = [
    { value: 'standard', label: 'Standard Mode' },
    { value: 'visual', label: 'Enhanced Visual Cues (for hearing impaired)' },
    { value: 'audio', label: 'Enhanced Audio Guidance (for visually impaired)' }
  ];

  return (
    <DashboardLayout>
      <FadeIn direction="up">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Profile & Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and accessibility options</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center mb-6">
                <AnimatedAvatar fallback="JS" size="xl" className="mb-4" />
                <h2 className="text-xl font-semibold">John Smith</h2>
                <p className="text-muted-foreground text-sm">NEET Aspirant</p>
                <div className="flex items-center mt-2">
                  <Badge className="mr-2">Level 12</Badge>
                  <Badge variant="outline">980 XP</Badge>
                </div>
              </div>
              
              <Separator className="mb-4" />
              
              <nav className="space-y-1">
                <button
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                    activeTab === 'profile' 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-muted-foreground hover:bg-secondary'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  <User className="h-4 w-4 mr-3" />
                  Profile Information
                </button>
                <button
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                    activeTab === 'notifications' 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-muted-foreground hover:bg-secondary'
                  }`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <Bell className="h-4 w-4 mr-3" />
                  Notifications
                </button>
                <button
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                    activeTab === 'accessibility' 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-muted-foreground hover:bg-secondary'
                  }`}
                  onClick={() => setActiveTab('accessibility')}
                >
                  <BadgeAlert className="h-4 w-4 mr-3" />
                  Accessibility
                </button>
                <button
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                    activeTab === 'preferences' 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-muted-foreground hover:bg-secondary'
                  }`}
                  onClick={() => setActiveTab('preferences')}
                >
                  <BarChart3 className="h-4 w-4 mr-3" />
                  Study Preferences
                </button>
                <button
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                    activeTab === 'security' 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-muted-foreground hover:bg-secondary'
                  }`}
                  onClick={() => setActiveTab('security')}
                >
                  <Lock className="h-4 w-4 mr-3" />
                  Security
                </button>
              </nav>
            </CardContent>
          </Card>

          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Smith" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="john.smith@example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="+1234567890" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea 
                        id="bio" 
                        rows={4}
                        className="w-full p-3 rounded-md border border-input bg-background"
                        defaultValue="NEET aspirant focusing on Biology and Chemistry. Looking to improve my physics scores."
                      ></textarea>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Profile Picture</Label>
                      <div className="flex items-center space-x-4">
                        <AnimatedAvatar fallback="JS" size="lg" />
                        <Button variant="outline" size="sm">Change Picture</Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Changes</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
            
            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Control what notifications you receive and how</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                      <div className="flex items-center">
                        <Bell className="h-5 w-5 mr-3" />
                        <div>
                          <h3 className="font-medium">All Notifications</h3>
                          <p className="text-sm text-muted-foreground">Enable or disable all notifications</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleToggle('notificationsEnabled')}
                        className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 focus:outline-none ${
                          settings.notificationsEnabled ? 'bg-primary justify-end' : 'bg-muted justify-start'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-white shadow-sm transform mx-0.5"></span>
                      </button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Notification Types</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-sm font-medium">Study Reminders</h4>
                            <p className="text-xs text-muted-foreground">Daily reminders for scheduled study sessions</p>
                          </div>
                          <button
                            onClick={() => handleToggle('studyReminders')}
                            className={`w-10 h-5 rounded-full flex items-center transition-colors duration-300 focus:outline-none ${
                              settings.studyReminders ? 'bg-primary justify-end' : 'bg-muted justify-start'
                            }`}
                          >
                            <span className="w-4 h-4 rounded-full bg-white shadow-sm transform mx-0.5"></span>
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-sm font-medium">Streak Alerts</h4>
                            <p className="text-xs text-muted-foreground">Notifications about your study streak status</p>
                          </div>
                          <button
                            onClick={() => handleToggle('streakAlerts')}
                            className={`w-10 h-5 rounded-full flex items-center transition-colors duration-300 focus:outline-none ${
                              settings.streakAlerts ? 'bg-primary justify-end' : 'bg-muted justify-start'
                            }`}
                          >
                            <span className="w-4 h-4 rounded-full bg-white shadow-sm transform mx-0.5"></span>
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-sm font-medium">Test Reminders</h4>
                            <p className="text-xs text-muted-foreground">Notifications about upcoming mock tests</p>
                          </div>
                          <button
                            onClick={() => handleToggle('testReminders')}
                            className={`w-10 h-5 rounded-full flex items-center transition-colors duration-300 focus:outline-none ${
                              settings.testReminders ? 'bg-primary justify-end' : 'bg-muted justify-start'
                            }`}
                          >
                            <span className="w-4 h-4 rounded-full bg-white shadow-sm transform mx-0.5"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-end">
                      <Button>Save Notification Settings</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {activeTab === 'accessibility' && (
              <Card>
                <CardHeader>
                  <CardTitle>Accessibility Settings</CardTitle>
                  <CardDescription>Configure options to make the platform more accessible</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Visual Settings</h3>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                          <div className="flex items-center">
                            {settings.darkMode ? <Moon className="h-5 w-5 mr-3" /> : <SunMedium className="h-5 w-5 mr-3" />}
                            <div>
                              <h3 className="font-medium">{settings.darkMode ? 'Dark Mode' : 'Light Mode'}</h3>
                              <p className="text-sm text-muted-foreground">
                                {settings.darkMode ? 'Easier on the eyes in low light' : 'Standard display mode'}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleToggle('darkMode')}
                            className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 focus:outline-none ${
                              settings.darkMode ? 'bg-primary justify-end' : 'bg-muted justify-start'
                            }`}
                          >
                            <span className="w-5 h-5 rounded-full bg-white shadow-sm transform mx-0.5"></span>
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                          <div className="flex items-center">
                            {settings.visualAlerts ? <Eye className="h-5 w-5 mr-3" /> : <EyeOff className="h-5 w-5 mr-3" />}
                            <div>
                              <h3 className="font-medium">Enhanced Visual Alerts</h3>
                              <p className="text-sm text-muted-foreground">Additional visual cues for notifications</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleToggle('visualAlerts')}
                            className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 focus:outline-none ${
                              settings.visualAlerts ? 'bg-primary justify-end' : 'bg-muted justify-start'
                            }`}
                          >
                            <span className="w-5 h-5 rounded-full bg-white shadow-sm transform mx-0.5"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Audio Settings</h3>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                          <div className="flex items-center">
                            {settings.ttsEnabled ? <Volume className="h-5 w-5 mr-3" /> : <VolumeX className="h-5 w-5 mr-3" />}
                            <div>
                              <h3 className="font-medium">Text-to-Speech</h3>
                              <p className="text-sm text-muted-foreground">Read content aloud for visually impaired users</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleToggle('ttsEnabled')}
                            className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 focus:outline-none ${
                              settings.ttsEnabled ? 'bg-primary justify-end' : 'bg-muted justify-start'
                            }`}
                          >
                            <span className="w-5 h-5 rounded-full bg-white shadow-sm transform mx-0.5"></span>
                          </button>
                        </div>
                        
                        {settings.ttsEnabled && (
                          <>
                            <div className="p-3 rounded-lg bg-secondary/50">
                              <Label htmlFor="voice" className="mb-2 block text-sm font-medium">Voice Selection</Label>
                              <select 
                                id="voice" 
                                className="w-full p-2 rounded-md border border-input bg-background"
                              >
                                <option value="david">David (Male)</option>
                                <option value="sarah">Sarah (Female)</option>
                                <option value="james">James (Male)</option>
                                <option value="emma">Emma (Female)</option>
                              </select>
                            </div>
                            
                            <div className="p-3 rounded-lg bg-secondary/50">
                              <Label htmlFor="speed" className="mb-2 block text-sm font-medium">Speech Speed</Label>
                              <div className="flex items-center space-x-2">
                                <input 
                                  type="range" 
                                  id="speed" 
                                  min="0.5" 
                                  max="2" 
                                  step="0.1" 
                                  defaultValue="1"
                                  className="w-full"
                                />
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>Slower</span>
                                <span>Normal</span>
                                <span>Faster</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Accessibility Mode</h3>
                      <div className="space-y-3">
                        {accessibilityModeOptions.map((option) => (
                          <div 
                            key={option.value}
                            className={`p-3 rounded-lg border cursor-pointer ${
                              settings.accessibilityMode === option.value 
                                ? 'border-primary bg-primary/5' 
                                : 'border-border hover:border-primary/50'
                            }`}
                            onClick={() => setSettings(prev => ({ ...prev, accessibilityMode: option.value }))}
                          >
                            <div className="flex items-center">
                              <div className={`w-4 h-4 rounded-full border mr-3 ${
                                settings.accessibilityMode === option.value 
                                  ? 'border-4 border-primary' 
                                  : 'border-muted-foreground'
                              }`}></div>
                              <span className="font-medium">{option.label}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-end">
                      <Button>Save Accessibility Settings</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {activeTab === 'preferences' && (
              <Card>
                <CardHeader>
                  <CardTitle>Study Preferences</CardTitle>
                  <CardDescription>Customize your learning experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Study Pace</h3>
                      <div className="space-y-3">
                        {studyPaceOptions.map((option) => (
                          <div 
                            key={option.value}
                            className={`p-3 rounded-lg border cursor-pointer ${
                              settings.studyPace === option.value 
                                ? 'border-primary bg-primary/5' 
                                : 'border-border hover:border-primary/50'
                            }`}
                            onClick={() => setSettings(prev => ({ ...prev, studyPace: option.value }))}
                          >
                            <div className="flex items-center">
                              <div className={`w-4 h-4 rounded-full border mr-3 ${
                                settings.studyPace === option.value 
                                  ? 'border-4 border-primary' 
                                  : 'border-muted-foreground'
                              }`}></div>
                              <span className="font-medium">{option.label}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">AI Assistant Interaction Mode</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {interactionModeOptions.map((option) => (
                          <div 
                            key={option.value}
                            className={`p-3 rounded-lg border cursor-pointer h-full ${
                              settings.interactionMode === option.value 
                                ? 'border-primary bg-primary/5' 
                                : 'border-border hover:border-primary/50'
                            }`}
                            onClick={() => setSettings(prev => ({ ...prev, interactionMode: option.value }))}
                          >
                            <div className="flex items-center mb-2">
                              <div className={`w-4 h-4 rounded-full border mr-3 ${
                                settings.interactionMode === option.value 
                                  ? 'border-4 border-primary' 
                                  : 'border-muted-foreground'
                              }`}></div>
                              <span className="font-medium">{option.label}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{option.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Subject Priorities</h3>
                      <p className="text-sm text-muted-foreground">Drag to reorder subjects based on your priority</p>
                      <div className="space-y-2">
                        {['Physics', 'Chemistry', 'Biology', 'Mathematics'].map((subject, index) => (
                          <div 
                            key={subject}
                            className="p-3 rounded-lg bg-secondary/50 flex items-center justify-between cursor-move"
                          >
                            <div className="flex items-center">
                              <span className="font-medium text-sm mr-2">{index + 1}.</span>
                              <span>{subject}</span>
                            </div>
                            <div className="flex">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m18 15-6-6-6 6"/></svg>
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m6 9 6 6 6-6"/></svg>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-end">
                      <Button>Save Study Preferences</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {activeTab === 'security' && (
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Change Password</h3>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <div className="relative">
                            <Input 
                              id="currentPassword" 
                              type={settings.showPassword ? "text" : "password"} 
                              className="pr-10"
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-3 text-muted-foreground"
                              onClick={() => handleToggle('showPassword')}
                            >
                              {settings.showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input 
                            id="newPassword" 
                            type={settings.showPassword ? "text" : "password"}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input 
                            id="confirmPassword" 
                            type={settings.showPassword ? "text" : "password"}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <div className="p-4 rounded-lg border border-border bg-muted/50">
                        <div className="flex items-start space-x-3">
                          <Badge className="mt-1 bg-amber-500">Recommended</Badge>
                          <div>
                            <h4 className="font-medium mb-1">Enhance Your Account Security</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              Two-factor authentication adds an extra layer of security to your account by requiring
                              a verification code in addition to your password.
                            </p>
                            <Button variant="outline">Enable Two-Factor Authentication</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Login Sessions</h3>
                      <div className="border rounded-lg overflow-hidden">
                        <div className="p-4 bg-secondary/50 flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Current Session</h4>
                            <p className="text-xs text-muted-foreground">Chrome on Windows • New York, USA</p>
                          </div>
                          <Badge>Active Now</Badge>
                        </div>
                        <Separator />
                        <div className="p-4 flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Mobile App</h4>
                            <p className="text-xs text-muted-foreground">iPhone 13 • 2 days ago</p>
                          </div>
                          <Button variant="outline" size="sm">Logout</Button>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between">
                      <Button variant="destructive" type="button">Delete Account</Button>
                      <Button>Update Security Settings</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </FadeIn>
    </DashboardLayout>
  );
};

export default ProfileSettings;
