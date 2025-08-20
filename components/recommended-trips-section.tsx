"use client";

import { placesMock } from "@/mockData/placesMock";
import { useSwipedPlaces } from "@/store/useSwipedPlaces";
import React, { useEffect } from "react";
import TripCard from "./TripCard";
import { createAutoItinerary } from "@/api/auto-itinerary/endpoints";
import { IItinerary } from "@/dto/itineraries/itinerary.dto";
import { IPlace } from "@/dto/places/place.dto";

export default function RecommendedTripsSection() {
  const { swipedPlaceIds = [] } = useSwipedPlaces();

  const [itineraries, setItineraries] = React.useState<IItinerary[]>([]);

  const places = placesMock.filter((place) =>
    swipedPlaceIds.includes(place.id)
  );

  useEffect(() => {
    console.log("RecommendedTripsSection", swipedPlaceIds);
    async function fetchAutoItinerary() {
      const results: IItinerary[] = [];
      for (let i = 0; i < 3; i++) {
        const res = await createAutoItinerary({
          placeIds: swipedPlaceIds,
          radiusKm: Math.floor(Math.random() * 5) + 1, // random integer from 1 to 5
          targetCount: Math.floor(Math.random() * 5) + 3 // random integer from 3 to 7
        });
        if (res.data) results.push(res.data);
      }
      setItineraries(results);
      console.log(results);
    }
    fetchAutoItinerary();
  }, [swipedPlaceIds])

  //   console.log("RecommendedTripsSection", swipedPlacesIds);
  return (
    <div className="w-full">
      <div className="container mx-auto py-32">
        {swipedPlaceIds.length > 0 ? (
          <>
            <p className="text-lg">Alright, based on your dream spots...</p>
            <p className="text-3xl font-bold">
              Here&apos;s our recommended trips
            </p>
            <div className="grid grid-cols-3 gap-4 overflow-scroll w-full">
              {itineraries.map((itinerary, idx) => (
                <div key={idx}>
                  <TripCard
                    title={itinerary.name}
                    places={itinerary.itineraryPlaces?.map((ip) => ip.place as IPlace) || []}
                    description="Explore these amazing places!"
                    peopleCount={2}
                    daysDuration={5}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p>No dream spots selected yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
