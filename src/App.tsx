
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import DigitalLibrary from "./pages/DigitalLibrary";
import StudyRoadmap from "./pages/StudyRoadmap";
import MockTests from "./pages/MockTests";
import AiAssistant from "./pages/AiAssistant";
import Gamification from "./pages/Gamification";
import ProfileSettings from "./pages/ProfileSettings";
import TutorConnection from "./pages/TutorConnection";
import VisualAlert from "./components/accessibility/VisualAlert";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [globalAlertShow, setGlobalAlertShow] = useState(false);
  const [globalAlertMessage, setGlobalAlertMessage] = useState("");
  const [globalAlertType, setGlobalAlertType] = useState<"info" | "success" | "warning" | "error">("info");

  // Example of a global alert system that could be triggered from anywhere
  useEffect(() => {
    // This could be replaced with a more sophisticated global event system
    // For now, just for demonstration purposes
    const timeoutId = setTimeout(() => {
      setGlobalAlertMessage("Welcome to StudySpark! Accessibility features are enabled.");
      setGlobalAlertType("info");
      setGlobalAlertShow(true);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AccessibilityProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          {/* Global Visual Alert system for deaf users */}
          <VisualAlert 
            show={globalAlertShow}
            message={globalAlertMessage}
            type={globalAlertType}
            onClose={() => setGlobalAlertShow(false)}
          />
          
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/library" element={<DigitalLibrary />} />
              <Route path="/roadmap" element={<StudyRoadmap />} />
              <Route path="/mock-tests" element={<MockTests />} />
              <Route path="/assistant" element={<AiAssistant />} />
              <Route path="/gamification" element={<Gamification />} />
              <Route path="/profile" element={<ProfileSettings />} />
              <Route path="/support" element={<TutorConnection />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AccessibilityProvider>
    </QueryClientProvider>
  );
};

export default App;
