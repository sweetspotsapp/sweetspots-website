"use client";

import { placesMock } from "@/mockData/placesMock";
import { useSwipedPlaces } from "@/store/useSwipedPlaces";
import React, { useEffect } from "react";
import TripCard from "./TripCard";
import { createAutoItinerary } from "@/api/auto-itinerary/endpoints";
import { IItinerary } from "@/dto/itineraries/itinerary.dto";
import { IPlace } from "@/dto/places/place.dto";
import TripCardSkeleton from "./skeletons/TripCardSkeleton";

const ITINERARY_COUNT = 3;

export default function RecommendedTripsSection() {
  const { swipedPlaceIds = [] } = useSwipedPlaces();

  const [isLoading, setIsLoading] = React.useState(false);
  const [itineraries, setItineraries] = React.useState<IItinerary[]>([]);

  // const places = placesMock.filter((place) =>
  //   swipedPlaceIds.includes(place.id)
  // );

  useEffect(() => {
    async function fetchAutoItinerary() {
      setIsLoading(true);
      const results: IItinerary[] = [];
      try {
        for (let i = 0; i < ITINERARY_COUNT; i++) {
          const res = await createAutoItinerary({
            placeIds: swipedPlaceIds,
            radiusKm: Math.floor(Math.random() * 5) + 1,
            targetCount: Math.floor(Math.random() * 5) + 3,
          });
          if (res.data) results.push(res.data);
        }
        setItineraries(results);
        console.log(results);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAutoItinerary();
  }, [swipedPlaceIds]);

  return (
    <div className="w-full">
      <div className="container mx-auto py-32">
        {isLoading ? (
          <>
            <p className="text-3xl font-bold mb-4">
              Cooking up some amazing trip ideas for you!
            </p>
            <div className="flex gap-4 w-full">
              <div className="flex-1">
                <TripCardSkeleton />
              </div>
              <div className="flex-1">
                <TripCardSkeleton />
              </div>
              <div className="flex-1">
                <TripCardSkeleton />
              </div>
            </div>
          </>
        ) : swipedPlaceIds.length > 0 ? (
          <>
            <p className="text-lg">Alright, based on your dream spots...</p>
            <p className="text-3xl font-bold mb-4">
              Here&apos;s our recommended trips
            </p>
            <div className="grid grid-cols-3 gap-4 overflow-scroll w-full">
              {itineraries.map((itinerary, idx) => (
                <div key={idx}>
                  <TripCard
                    places={
                      itinerary.itineraryPlaces?.map(
                        (ip) => ip.place as IPlace
                      ) || []
                    }
                    itinerary={itinerary}
                    description="Explore these amazing places!"
                    peopleCount={Math.floor(Math.random() * 4) + 2}
                    daysDuration={5}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg font-bold">
              You haven&apos;t picked any spots yet!
            </p>
            <p>
              Swipe right on places you like and we&apos;ll whip up some trip
              ideas for you!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
