import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Phone, Video, CalendarIcon, Star, GraduationCap, Award } from 'lucide-react';
import AnimatedAvatar from '@/components/ui/avatar-animated';
import { useToast } from "@/hooks/use-toast";
import { Tutor } from '@/types/tutor';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useTutorSessions } from '@/hooks/useTutorSessions';
import { format } from 'date-fns';

interface TutorCardProps {
  tutor: Tutor;
  onSchedule?: (tutor: Tutor) => void;
}

const scheduleFormSchema = z.object({
  subject: z.string().min(1, { message: 'Subject is required' }),
  topic: z.string().min(3, { message: 'Please provide a specific topic' }),
  date: z.date({ required_error: 'Please select a date' }),
  duration: z.string().min(1, { message: 'Duration is required' }),
  mode: z.enum(['text', 'voice', 'video'], { required_error: 'Please select a communication mode' }),
});

type ScheduleFormValues = z.infer<typeof scheduleFormSchema>;

const TutorCard: React.FC<TutorCardProps> = ({ tutor, onSchedule }) => {
  const { toast } = useToast();
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const { scheduleSession } = useTutorSessions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      subject: '',
      topic: '',
      duration: '30min',
      mode: tutor.communicationModes.includes('video') ? 'video' : 
             tutor.communicationModes.includes('voice') ? 'voice' : 'text',
    },
  });

  const handleMessage = () => {
    toast({
      title: "Message sent",
      description: `Your message has been sent to ${tutor.name}.`,
    });
  };

  const handleSchedule = () => {
    setIsScheduleDialogOpen(true);
  };

  const handleScheduleSubmit = async (values: ScheduleFormValues) => {
    setIsSubmitting(true);
    try {
      const formattedDate = format(values.date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
      
      const success = await scheduleSession({
        tutor_id: tutor.id,
        subject: values.subject,
        topic: values.topic,
        start_time: formattedDate,
        duration: values.duration,
        mode: values.mode,
      });

      if (success) {
        setIsScheduleDialogOpen(false);
        form.reset();
        
        if (onSchedule) {
          onSchedule(tutor);
        }
      }
    } catch (error) {
      console.error('Error scheduling session:', error);
      toast({
        title: 'Error',
        description: 'Failed to schedule session. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Card key={tutor.id} className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="flex-shrink-0">
              <AnimatedAvatar 
                fallback={tutor.avatar} 
                size="lg"
                animation={tutor.status === 'available' ? 'pulse' : 'none'}
                className={tutor.status === 'available' ? 'ring-2 ring-green-500' : ''}
              />
              <div className="mt-2 text-center">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                  Level {tutor.level}
                </Badge>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium flex items-center">
                    {tutor.name}
                    <GraduationCap className="ml-1 h-4 w-4 text-muted-foreground" />
                  </h3>
                  <p className="text-sm text-muted-foreground">Expert in {tutor.specialty}</p>
                </div>
                <div>
                  {tutor.status === 'available' && (
                    <Badge className="bg-green-500">Available Now</Badge>
                  )}
                  {tutor.status === 'busy' && (
                    <Badge variant="outline" className="text-muted-foreground">
                      Available in {tutor.available_in}
                    </Badge>
                  )}
                  {tutor.status === 'scheduled' && (
                    <Badge variant="outline" className="text-muted-foreground">
                      Next: {tutor.next_session}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {tutor.expertise.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
                ))}
              </div>
              
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(tutor.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-1 text-sm font-medium">{tutor.rating}</span>
                <span className="mx-1.5 text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{tutor.reviews} reviews</span>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {tutor.badges.map((badge, index) => (
                  <div key={index} className="flex items-center text-xs px-2 py-1 rounded-full bg-secondary">
                    <Award className="h-3 w-3 mr-1 text-amber-500" />
                    {badge}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center mb-4 text-sm">
                <span className="mr-2">Available via:</span>
                {tutor.communicationModes.includes('text') && (
                  <Badge variant="outline" className="mr-1">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Text
                  </Badge>
                )}
                {tutor.communicationModes.includes('voice') && (
                  <Badge variant="outline" className="mr-1">
                    <Phone className="h-3 w-3 mr-1" />
                    Voice
                  </Badge>
                )}
                {tutor.communicationModes.includes('video') && (
                  <Badge variant="outline">
                    <Video className="h-3 w-3 mr-1" />
                    Video
                  </Badge>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1" onClick={handleMessage}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleSchedule}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Schedule
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule a Session with {tutor.name}</DialogTitle>
            <DialogDescription>
              Complete the form below to schedule a tutoring session. 
              You'll receive a confirmation once the session is booked.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleScheduleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                        <SelectItem value="computer_science">Computer Science</SelectItem>
                        <SelectItem value="language_arts">Language Arts</SelectItem>
                        <SelectItem value="foreign_languages">Foreign Languages</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="geography">Geography</SelectItem>
                        <SelectItem value="social_studies">Social Studies</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specific Topic</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please describe the specific topic you need help with..." 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 2))}
                        initialFocus
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="30min">30 minutes</SelectItem>
                          <SelectItem value="60min">1 hour</SelectItem>
                          <SelectItem value="90min">1.5 hours</SelectItem>
                          <SelectItem value="120min">2 hours</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="mode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Communication Mode</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select mode" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tutor.communicationModes.includes('text') && (
                            <SelectItem value="text">Text</SelectItem>
                          )}
                          {tutor.communicationModes.includes('voice') && (
                            <SelectItem value="voice">Voice</SelectItem>
                          )}
                          {tutor.communicationModes.includes('video') && (
                            <SelectItem value="video">Video</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsScheduleDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Scheduling...' : 'Schedule Session'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TutorCard;
