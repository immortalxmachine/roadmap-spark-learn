
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Phone, Video, Calendar, Star, GraduationCap, Award } from 'lucide-react';
import AnimatedAvatar from '@/components/ui/avatar-animated';
import { useToast } from "@/hooks/use-toast";
import { Tutor } from '@/types/tutor';

interface TutorCardProps {
  tutor: Tutor;
  onSchedule?: (tutor: Tutor) => void;
}

const TutorCard: React.FC<TutorCardProps> = ({ tutor, onSchedule }) => {
  const { toast } = useToast();

  const handleMessage = () => {
    toast({
      title: "Message sent",
      description: `Your message has been sent to ${tutor.name}.`,
    });
  };

  const handleSchedule = () => {
    toast({
      title: "Schedule session",
      description: `Setting up a session with ${tutor.name}.`,
    });
    
    if (onSchedule) {
      onSchedule(tutor);
    }
  };

  return (
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
                <Calendar className="mr-2 h-4 w-4" />
                Schedule
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorCard;
