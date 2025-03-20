
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import AnimatedAvatar from '@/components/ui/avatar-animated';
import { useToast } from "@/hooks/use-toast";

const TutorChat: React.FC = () => {
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    toast({
      title: "Message sent",
      description: "Your message has been sent to the tutor.",
    });
    setMessage('');
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Chat with Tutor</CardTitle>
        <CardDescription>
          Send a message to your current tutor
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-3 mb-4">
          <AnimatedAvatar fallback="SJ" size="sm" />
          <div>
            <p className="text-sm font-medium">Dr. Sarah Johnson</p>
            <p className="text-xs text-muted-foreground">Physics Tutor</p>
          </div>
          <Badge className="ml-auto bg-green-500">Online</Badge>
        </div>
        
        <div className="border rounded-md p-4 mb-4 h-[200px] overflow-y-auto bg-secondary/30 chat-messages">
          <div className="space-y-4">
            <div className="flex justify-start">
              <div className="bg-secondary rounded-lg p-2 max-w-[80%]">
                <p className="text-sm">Hello! How can I help with your physics questions today?</p>
                <span className="text-xs text-muted-foreground">10:34 AM</span>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-primary/10 rounded-lg p-2 max-w-[80%]">
                <p className="text-sm">I'm having trouble understanding Newton's Third Law. Could you explain it with examples?</p>
                <span className="text-xs text-muted-foreground">10:36 AM</span>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-secondary rounded-lg p-2 max-w-[80%]">
                <p className="text-sm">Sure! Newton's Third Law states that for every action, there's an equal and opposite reaction. For example, when you push against a wall, the wall pushes back with equal force.</p>
                <span className="text-xs text-muted-foreground">10:38 AM</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Input 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorChat;
