import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, MapPin, Clock, Recycle, Gift } from "lucide-react";
import { format } from "date-fns";

export interface PickupRequestFormProps {
  onSubmit: (request: PickupRequest) => void;
  isLoading?: boolean;
}

export interface PickupRequest {
  location: string;
  date: Date;
  timeSlot: string;
  wasteTypes: string[];
  specialInstructions: string;
  contact: string;
}

const wasteCategories = [
  { id: "organic", label: "Organic Waste", points: 5, icon: "🥬" },
  { id: "paper", label: "Paper & Cardboard", points: 8, icon: "📄" },
  { id: "plastic", label: "General Plastic", points: 10, icon: "🥤" },
  { id: "pet", label: "PET Bottles", points: 15, icon: "💎", highlight: true },
];

const timeSlots = [
  "6:00 AM - 8:00 AM",
  "8:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "2:00 PM - 4:00 PM",
  "4:00 PM - 6:00 PM",
];

export const PickupRequestForm: React.FC<PickupRequestFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedWasteTypes, setSelectedWasteTypes] = useState<string[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  const handleWasteTypeToggle = (wasteId: string) => {
    setSelectedWasteTypes((prev) =>
      prev.includes(wasteId)
        ? prev.filter((id) => id !== wasteId)
        : [...prev, wasteId]
    );
  };

  const calculateEcoPoints = () => {
    return selectedWasteTypes.reduce((total, wasteId) => {
      const category = wasteCategories.find((cat) => cat.id === wasteId);
      return total + (category?.points || 0);
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !selectedDate ||
      !selectedTimeSlot ||
      !location ||
      selectedWasteTypes.length === 0
    ) {
      return;
    }

    onSubmit({
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      location,
      contact,
      wasteTypes: selectedWasteTypes,
      specialInstructions,
    });
  };

  const isFormValid =
    selectedDate &&
    selectedTimeSlot &&
    location &&
    selectedWasteTypes.length > 0;

  return (
    <section className="py-16" id="pickup-request">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Schedule Pickup
          </h2>
          <p className="text-muted-foreground">
            Request a waste pickup and earn EcoPoints for every properly sorted
            category.
          </p>
        </div>

        <Card className="p-6 eco-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Waste Categories */}
            <div>
              <Label className="text-base font-semibold mb-4 block">
                Select Waste Categories
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {wasteCategories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => handleWasteTypeToggle(category.id)}
                    className={`
                      relative p-4 rounded-lg border-2 cursor-pointer eco-transition
                      ${
                        selectedWasteTypes.includes(category.id)
                          ? category.highlight
                            ? "border-eco-accent bg-eco-accent/10"
                            : "border-eco-primary bg-eco-primary/10"
                          : "border-border hover:border-eco-primary/50"
                      }
                      ${category.highlight ? "ring-2 ring-eco-accent/20" : ""}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{category.icon}</span>
                        <div>
                          <p className="font-medium text-foreground">
                            {category.label}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            +{category.points} EcoPoints
                          </p>
                        </div>
                      </div>
                      {category.highlight && (
                        <Badge
                          variant="secondary"
                          className="bg-eco-accent text-white"
                        >
                          <Gift className="w-3 h-3 mr-1" />
                          Bonus
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {selectedWasteTypes.length > 0 && (
                <div className="mt-4 p-3 bg-success/10 rounded-lg">
                  <p className="text-sm font-medium text-success flex items-center">
                    <Recycle className="w-4 h-4 mr-2" />
                    You'll earn {calculateEcoPoints()} EcoPoints for this
                    pickup!
                  </p>
                </div>
              )}
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location" className="text-base font-semibold">
                <MapPin className="w-4 h-4 inline mr-2" />
                Pickup Location
              </Label>
              <Input
                id="location"
                placeholder="Enter your address or landmark in Kilimani"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-base font-semibold block mb-2">
                  <CalendarIcon className="w-4 h-4 inline mr-2" />
                  Pickup Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {selectedDate
                        ? format(selectedDate, "PPP")
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="text-base font-semibold block mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Time Slot
                </Label>
                <div className="space-y-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`
                        w-full p-2 text-sm rounded border eco-transition text-left
                        ${
                          selectedTimeSlot === slot
                            ? "bg-eco-primary text-white border-eco-primary"
                            : "border-border hover:border-eco-primary/50"
                        }
                      `}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <Label htmlFor="contact" className="text-base font-semibold">
                Contact Number
              </Label>
              <Input
                id="contact"
                placeholder="Your phone number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Special Instructions */}
            <div>
              <Label htmlFor="instructions" className="text-base font-semibold">
                Special Instructions (Optional)
              </Label>
              <Textarea
                id="instructions"
                placeholder="Any special notes for the collector..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="mt-2"
                rows={3}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full bg-eco-primary hover:bg-eco-primary/90 py-3 text-lg"
            >
              {isLoading ? "Scheduling..." : "Schedule Pickup"}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};
