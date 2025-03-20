
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Star } from 'lucide-react';

interface SessionReviewFormProps {
  rating: number;
  feedback: string;
  onRatingChange: (rating: number) => void;
  onFeedbackChange: (feedback: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const SessionReviewForm: React.FC<SessionReviewFormProps> = ({
  rating,
  feedback,
  onRatingChange,
  onFeedbackChange,
  onSubmit,
  onCancel
}) => {
  return (
    <div className="bg-secondary/30 p-6 rounded-lg border mb-6">
      <h3 className="text-lg font-medium mb-4">Rate Your Session</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Rating</Label>
          <div className="flex items-center space-x-2">
            <Slider 
              value={[rating]} 
              min={1} 
              max={5} 
              step={1}
              onValueChange={(value) => onRatingChange(value[0])}
              className="max-w-[200px]"
            />
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  onClick={() => onRatingChange(index + 1)}
                  className={`h-5 w-5 cursor-pointer ${
                    index < rating 
                      ? "text-amber-500 fill-amber-500" 
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Feedback (Optional)</Label>
          <Textarea 
            placeholder="Share your experience with the tutor..."
            value={feedback}
            onChange={(e) => onFeedbackChange(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={onSubmit}
            className="w-full"
          >
            Submit Review
          </Button>
          <Button 
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionReviewForm;
