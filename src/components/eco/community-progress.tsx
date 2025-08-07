import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Zap, Users, Award } from "lucide-react";
import petTileImage from "@/assets/pet-tile-transformation.jpg";

export interface CommunityProgressProps {
  currentPoints: number;
  targetPoints: number;
  tilesInstalled: number;
  activeMembers: number;
}

export const CommunityProgress: React.FC<CommunityProgressProps> = ({
  currentPoints = 15750,
  targetPoints = 20000,
  tilesInstalled = 3,
  activeMembers = 247,
}) => {
  const progressPercentage = (currentPoints / targetPoints) * 100;
  const pointsToGo = targetPoints - currentPoints;

  return (
    <section className="py-16 bg-muted/30" id="dashboard">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Community <span className="text-eco-primary">Impact</span> Dashboard
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how Kilimani is transforming waste into beautiful, functional
            PET RainTiles for our community.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Progress Section */}
          <div className="space-y-6">
            {/* Main Progress Card */}
            <Card className="p-6 eco-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Next PET RainTile
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-eco-light text-eco-primary"
                >
                  <Target className="w-4 h-4 mr-1" />
                  In Progress
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-2xl font-bold text-eco-primary">
                      {currentPoints.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      EcoPoints collected
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">
                      {targetPoints.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Target goal</p>
                  </div>
                </div>

                <Progress value={progressPercentage} className="h-3" />

                <div className="flex justify-between text-sm">
                  <span className="text-success font-medium">
                    {progressPercentage.toFixed(1)}% complete
                  </span>
                  <span className="text-muted-foreground">
                    {pointsToGo.toLocaleString()} points to go
                  </span>
                </div>
              </div>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center eco-card">
                <div className="flex items-center justify-center w-12 h-12 bg-eco-accent/20 rounded-full mx-auto mb-3">
                  <Award className="w-6 h-6 text-eco-accent" />
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {tilesInstalled}
                </p>
                <p className="text-sm text-muted-foreground">Tiles Installed</p>
              </Card>

              <Card className="p-4 text-center eco-card">
                <div className="flex items-center justify-center w-12 h-12 bg-community-blue/20 rounded-full mx-auto mb-3">
                  <Users className="w-6 h-6 text-community-blue" />
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {activeMembers}
                </p>
                <p className="text-sm text-muted-foreground">Active Members</p>
              </Card>
            </div>

            {/* Impact Metrics */}
            <Card className="p-6 eco-card">
              <h4 className="font-semibold text-foreground mb-4 flex items-center">
                <Zap className="w-5 h-5 text-warning mr-2" />
                Environmental Impact
              </h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-xl font-bold text-success">2.3T</p>
                  <p className="text-xs text-muted-foreground">CO₂ Prevented</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-eco-accent">890kg</p>
                  <p className="text-xs text-muted-foreground">
                    Waste Recycled
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* PET Tile Showcase */}
          <div className="relative">
            <Card className="p-6 eco-card">
              <div className="aspect-square rounded-lg overflow-hidden mb-4">
                <img
                  src={petTileImage}
                  alt="PET plastic bottles being transformed into beautiful rain tiles"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center">
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  PET RainTiles
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Your recycled PET bottles become beautiful, functional tiles
                  that help manage rainwater and beautify our community spaces.
                </p>

                <div className="bg-eco-light/50 rounded-lg p-4">
                  <p className="text-sm font-medium text-eco-primary mb-2">
                    Next Installation: Community Garden
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                    <span>Est. 150 tiles</span>
                    <span>•</span>
                    <span>3,000 bottles</span>
                    <span>•</span>
                    <span>2 weeks</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
