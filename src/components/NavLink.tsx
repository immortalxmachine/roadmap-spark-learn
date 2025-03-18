
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className, onClick }) => {
  // Check if the current path matches the href
  const isActive = window.location.pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        "px-4 py-2 rounded-md text-sm font-medium transition-colors",
        isActive 
          ? "bg-primary/10 text-primary" 
          : "hover:bg-secondary",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NavLink;
