import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Leaf, MapPin, Users, Award, Menu, X } from 'lucide-react';

export interface NavigationProps {
  currentUser?: {
    name: string;
    role: 'resident' | 'collector';
    ecoPoints: number;
  };
  onAuthClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentUser, onAuthClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false); // close menu after clicking a link
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">EcoKili</h1>
            <p className="text-xs text-muted-foreground -mt-1">From Waste to Wonder</p>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#dashboard" onClick={handleLinkClick} className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition">
            <Users className="w-4 h-4" />
            <span>Community</span>
          </a>
          <a href="#map" onClick={handleLinkClick} className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition">
            <MapPin className="w-4 h-4" />
            <span>Impact Map</span>
          </a>
          <a href="#guide" onClick={handleLinkClick} className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition">
            <Award className="w-4 h-4" />
            <span>Guide</span>
          </a>
        </div>

        {/* User Info or Auth Button */}
        <div className="hidden md:flex items-center space-x-3">
          {currentUser ? (
            <>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{currentUser.name}</p>
                <p className="text-xs text-eco-accent">{currentUser.ecoPoints} EcoPoints</p>
              </div>
              <div className="w-8 h-8 bg-eco-accent rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {currentUser.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </>
          ) : (
            <Button variant="default" onClick={onAuthClick} className="bg-eco-primary hover:bg-eco-primary/90">
              Get Started
            </Button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 bg-background border-t border-border space-y-3">
          <a href="#dashboard" onClick={handleLinkClick} className="block text-muted-foreground hover:text-foreground transition">
            Community
          </a>
          <a href="#map" onClick={handleLinkClick} className="block text-muted-foreground hover:text-foreground transition">
            Impact Map
          </a>
          <a href="#guide" onClick={handleLinkClick} className="block text-muted-foreground hover:text-foreground transition">
            Guide
          </a>

          {currentUser ? (
            <div className="pt-2 border-t border-border">
              <p className="text-sm font-medium text-foreground">{currentUser.name}</p>
              <p className="text-xs text-eco-accent">{currentUser.ecoPoints} EcoPoints</p>
            </div>
          ) : (
            <Button
              variant="default"
              onClick={() => {
                handleLinkClick();
                onAuthClick();
              }}
              className="w-full bg-eco-primary hover:bg-eco-primary/90"
            >
              Get Started
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};
