
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, BookOpen, Video, Volume2, Info } from 'lucide-react';
import TextToSpeech from '@/components/accessibility/TextToSpeech';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StudyMaterialCardProps {
  title: string;
  description: string;
  type: 'notes' | 'video' | 'audio';
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  onDownload?: () => void;
  onView?: () => void;
}

const StudyMaterialCard: React.FC<StudyMaterialCardProps> = ({
  title,
  description,
  type,
  subject,
  difficulty,
  onDownload,
  onView
}) => {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  };
  
  const typeIcons = {
    notes: <BookOpen className="h-4 w-4 mr-1" />,
    video: <Video className="h-4 w-4 mr-1" />,
    audio: <Volume2 className="h-4 w-4 mr-1" />
  };

  // Descriptive text for screen readers and TTS
  const accessibilityDescription = `Study material: ${title}. Type: ${type === 'notes' ? 'Text Notes' : type === 'video' ? 'Video Lecture' : 'Audio Explanation'}. Subject: ${subject}. Difficulty: ${difficulty}. Description: ${description}`;

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 mr-1" aria-label="Material information">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{accessibilityDescription}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TextToSpeech 
              text={accessibilityDescription} 
              showControls={true}
              iconOnly={true}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className="flex items-center">
            {typeIcons[type]}
            {type === 'notes' ? 'Text Notes' : type === 'video' ? 'Video Lecture' : 'Audio Explanation'}
          </Badge>
          <Badge>{subject}</Badge>
          <Badge className={difficultyColors[difficulty]}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t">
        <Button variant="outline" size="sm" onClick={onView}>
          <BookOpen className="h-4 w-4 mr-2" />
          View
        </Button>
        <Button variant="secondary" size="sm" onClick={onDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudyMaterialCard;
