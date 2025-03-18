
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Volume, VolumeX, Eye, EyeOff } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useAccessibility } from '@/contexts/AccessibilityContext';

const AccessibilitySettings: React.FC = () => {
  const { 
    ttsEnabled, 
    toggleTts, 
    visualAlertsEnabled, 
    toggleVisualAlerts,
    speechRate,
    setSpeechRate,
    speak
  } = useAccessibility();
  
  const handleTestVoice = () => {
    speak("This is a test of the text-to-speech feature. You can adjust the speech rate to make it faster or slower.");
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accessibility Settings</CardTitle>
        <CardDescription>Configure options to make the platform more accessible</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Visual Settings</h3>
            <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center">
                {visualAlertsEnabled ? <Eye className="h-5 w-5 mr-3" /> : <EyeOff className="h-5 w-5 mr-3" />}
                <div>
                  <h3 className="font-medium">Enhanced Visual Alerts</h3>
                  <p className="text-sm text-muted-foreground">Additional visual cues for notifications</p>
                </div>
              </div>
              <button
                onClick={toggleVisualAlerts}
                className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 focus:outline-none ${
                  visualAlertsEnabled ? 'bg-primary justify-end' : 'bg-muted justify-start'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white shadow-sm transform mx-0.5"></span>
              </button>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="font-medium">Audio Settings</h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center">
                  {ttsEnabled ? <Volume className="h-5 w-5 mr-3" /> : <VolumeX className="h-5 w-5 mr-3" />}
                  <div>
                    <h3 className="font-medium">Text-to-Speech</h3>
                    <p className="text-sm text-muted-foreground">Read content aloud for visually impaired users</p>
                  </div>
                </div>
                <button
                  onClick={toggleTts}
                  className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 focus:outline-none ${
                    ttsEnabled ? 'bg-primary justify-end' : 'bg-muted justify-start'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white shadow-sm transform mx-0.5"></span>
                </button>
              </div>
              
              {ttsEnabled && (
                <>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <Label htmlFor="speed" className="mb-2 block text-sm font-medium">Speech Speed</Label>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="range" 
                        id="speed" 
                        min="0.5" 
                        max="2" 
                        step="0.1" 
                        value={speechRate}
                        onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Slower</span>
                      <span>Normal</span>
                      <span>Faster</span>
                    </div>

                    <div className="mt-4">
                      <Button
                        variant="outline"
                        onClick={handleTestVoice}
                        className="w-full"
                      >
                        Test Text-to-Speech
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <Separator />
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessibilitySettings;
