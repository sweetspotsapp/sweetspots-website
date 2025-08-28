import React from "react";
import Image from "next/image";
import { IRecommendedPlace } from "@/dto/recommendations/recommendation.dto";
import { Badge } from "./ui/badge";

interface PlaceCardProps {
  name: string;
  recommendedPlace: IRecommendedPlace;
  images?: string[];
  rating?: number;
  address?: string;
  reviews?: any[];
  description?: string;
}

export default function SwipeCard({
  recommendedPlace,
  name,
  images = [],
  rating,
}: PlaceCardProps) {
  const { vibes } = recommendedPlace
  return (
    <div className="relative rounded-2xl shadow-lg overflow-hidden h-[400px]">
      <div className="absolute bottom-0 z-30 p-4 pb-8">
        <h3 className="font-semibold text-white text-2xl mb-2">{name}</h3>
        <div className="flex flex-wrap gap-2">
          {vibes.map((vibe) => (
            <Badge variant="outline" className='border shadow-sm !border-orange-500 bg-white text-black' key={vibe}>
              {vibe}
            </Badge>
          ))}
        </div>
        {/* <p className="text-sm text-white leading-relaxed">
          {description ? (
            <>{truncateWords(description, 30)}</>
          ) : (
            <span>
              {name} is located at {address} with an impressive rating of{" "}
              {rating} based on {reviews.length} reviews.
            </span>
          )}
        </p> */}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/2 z-20 bg-gradient-to-t opacity-50 from-black/90 via-black/60 to-transparent" />
      {images[0] && (
        <Image src={images[0]} alt={name} fill className="object-cover inset-0 z-10" />
      )}
      {rating !== undefined && (
        <div className="absolute z-20 top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-xs font-semibold">
          {rating} ★
        </div>
      )}

    </div>
  );
}
