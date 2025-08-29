import { calculateTimeAndDistance } from "@/api/places/endpoints";
import { IPlace } from "@/dto/places/place.dto";
import { formatDistance } from "@/lib/formatter";
import { formatDuration } from "date-fns";
import { Bike, Car, Footprints, TrainFront } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function ItineraryTransport({
  placeFrom,
  placeTo,
}: {
  placeFrom: IPlace;
  placeTo?: IPlace;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [method, setMethod] = useState<string>("DRIVE");
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (placeFrom && placeTo) {
        setIsLoading(true);
        try {
          const response = await calculateTimeAndDistance({
            origin: {
              latitude: Number(placeFrom.latitude),
              longitude: Number(placeFrom.longitude),
            },
            destination: {
              latitude: Number(placeTo.latitude),
              longitude: Number(placeTo.longitude),
            },
          });
          if (response.data) {
            setDistance(response.data.distance);
            setDuration(response.data.duration);
          }
        } catch (e) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, []);

  if (isError) {
    return null
  }
  return (
    <div className="w-full flex gap-4 items-center bg-blue-200 rounded-lg p-2 px-4">
      {isLoading || !duration || !distance ? (
        <p className="text-sm">Calculating duration...</p>
      ) : (
        <>
          {method && (
            <span>
              {method === "DRIVE" && <Car />}
              {method === "WALK" && <Footprints />}
              {method === "BICYCLE" && <Bike />}
              {method === "TRANSIT" && <TrainFront />}
            </span>
          )}
          <p className="text-sm">
            {formatDistance(distance)} • {formatDuration({ seconds: duration })}
          </p>
        </>
      )}
    </div>
  );
}
