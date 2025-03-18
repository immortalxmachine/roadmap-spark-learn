
import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import NavLink from './NavLink';
import { useAccessibility } from '@/contexts/AccessibilityContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { ttsEnabled, toggleTts, speak } = useAccessibility();

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Digital Library', href: '/library' },
    { name: 'Study Roadmap', href: '/roadmap' },
    { name: 'Mock Tests', href: '/mock-tests' },
    { name: 'AI Assistant', href: '/assistant' },
  ];

  const handleNavItemClick = (itemName: string) => {
    if (ttsEnabled) {
      speak(`Navigating to ${itemName}`);
    }
  };

  return (
    <header
      className={cn(
        'fixed w-full top-0 left-0 z-50 transition-all duration-300 ease-in-out',
        scrolled
          ? 'py-4 backdrop-blur-lg bg-white/70 shadow-sm'
          : 'py-6 bg-transparent'
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          onClick={() => handleNavItemClick('Home')}
        >
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Study<span className="font-extrabold">Spark</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <NavLink 
              key={item.name} 
              href={item.href}
              onClick={() => handleNavItemClick(item.name)}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTts}
            className={ttsEnabled ? "text-primary" : "text-muted-foreground"}
            title={ttsEnabled ? "Disable Text-to-Speech" : "Enable Text-to-Speech"}
          >
            {ttsEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link 
              to="/dashboard"
              onClick={() => handleNavItemClick('Dashboard')}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Log In
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link 
              to="/dashboard"
              onClick={() => handleNavItemClick('Dashboard')}
            >
              Get Started
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTts}
            className={ttsEnabled ? "text-primary" : "text-muted-foreground"}
          >
            {ttsEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </Button>
          <button
            className="rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'md:hidden fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out glass',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ top: '60px' }}
      >
        <nav className="flex flex-col items-center pt-6 space-y-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="w-full text-center py-3 px-8 text-base font-medium"
              onClick={() => {
                setIsMenuOpen(false);
                handleNavItemClick(item.name);
              }}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex flex-col w-full px-6 space-y-4 pt-4">
            <Button variant="outline" className="w-full" onClick={() => setIsMenuOpen(false)} asChild>
              <Link 
                to="/dashboard"
                onClick={() => handleNavItemClick('Dashboard')}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Log In
              </Link>
            </Button>
            <Button className="w-full" onClick={() => setIsMenuOpen(false)} asChild>
              <Link 
                to="/dashboard"
                onClick={() => handleNavItemClick('Dashboard')}
              >
                Get Started
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
