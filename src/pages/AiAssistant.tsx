
import React, { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Mic, SendHorizontal, BookOpen, Volume2, Volume1, VolumeX, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import AnimatedAvatar from '@/components/ui/avatar-animated';
import FadeIn from '@/components/animations/FadeIn';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import VisualAlert from '@/components/accessibility/VisualAlert';

const AiAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: "Hello! I'm your AI study assistant. How can I help you today?",
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      sender: 'user',
      text: "I'm struggling with understanding the concept of electromagnetism. Can you explain it simply?",
      timestamp: new Date(Date.now() - 50000).toISOString(),
    },
    {
      id: 3,
      sender: 'assistant',
      text: "Absolutely! Electromagnetism is about the relationship between electricity and magnetism. At its core, it describes how electric currents create magnetic fields, and how changing magnetic fields create electric currents. This relationship is fundamental to many technologies we use today.\n\nWould you like me to explain more about how this works in practical applications, or would you prefer to explore the mathematical formulations?",
      timestamp: new Date(Date.now() - 45000).toISOString(),
    },
    {
      id: 4,
      sender: 'user',
      text: "Practical applications would be helpful, thanks!",
      timestamp: new Date(Date.now() - 40000).toISOString(),
    },
    {
      id: 5,
      sender: 'assistant',
      text: "Great choice! Here are some practical applications of electromagnetism:\n\n1. **Electric Motors**: Found in fans, electric cars, and washing machines. They use electromagnetic forces to convert electrical energy into mechanical movement.\n\n2. **Generators**: The opposite of motors! They convert mechanical energy into electricity by moving magnets near coils of wire.\n\n3. **Transformers**: These change the voltage of electricity and are essential for power distribution.\n\nWould you like me to recommend some simple experiments you can try to see electromagnetism in action?",
      timestamp: new Date(Date.now() - 30000).toISOString(),
      resources: [
        {
          title: "Electromagnetism Basics",
          type: "notes",
          subject: "Physics"
        },
        {
          title: "Motors and Generators Explained",
          type: "video",
          subject: "Physics"
        }
      ],
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showResponseOptions, setShowResponseOptions] = useState(false);
  const { ttsEnabled, speak, stopSpeaking, isSpeaking } = useAccessibility();
  
  useEffect(() => {
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage('');
    
    // Show visual alert for deaf users
    setAlertMessage("Message sent successfully!");
    setShowAlert(true);
    
    // Simulate assistant response after a short delay
    setTimeout(() => {
      const assistantResponse = {
        id: messages.length + 2,
        sender: 'assistant',
        text: "I'd be happy to suggest some simple electromagnetism experiments you can try at home! Here are a few:\n\n1. **Make an Electromagnet**: Wrap insulated copper wire around an iron nail and connect the ends to a battery. The nail becomes magnetic when current flows through the wire.\n\n2. **Visualize Magnetic Fields**: Sprinkle iron filings on paper placed over a magnet to see the pattern of magnetic field lines.\n\n3. **Build a Simple Motor**: Create a basic electric motor using a battery, magnets, and copper wire.\n\nThese experiments can help you visualize the principles we've discussed. Would you like detailed instructions for any of these experiments?",
        timestamp: new Date().toISOString(),
        resources: [
          {
            title: "DIY Electromagnet Tutorial",
            type: "video",
            subject: "Physics"
          },
          {
            title: "Electromagnetism Lab Experiments",
            type: "notes",
            subject: "Physics"
          }
        ],
      };
      
      setMessages(prevMessages => [...prevMessages, assistantResponse]);
      
      // Auto-read the response for blind users if TTS is enabled
      if (ttsEnabled) {
        speak(assistantResponse.text);
      }
    }, 1500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const startRecording = () => {
    setIsRecording(true);
    // For blind users, provide audio feedback
    if (ttsEnabled) {
      speak("Recording started. Please speak your question.");
    }
    
    // For deaf users, provide visual feedback
    setAlertMessage("Recording started. Please speak your question.");
    setShowAlert(true);
    
    // Simulate ending recording after 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      setNewMessage("Can you explain how transformers work in more detail?");
      
      // Feedback for blind users
      if (ttsEnabled) {
        speak("Recording completed. Your question is: Can you explain how transformers work in more detail?");
      }
      
      // Visual feedback for deaf users
      setAlertMessage("Recording completed!");
      setShowAlert(true);
    }, 3000);
  };
  
  const stopRecording = () => {
    setIsRecording(false);
    // Feedback for blind users
    if (ttsEnabled) {
      speak("Recording stopped.");
    }
    
    // Visual feedback for deaf users
    setAlertMessage("Recording stopped.");
    setShowAlert(true);
  };
  
  const toggleSpeaking = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      // Read the last assistant message
      const lastAssistantMessage = [...messages].reverse().find(m => m.sender === 'assistant');
      if (lastAssistantMessage) {
        speak(lastAssistantMessage.text);
      }
    }
  };
  
  const getFormattedTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Function to render message text with line breaks and formatting
  const renderMessageText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const toggleResponseOptions = () => {
    setShowResponseOptions(!showResponseOptions);
  };

  const readMessage = (text: string) => {
    if (ttsEnabled) {
      speak(text);
    }
  };

  const suggestedResponses = [
    "Can you explain how transformers work in more detail?",
    "How does electromagnetism relate to electricity generation?",
    "What are some real-world applications of electromagnetic induction?"
  ];

  return (
    <DashboardLayout>
      <FadeIn direction="up">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">AI Assistant</h1>
          <p className="text-muted-foreground">Get help with your studies and resolve your doubts</p>
        </div>
        
        <VisualAlert 
          show={showAlert} 
          message={alertMessage} 
          onClose={() => setShowAlert(false)} 
        />

        <Card className="h-[calc(100vh-14rem)]">
          <CardContent className="p-0 flex flex-col h-full">
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <AnimatedAvatar 
                  fallback="AI" 
                  animation="pulse"
                  className="bg-primary text-primary-foreground"
                />
                <div>
                  <h3 className="font-medium">Study Assistant</h3>
                  <p className="text-xs text-muted-foreground">Powered by AI</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleSpeaking}
                  className={isSpeaking ? "text-primary bg-primary/10" : ""}
                  title={isSpeaking ? "Stop Speaking" : "Read Last Message"}
                >
                  {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'assistant' && (
                    <AnimatedAvatar 
                      fallback="AI" 
                      size="sm"
                      className="mr-3 mt-1 bg-primary text-primary-foreground"
                    />
                  )}
                  
                  <div className={`flex flex-col max-w-[80%]`}>
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-secondary rounded-bl-none'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <p className="whitespace-pre-line">{renderMessageText(message.text)}</p>
                        {message.sender === 'assistant' && ttsEnabled && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 ml-2 -mt-1" 
                            onClick={() => readMessage(message.text)}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <span className="text-xs text-muted-foreground mt-1 ml-1">
                      {getFormattedTime(message.timestamp)}
                    </span>
                    
                    {message.sender === 'assistant' && message.resources && (
                      <div className="mt-2 ml-1">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Suggested Resources:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.resources.map((resource, index) => (
                            <div key={index} className="flex items-center bg-secondary rounded-md px-2 py-1 text-xs">
                              <BookOpen className="h-3 w-3 mr-1" />
                              <span>{resource.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {message.sender === 'user' && (
                    <AnimatedAvatar 
                      fallback="Me" 
                      size="sm"
                      className="ml-3 mt-1"
                    />
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Suggested Responses */}
            <div className={`border-t border-border transition-all duration-300 overflow-hidden ${showResponseOptions ? 'max-h-40' : 'max-h-0'}`}>
              {showResponseOptions && (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {suggestedResponses.map((response, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      className="justify-start h-auto py-2 text-left"
                      onClick={() => {
                        setNewMessage(response);
                        setShowResponseOptions(false);
                      }}
                    >
                      <Lightbulb className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="line-clamp-1">{response}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center mb-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-muted-foreground"
                  onClick={toggleResponseOptions}
                >
                  {showResponseOptions ? (
                    <>
                      <ChevronDown className="h-3 w-3 mr-1" />
                      Hide suggestions
                    </>
                  ) : (
                    <>
                      <ChevronUp className="h-3 w-3 mr-1" />
                      Show suggestions
                    </>
                  )}
                </Button>
                <div className="ml-auto flex items-center space-x-1">
                  <Badge variant="outline" className="text-xs">
                    <Volume1 className="h-3 w-3 mr-1" />
                    Voice input available
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your question here..."
                    className="pr-10"
                    aria-label="Message input"
                  />
                  {newMessage && (
                    <Button
                      size="icon"
                      className="absolute right-1 top-1 h-8 w-8"
                      onClick={handleSendMessage}
                      aria-label="Send message"
                    >
                      <SendHorizontal className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Button
                  size="icon"
                  variant={isRecording ? "default" : "outline"}
                  className={isRecording ? "bg-red-500 text-white hover:bg-red-600" : ""}
                  onClick={isRecording ? stopRecording : startRecording}
                  aria-label={isRecording ? "Stop recording" : "Start recording"}
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </DashboardLayout>
  );
};

export default AiAssistant;
