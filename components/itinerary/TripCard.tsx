'use client';

import { IPlace } from "@/dto/places/place.dto";
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Clock, Pin, Users } from "lucide-react";
import ItineraryModal from "./ItineraryModal";
import { IItinerary } from "@/dto/itineraries/itinerary.dto";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

interface TripCardProps {
  places: IPlace[];
  description: string;
  peopleCount: number;
  daysDuration: number;
  itinerary: IItinerary;
  ctaLabelIdx: number;
  onCtaClick?: () => void;
}

export default function TripCard({
  places: placesProp,
  description,
  peopleCount,
  daysDuration,
  itinerary,
  ctaLabelIdx,
  onCtaClick = () => {}
}: TripCardProps) {
  const places = placesProp;
  const images = places
    .map((place) => place.images?.[0]?.url)
    .filter(Boolean)
    .slice(0, 4) as string[];
  const n = images.length;

  const remainder = places.length - n;

  const [modalOpen, setModalOpen] = useState(false);

  const t = useTranslations('ctaButtons')

  const ctaLabels = [
    t('loveThis'),
    t('letsGo'),
    t('mySweetspots'),
    t('thisOne'),
    t('takeMeThere'),
  ]

  const ctaLabel = ctaLabels[ctaLabelIdx];

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <ItineraryModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        itinerary={itinerary}
      />
      <Card className="rounded-3xl hover:shadow-md" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <CardContent className="p-6 cursor-pointer" onClick={() => setModalOpen(true)}>
          <div className="relative grid grid-cols-2 gap-3 [grid-auto-flow:dense]">
                <div
                  className="absolute inset-0 bg-orange-600/50 rounded-xl pointer-events-none z-10 flex items-center justify-center transition-opacity duration-150 opacity-100"
                  style={{ opacity: isHovered ? 1 : 0 }}
                >
                  <span className="text-white">View Itinerary</span>
                </div>
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
            {
              remainder > 0 && (
                <div className={`absolute bottom-4 right-4 overflow-hidden rounded-xl shadow-lg p-2 py-1 bg-orange-100 flex justify-center mt-4`}>
                  + {remainder}
                </div>
              )
            }
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
        <CardFooter>
          <Button className="w-full mt-4" onClick={onCtaClick}>
            {ctaLabel}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
