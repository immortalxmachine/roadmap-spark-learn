
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Twitter, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FadeIn from './animations/FadeIn';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { name: 'Features', href: '/#features' },
        { name: 'Digital Library', href: '/#library' },
        { name: 'AI Assistant', href: '/#assistant' },
        { name: 'Study Roadmap', href: '/#roadmap' },
        { name: 'Mock Tests', href: '/#tests' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#' },
        { name: 'Tutorials', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Community', href: '#' },
        { name: 'Support', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Contact Us', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' },
  ];

  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Logo and Newsletter Signup */}
          <div className="lg:col-span-2">
            <FadeIn direction="up">
              <Link to="/" className="inline-block mb-6">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Study<span className="font-extrabold">Spark</span>
                </span>
              </Link>
              <p className="text-muted-foreground mb-6 max-w-md">
                Empowering students in remote areas with personalized learning experiences through AI-driven guidance and gamification.
              </p>
              
              <div className="mb-8">
                <h4 className="font-medium mb-3">Subscribe to our newsletter</h4>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="px-4 py-2 rounded-md border border-border bg-background flex-grow" 
                  />
                  <Button className="px-4">
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a 
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 flex items-center justify-center rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Footer Links */}
          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-4">
              <FadeIn direction="up" delay={100}>
                <h4 className="font-semibold text-lg">{group.title}</h4>
                <ul className="space-y-3 mt-4">
                  {group.links.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href} 
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          ))}
        </div>

        <FadeIn direction="up" delay={200}>
          <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} StudySpark. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Cookies
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
};

export default Footer;
