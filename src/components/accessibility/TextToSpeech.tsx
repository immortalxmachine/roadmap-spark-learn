
import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Square, Pause, VolumeUp, Volume1 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { cn } from '@/lib/utils';

interface TextToSpeechProps {
  text: string;
  className?: string;
  showControls?: boolean;
  iconOnly?: boolean;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ 
  text, 
  className,
  showControls = false,
  iconOnly = false
}) => {
  const { ttsEnabled, speak, stopSpeaking, isSpeaking, speechRate, setSpeechRate } = useAccessibility();
  const [showSlider, setShowSlider] = useState(false);
  
  if (!ttsEnabled) return null;
  
  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(text);
    }
  };

  const getVolumeIcon = () => {
    if (isSpeaking) {
      return <Square className="h-4 w-4" />;
    }
    
    return speechRate < 0.8 ? 
      <Volume1 className="h-4 w-4" /> : 
      speechRate > 1.2 ? 
        <VolumeUp className="h-4 w-4" /> : 
        <Volume2 className="h-4 w-4" />;
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSpeak}
        aria-label={isSpeaking ? "Stop speaking" : "Read aloud"}
        className={isSpeaking ? "text-primary bg-primary/10" : ""}
      >
        {getVolumeIcon()}
      </Button>

      {showControls && (
        <>
          {showSlider ? (
            <div className="flex items-center gap-2 bg-secondary/80 p-1 rounded-md">
              <span className="text-xs">0.5x</span>
              <Slider
                value={[speechRate]}
                min={0.5}
                max={2}
                step={0.1}
                onValueChange={(value) => setSpeechRate(value[0])}
                className="w-24"
              />
              <span className="text-xs">2x</span>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowSlider(false)}>
                <VolumeX className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowSlider(true)}
              className="text-xs px-2 py-1 h-auto"
            >
              {speechRate}x
            </Button>
          )}
        </>
      )}
      
      {!iconOnly && (
        <span className="text-xs text-muted-foreground">
          {isSpeaking ? "Playing audio..." : ""}
        </span>
      )}
    </div>
  );
};

export default TextToSpeech;
