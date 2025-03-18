
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
  iconBgColor?: string;
  delay?: number;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  iconColor = 'text-primary',
  iconBgColor = 'bg-primary/10',
  delay = 0,
  className,
}) => {
  return (
    <FadeIn direction="up" delay={delay} className="h-full">
      <div className={cn(
        'h-full glass rounded-xl p-6 transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]',
        className
      )}>
        <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center mb-4', iconBgColor)}>
          <Icon className={cn('w-6 h-6', iconColor)} />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </FadeIn>
  );
};

export default FeatureCard;
