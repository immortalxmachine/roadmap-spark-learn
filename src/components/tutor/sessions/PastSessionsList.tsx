
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Video, Phone, MessageCircle, Star, FileText } from 'lucide-react';
import AnimatedAvatar from '@/components/ui/avatar-animated';
import { Session } from '@/types/session';
import SessionReviewForm from './SessionReviewForm';

interface PastSessionsListProps {
  sessions: Session[];
  onReviewSubmit: (sessionId: number, rating: number, feedback: string) => void;
}

const PastSessionsList: React.FC<PastSessionsListProps> = ({ sessions, onReviewSubmit }) => {
  const [sessionBeingReviewed, setSessionBeingReviewed] = useState<number | null>(null);
  const [reviewData, setReviewData] = useState<{ rating: number; feedback: string }>({
    rating: 3,
    feedback: '',
  });

  const handleStartReview = (sessionId: number) => {
    const session = sessions.find(s => s.id === sessionId);
    setSessionBeingReviewed(sessionId);
    
    if (session) {
      setReviewData({
        rating: session.rating || 3,
        feedback: session.feedback || '',
      });
    }
  };

  const handleSubmitReview = (sessionId: number) => {
    if (!sessionBeingReviewed) return;
    onReviewSubmit(sessionId, reviewData.rating, reviewData.feedback);
    setSessionBeingReviewed(null);
    setReviewData({ rating: 3, feedback: '' });
  };

  const renderStarRating = (rating: number | undefined) => {
    if (!rating) return "Not rated";
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star 
            key={index} 
            className={`h-4 w-4 ${index < rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`} 
          />
        ))}
      </div>
    );
  };

  if (sessions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">You don't have any past sessions yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="space-y-8">
        {sessionBeingReviewed && (
          <SessionReviewForm
            rating={reviewData.rating}
            feedback={reviewData.feedback}
            onRatingChange={(rating) => setReviewData({...reviewData, rating})}
            onFeedbackChange={(feedback) => setReviewData({...reviewData, feedback})}
            onSubmit={() => handleSubmitReview(sessionBeingReviewed)}
            onCancel={() => setSessionBeingReviewed(null)}
          />
        )}
      
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Topic</TableHead>
              <TableHead>Tutor</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    {session.mode === 'video' ? (
                      <Video className="h-4 w-4 mr-2 text-muted-foreground" />
                    ) : session.mode === 'voice' ? (
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    ) : (
                      <MessageCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                    )}
                    {session.topic}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <AnimatedAvatar 
                      fallback={session.tutorAvatar} 
                      size="sm" 
                    />
                    <span>{session.tutorName}</span>
                  </div>
                </TableCell>
                <TableCell>{session.startTime}</TableCell>
                <TableCell>{session.duration}</TableCell>
                <TableCell>{session.language || 'English'}</TableCell>
                <TableCell>
                  {renderStarRating(session.rating)}
                </TableCell>
                <TableCell className="text-right">
                  {session.rating ? (
                    <Button variant="ghost" size="sm" className="h-8">
                      <FileText className="h-4 w-4 mr-2" />
                      Notes
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8"
                      onClick={() => handleStartReview(session.id)}
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Rate
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PastSessionsList;
