import { IPlace } from "@/dto/places/place.dto";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Clock, Pin, Users } from "lucide-react";
import ItineraryModal from "./ItineraryModal";
import { IItinerary } from "@/dto/itineraries/itinerary.dto";

interface TripCardProps {
  places: IPlace[];
  description: string;
  peopleCount: number;
  daysDuration: number;
  itinerary: IItinerary;
}

export default function TripCard({
  places: placesProp,
  description,
  peopleCount,
  daysDuration,
  itinerary,
}: TripCardProps) {
  const places = placesProp;
  const images = places
    .map((place) => place.images?.[0]?.url)
    .filter(Boolean) as string[];
  const n = images.length;

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ItineraryModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        itinerary={itinerary}
      />
      <Card className="rounded-3xl cursor-pointer hover:shadow-md" onClick={() => setModalOpen(true)}>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-3 [grid-auto-flow:dense]">
            {images.map((src, i) => {
              const isLast = i === n - 1;
              let tile = "aspect-square"; // default

              if (n === 1 && isLast) {
                tile = "col-span-2 aspect-[2/1]";
              } else if (n === 2) {
                tile = "aspect-[2/1]";
              } else if (n >= 3 && n % 2 === 1 && isLast) {
                tile = "col-span-2 aspect-[2/1]";
              }

              return (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-xl ${tile}`}
                >
                  <img
                    src={src}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>

          <p className="text-xl font-bold mt-4">{itinerary.name}</p>
          <p className="mb-2">{description}</p>

          <div className="flex gap-2 items-center mb-2">
            <Users size={16} />
            <div className="text-sm">{peopleCount} people</div>
          </div>

          <div className="flex gap-2 items-center mb-2">
            <Clock size={16} />
            <div className="text-sm">{daysDuration} days</div>
          </div>

          <div className="flex gap-2 items-center">
            <Pin size={16} />
            <div className="text-sm">{places.length} spots</div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
