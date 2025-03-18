
import React, { createContext, useContext, useState, useEffect } from 'react';

type AccessibilityContextType = {
  ttsEnabled: boolean;
  toggleTts: () => void;
  visualAlertsEnabled: boolean;
  toggleVisualAlerts: () => void;
  speechRate: number;
  setSpeechRate: (rate: number) => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ttsEnabled, setTtsEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('ttsEnabled');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [visualAlertsEnabled, setVisualAlertsEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('visualAlertsEnabled');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [speechRate, setSpeechRate] = useState<number>(() => {
    const saved = localStorage.getItem('speechRate');
    return saved ? JSON.parse(saved) : 1;
  });
  
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  useEffect(() => {
    localStorage.setItem('ttsEnabled', JSON.stringify(ttsEnabled));
  }, [ttsEnabled]);
  
  useEffect(() => {
    localStorage.setItem('visualAlertsEnabled', JSON.stringify(visualAlertsEnabled));
  }, [visualAlertsEnabled]);
  
  useEffect(() => {
    localStorage.setItem('speechRate', JSON.stringify(speechRate));
  }, [speechRate]);
  
  const toggleTts = () => setTtsEnabled(prev => !prev);
  const toggleVisualAlerts = () => setVisualAlertsEnabled(prev => !prev);
  
  // Function to speak text using the Web Speech API
  const speak = (text: string) => {
    if (!ttsEnabled) return;
    
    // Cancel any ongoing speech
    stopSpeaking();
    
    // Create a new speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    
    // Set event handlers
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    // Speak the text
    window.speechSynthesis.speak(utterance);
  };
  
  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };
  
  return (
    <AccessibilityContext.Provider
      value={{
        ttsEnabled,
        toggleTts,
        visualAlertsEnabled,
        toggleVisualAlerts,
        speechRate,
        setSpeechRate,
        speak,
        stopSpeaking,
        isSpeaking
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
