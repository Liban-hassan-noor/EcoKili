import React, { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/eco/hero-section";
import { CommunityProgress } from "@/components/eco/community-progress";
import { PickupRequestForm, PickupRequest } from "@/components/eco/pickup-request-form";
import { SortingGuide } from "@/components/eco/sorting-guide";
import { LoginModal } from "@/components/ui/login-modal";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Index = () => {
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<{ name: string; role: "resident" | "collector"; ecoPoints: number; } | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          name: user.displayName || "Anonymous",
          role: "resident",
          ecoPoints: 0,
        });
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    toast({ title: "Logged out" });
  };

  const handlePickupRequest = (request: PickupRequest) => {
    const pointsEarned = request.wasteTypes.length * 10;
    toast({
      title: "Pickup Scheduled!",
      description: `You'll earn ${pointsEarned} EcoPoints when completed.`,
    });
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        ecoPoints: currentUser.ecoPoints + pointsEarned,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        currentUser={currentUser}
        onAuthClick={currentUser ? handleLogout : () => setShowLoginModal(true)}
      />

      <HeroSection onGetStarted={() => setShowLoginModal(true)} />

      <CommunityProgress currentPoints={15750} targetPoints={20000} tilesInstalled={3} activeMembers={247} />
    
      {currentUser && <PickupRequestForm onSubmit={handlePickupRequest} />}

      <SortingGuide />

      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />

     <footer className="bg-eco-primary text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">Join the Movement</h3>
            <p className="text-eco-light max-w-2xl mx-auto">
              Together, we're transforming Kilimani one pickup at a time. Every
              sorted waste item brings us closer to a cleaner, more beautiful
              community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Contact</h4>
              <p className="text-eco-light">hello@ecokili.co.ke</p>
              <p className="text-eco-light">+254 700 123 456</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Community</h4>
              <p className="text-eco-light">Kilimani Residents</p>
              <p className="text-eco-light">Waste Collectors</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Impact</h4>
              <p className="text-eco-light">PET RainTiles Project</p>
              <p className="text-eco-light">Environmental Goals</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-eco-light/20">
            <p className="text-eco-light text-sm">
              © 2025 EcoKili. Building a sustainable Kilimani together.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
