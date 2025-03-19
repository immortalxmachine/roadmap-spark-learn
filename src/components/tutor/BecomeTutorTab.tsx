
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { GraduationCap, Users, Award, Heart, Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { subjects } from '@/data/subjects';
import AnimatedAvatar from '@/components/ui/avatar-animated';
import { Tutor } from '@/types/tutor';

interface BecomeTutorTabProps {
  topTutors: Tutor[];
}

const BecomeTutorTab: React.FC<BecomeTutorTabProps> = ({ topTutors }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    selectedSubjects: [] as string[],
    communicationPrefs: {
      text: false,
      voice: false,
      video: false
    },
    timeZone: '',
    hoursPerWeek: '',
    availableDays: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    },
    additionalInfo: '',
    agreedToTerms: false
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubjectChange = (subject: string) => {
    setFormData(prev => {
      const selectedSubjects = prev.selectedSubjects.includes(subject)
        ? prev.selectedSubjects.filter(s => s !== subject)
        : [...prev.selectedSubjects, subject];
      
      return {
        ...prev,
        selectedSubjects
      };
    });
  };

  const handleCommPrefChange = (type: 'text' | 'voice' | 'video') => {
    setFormData(prev => ({
      ...prev,
      communicationPrefs: {
        ...prev.communicationPrefs,
        [type]: !prev.communicationPrefs[type]
      }
    }));
  };

  const handleDayChange = (day: string) => {
    setFormData(prev => ({
      ...prev,
      availableDays: {
        ...prev.availableDays,
        [day]: !prev.availableDays[day as keyof typeof prev.availableDays]
      }
    }));
  };

  const handleBecomeTutor = () => {
    // Form validation
    if (!formData.fullName || !formData.email) {
      toast({
        title: "Missing information",
        description: "Please provide your name and email address.",
        variant: "destructive"
      });
      return;
    }

    if (formData.selectedSubjects.length === 0) {
      toast({
        title: "Subject selection required",
        description: "Please select at least one subject you can teach.",
        variant: "destructive"
      });
      return;
    }

    if (!Object.values(formData.communicationPrefs).some(Boolean)) {
      toast({
        title: "Communication preference required",
        description: "Please select at least one communication method.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.agreedToTerms) {
      toast({
        title: "Terms agreement required",
        description: "Please agree to the volunteer tutor terms and code of conduct.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Application submitted!",
      description: "Thank you for volunteering as a tutor. We'll review your application and get back to you.",
    });

    // Reset form
    setFormData({
      fullName: '',
      email: '',
      selectedSubjects: [],
      communicationPrefs: {
        text: false,
        voice: false,
        video: false
      },
      timeZone: '',
      hoursPerWeek: '',
      availableDays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
      },
      additionalInfo: '',
      agreedToTerms: false
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="mr-2 h-5 w-5" />
              Become a Volunteer Tutor
            </CardTitle>
            <CardDescription>
              Share your knowledge and help students succeed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Subjects You Can Teach</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {subjects.map((subject) => (
                    <div key={subject.value} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`subject-${subject.value}`} 
                        checked={formData.selectedSubjects.includes(subject.value)}
                        onCheckedChange={() => handleSubjectChange(subject.value)}
                      />
                      <Label htmlFor={`subject-${subject.value}`} className="text-sm">
                        {subject.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Communication Preferences</Label>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="pref-text" 
                      checked={formData.communicationPrefs.text}
                      onCheckedChange={() => handleCommPrefChange('text')}
                    />
                    <Label htmlFor="pref-text" className="text-sm flex items-center">
                      Text Chat
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="pref-voice" 
                      checked={formData.communicationPrefs.voice}
                      onCheckedChange={() => handleCommPrefChange('voice')}
                    />
                    <Label htmlFor="pref-voice" className="text-sm flex items-center">
                      Voice Call
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="pref-video" 
                      checked={formData.communicationPrefs.video}
                      onCheckedChange={() => handleCommPrefChange('video')}
                    />
                    <Label htmlFor="pref-video" className="text-sm flex items-center">
                      Video Call
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Availability</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="time-zone" className="text-sm">Time Zone</Label>
                    <Select 
                      value={formData.timeZone} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, timeZone: value }))}
                    >
                      <SelectTrigger id="time-zone">
                        <SelectValue placeholder="Select your time zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="utc+0">Greenwich Mean Time (UTC+0)</SelectItem>
                        <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                        <SelectItem value="utc+8">China Standard Time (UTC+8)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="hours-per-week" className="text-sm">Hours Per Week</Label>
                    <Select
                      value={formData.hoursPerWeek}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, hoursPerWeek: value }))}
                    >
                      <SelectTrigger id="hours-per-week">
                        <SelectValue placeholder="Select hours" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 hours</SelectItem>
                        <SelectItem value="3-5">3-5 hours</SelectItem>
                        <SelectItem value="6-10">6-10 hours</SelectItem>
                        <SelectItem value="10+">10+ hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label className="text-sm">Available Days</Label>
                  <div className="flex flex-wrap gap-2">
                    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`day-${day.toLowerCase()}`} 
                          checked={formData.availableDays[day as keyof typeof formData.availableDays]}
                          onCheckedChange={() => handleDayChange(day)}
                        />
                        <Label htmlFor={`day-${day.toLowerCase()}`} className="text-sm">
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Additional Information</Label>
                <Textarea 
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  placeholder="Tell us about your teaching experience and why you want to volunteer as a tutor..."
                  className="min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="credentials" className="text-sm flex items-center">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Credentials (Optional)
                </Label>
                <Input id="credentials" type="file" />
                <p className="text-xs text-muted-foreground">
                  Upload any certifications, degrees, or documentation that establishes your expertise.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={formData.agreedToTerms}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, agreedToTerms: checked === true }))
                  }
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the volunteer tutor terms and code of conduct
                </Label>
              </div>

              <Button type="button" className="w-full" onClick={handleBecomeTutor}>
                <GraduationCap className="mr-2 h-4 w-4" />
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Benefits of Being a Tutor</CardTitle>
            <CardDescription>
              Why volunteer as a tutor on our platform?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 rounded-full p-2 h-fit">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Reinforce Your Knowledge</h3>
                  <p className="text-sm text-muted-foreground">
                    Teaching others helps solidify your own understanding
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 rounded-full p-2 h-fit">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Build Your Network</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect with students and fellow tutors in your field
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 rounded-full p-2 h-fit">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Earn Recognition</h3>
                  <p className="text-sm text-muted-foreground">
                    Unlock achievements and build your reputation
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 rounded-full p-2 h-fit">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Make a Difference</h3>
                  <p className="text-sm text-muted-foreground">
                    Help students overcome challenges and achieve their goals
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Top Tutors This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topTutors.slice(0, 3).map((tutor, idx) => (
                <div key={tutor.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <AnimatedAvatar fallback={tutor.avatar} size="sm" />
                      {idx < 3 && (
                        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-xs font-bold">
                          {idx + 1}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tutor.name}</p>
                      <p className="text-xs text-muted-foreground">{tutor.specialty}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    {tutor.reviews} sessions
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BecomeTutorTab;
