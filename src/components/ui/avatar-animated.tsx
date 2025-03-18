
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface AnimatedAvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallbackClassName?: string;
  animation?: 'pulse' | 'float' | 'none';
}

const AnimatedAvatar: React.FC<AnimatedAvatarProps> = ({
  src,
  alt = 'Avatar',
  fallback,
  size = 'md',
  className,
  fallbackClassName,
  animation = 'none',
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
    xl: 'h-20 w-20',
  };

  const animationClasses = {
    pulse: 'animate-pulse-soft',
    float: 'animate-float',
    none: '',
  };

  const getFallbackText = () => {
    if (fallback) return fallback;
    if (alt && alt !== 'Avatar') {
      const words = alt.split(' ');
      if (words.length >= 2) {
        return `${words[0][0]}${words[1][0]}`.toUpperCase();
      }
      return alt.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  return (
    <Avatar
      className={cn(
        sizeClasses[size],
        animationClasses[animation],
        'ring-2 ring-background shadow-md',
        className
      )}
    >
      {src && <AvatarImage src={src} alt={alt} />}
      <AvatarFallback className={cn('text-primary-foreground bg-primary', fallbackClassName)}>
        {getFallbackText()}
      </AvatarFallback>
    </Avatar>
  );
};

export default AnimatedAvatar;
