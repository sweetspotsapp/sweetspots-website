import React from "react";
import Image from "next/image";
import { truncateStr, truncateWords } from "@/lib/utils";

interface PlaceCardProps {
  name: string;
  images?: string[];
  rating?: number;
  address?: string;
  reviews?: any[];
  description?: string;
}

export default function SwipeCard({
  name,
  images = [],
  rating,
  address,
  reviews = [],
  description,
}: PlaceCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="relative h-48">
        {images[0] && (
          <Image src={images[0]} alt={name} fill className="object-cover" />
        )}
        {rating !== undefined && (
          <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-xs font-semibold">
            {rating} ★
          </div>
        )}
      </div>
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-xl">{name}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {description ? (
            <>{truncateWords(description, 30)}</>
          ) : (
            <span>
              {name} is located at {address} with an impressive rating of{" "}
              {rating} based on {reviews.length} reviews.
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
