import { IPlace } from "@/dto/places/place.dto";
import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { placesMock } from "@/mockData/placesMock";
import { Clock, Users } from "lucide-react";

interface TripCardProps {
  places: IPlace[];
  title: string;
  description: string;
  peopleCount: number;
  daysDuration: number;
}

function spanFor(count: number, idx: number) {
  const BASE = 4; // 24 * 8px = 192px
  const TALL = 8; // 48 * 8px = 384px

  switch (count) {
    case 3:
      return idx === 0 ? TALL : BASE; // first tall
    case 4:
      return BASE; // all normal
    case 5:
      return idx === 1 ? TALL : BASE; // stagger
    case 6:
      return idx === 0 || idx === 3 ? TALL : BASE; // two tall, one per column
    default:
      return idx % 5 === 0 ? TALL : BASE; // fallback pattern for 7+
  }
}

export default function TripCard({
  places: placesProp,
  title,
  description,
  peopleCount,
  daysDuration,
}: TripCardProps) {
  const places = placesProp;
  const images = places.map((place) => place.images?.[0]?.url).filter(Boolean);
  return (
    <Card className="rounded-3xl">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-3 auto-rows-[8px] h-[320px] md:h-[360px] overflow-hidden">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden"
              style={{ gridRowEnd: `span ${spanFor(images.length, idx)}` }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <p className="text-xl font-bold">{title}</p>
        <p className="mb-2">{description}</p>
        <div className="flex gap-2 items-center mb-2">
          <Users size={16} />
          <div className="text-sm">{peopleCount} people</div>
        </div>
        <div className="flex gap-2 items-center">
          <Clock size={16} />
          <div className="text-sm">{daysDuration} days</div>
        </div>
      </CardContent>
    </Card>
  );
}
