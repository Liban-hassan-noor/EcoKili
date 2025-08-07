import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Star } from "lucide-react";

export const SortingGuide: React.FC = () => {
  const sortingCategories = [
    {
      title: "PET Plastic Bottles",
      icon: "💎",
      color: "eco-accent",
      points: 15,
      priority: "high",
      description: "Clear plastic bottles with recycling code #1",
      examples: ["Water bottles", "Soda bottles", "Juice containers"],
      tips: [
        "Remove all caps and labels",
        "Rinse thoroughly with water",
        "Check for PET or #1 recycling symbol",
        "Keep separate from other plastics",
      ],
      avoid: ["Colored bottles", "Oil containers", "Non-PET plastics"],
    },
    {
      title: "Paper & Cardboard",
      icon: "📄",
      color: "earth-warm",
      points: 8,
      priority: "medium",
      description: "Clean, dry paper materials",
      examples: ["Newspapers", "Cardboard boxes", "Office paper", "Magazines"],
      tips: [
        "Keep completely dry",
        "Remove any plastic tape or staples",
        "Flatten cardboard boxes",
        "No food-stained paper",
      ],
      avoid: ["Wet paper", "Wax-coated paper", "Carbon paper"],
    },
    {
      title: "General Plastics",
      icon: "🥤",
      color: "community-blue",
      points: 10,
      priority: "medium",
      description: "Other clean plastic containers",
      examples: [
        "Food containers",
        "Plastic bags",
        "Bottles (non-PET)",
        "Packaging",
      ],
      tips: [
        "Clean off all food residue",
        "Check recycling codes 2-7",
        "Group similar types together",
        "Remove non-plastic components",
      ],
      avoid: ["Broken plastics", "Mixed material items", "Electronics"],
    },
    {
      title: "Organic Waste",
      icon: "🥬",
      color: "success",
      points: 5,
      priority: "low",
      description: "Biodegradable kitchen and garden waste",
      examples: ["Fruit peels", "Vegetable scraps", "Coffee grounds", "Leaves"],
      tips: [
        "No meat or dairy products",
        "Chop large pieces smaller",
        "Keep in sealed container",
        "Regular collection prevents odors",
      ],
      avoid: ["Cooked food", "Oil/grease", "Pet waste", "Diseased plants"],
    },
  ];

  return (
    <section className="py-16 bg-muted/30" id="guide">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Smart <span className="text-eco-primary">Sorting</span> Guide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn how to properly sort your waste to maximize EcoPoints and
            environmental impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {sortingCategories.map((category, index) => (
            <Card
              key={category.title}
              className="p-6 eco-card relative overflow-hidden"
            >
              {/* Priority Badge */}
              {category.priority === "high" && (
                <div className="absolute top-4 right-4">
                  <Badge
                    variant="secondary"
                    className="bg-eco-accent text-white"
                  >
                    <Star className="w-3 h-3 mr-1" />
                    Priority
                  </Badge>
                </div>
              )}

              {/* Header */}
              <div className="flex items-start space-x-4 mb-4">
                <div className="text-3xl">{category.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {category.description}
                  </p>
                  <div
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium text-${category.color} bg-${category.color}/10`}
                  >
                    +{category.points} EcoPoints per pickup
                  </div>
                </div>
              </div>

              {/* Examples */}
              <div className="mb-4">
                <h4 className="font-medium text-foreground mb-2">Examples:</h4>
                <div className="flex flex-wrap gap-2">
                  {category.examples.map((example) => (
                    <Badge key={example} variant="outline" className="text-xs">
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="mb-4">
                <h4 className="font-medium text-foreground mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-success" />
                  Sorting Tips:
                </h4>
                <ul className="space-y-1">
                  {category.tips.map((tip, tipIndex) => (
                    <li
                      key={tipIndex}
                      className="text-sm text-muted-foreground flex items-start"
                    >
                      <span className="w-1 h-1 bg-success rounded-full mt-2 mr-2 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* What to Avoid */}
              <div>
                <h4 className="font-medium text-foreground mb-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 text-destructive" />
                  Avoid:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.avoid.map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="text-xs border-destructive/30 text-destructive"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Special PET Focus Section */}
        <Card className="p-6 eco-card border-eco-accent/30 bg-eco-accent/5">
          <div className="text-center">
            <div className="w-16 h-16 bg-eco-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💎</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Why PET Bottles Matter Most
            </h3>
            <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
              PET bottles are the primary material for creating our community
              RainTiles. Each properly sorted PET bottle directly contributes to
              beautiful, functional installations that help manage rainwater and
              beautify Kilimani.
            </p>
            <div className="flex justify-center items-center space-x-6 text-sm">
              <div className="text-center">
                <p className="font-bold text-eco-accent">20 bottles</p>
                <p className="text-muted-foreground">= 1 RainTile</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-eco-accent">1000 bottles</p>
                <p className="text-muted-foreground">= 1 installation</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-eco-accent">15 points</p>
                <p className="text-muted-foreground">per PET pickup</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
