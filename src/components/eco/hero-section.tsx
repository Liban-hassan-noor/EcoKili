import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Recycle, Users, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-eco-community.jpg";

export interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Community working together for environmental change"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-eco-primary/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-eco-light/20 border border-eco-accent/30 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-eco-accent rounded-full animate-eco-pulse" />
            <span className="text-sm font-medium text-eco-primary">
              Transforming Kilimani, One Pickup at a Time
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            From <span className="text-eco-primary">Waste</span> to{" "}
            <span className="bg-gradient-impact bg-clip-text text-transparent">
              Wonder
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Join Kilimani's smart waste management revolution. Turn your
            recycling into community impact through PET RainTiles that transform
            our neighborhood.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="flex items-center space-x-2 text-eco-primary">
              <Recycle className="w-5 h-5" />
              <span className="font-semibold">Smart Sorting</span>
            </div>
            <div className="flex items-center space-x-2 text-eco-accent">
              <Users className="w-5 h-5" />
              <span className="font-semibold">Community Impact</span>
            </div>
            <div className="flex items-center space-x-2 text-success">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">Real Results</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => {
                //onGetStarted(); // keep your modal logic
                scrollToSection("pickup-request");
              }}
              className="bg-eco-primary hover:bg-eco-primary/90 text-white px-8 py-3 text-lg eco-glow group"
            >
              Start Making Impact
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 eco-transition" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("dashboard")}
              className="border-eco-primary text-eco-primary hover:bg-eco-primary hover:text-white px-8 py-3 text-lg"
            >
              See Community Progress
            </Button>
          </div>

          {/* Trust Indicator */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Trusted by Kilimani residents
            </p>
            <div className="flex justify-center items-center space-x-4 text-eco-accent">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-eco-accent rounded-full border-2 border-background flex items-center justify-center"
                  >
                    <span className="text-xs font-bold text-white">
                      {String.fromCharCode(65 + i)}
                    </span>
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium">200+ active members</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-12 h-12 bg-eco-accent/20 rounded-full animate-float hidden lg:block" />
      <div className="absolute bottom-32 left-10 w-8 h-8 bg-success/20 rounded-full animate-float delay-1000 hidden lg:block" />
      <div className="absolute top-1/2 right-20 w-6 h-6 bg-warning/20 rounded-full animate-float delay-2000 hidden lg:block" />
    </section>
  );
};
