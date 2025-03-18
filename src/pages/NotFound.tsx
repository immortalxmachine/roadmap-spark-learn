
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <FadeIn direction="up" className="text-center max-w-md">
        <div className="mb-6 relative">
          <div className="text-9xl font-bold opacity-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            404
          </div>
          <div className="relative z-10 w-24 h-24 rounded-full bg-secondary mx-auto flex items-center justify-center">
            <div className="text-3xl font-bold">404</div>
          </div>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <a href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </a>
        </Button>
      </FadeIn>
    </div>
  );
};

export default NotFound;
