
import React from 'react';
import { Volume2, VolumeX, Play, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/AccessibilityContext';

interface TextToSpeechProps {
  text: string;
  className?: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text, className }) => {
  const { ttsEnabled, speak, stopSpeaking, isSpeaking } = useAccessibility();
  
  if (!ttsEnabled) return null;
  
  return (
    <div className={`flex items-center ${className}`}>
      {isSpeaking ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={stopSpeaking}
          aria-label="Stop speaking"
        >
          <Square className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => speak(text)}
          aria-label="Read aloud"
        >
          <Play className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default TextToSpeech;
