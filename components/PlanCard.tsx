import { IPlace } from "@/dto/places/place.dto";
import { Card } from "./ui/card";
import Cursor from "./Cursor";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Cloud, CloudFog, CloudRain, CloudRainWind, Snowflake, Sun, Tag } from "lucide-react";

export interface Weather {
  temperature: number;
  description?: string;
  weather: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' | 'foggy';
}

export interface PlanCardProps {
  place: IPlace;
  placeId: string;
  // budget: number;
  costRange: number[];
  timeText: string;
  dateText: string;
  closingTime: Date;
  selectedField?: "time" | "date" | "budget" | undefined | null;
  collaborators: {
    avatarUrl?: string;
    name: string;
  }[];
  weather?: Weather;
}

export interface PlanCardRefs {
  timeEl: HTMLParagraphElement | null;
  budgetEl: HTMLParagraphElement | null;
  buttonEl: HTMLButtonElement | null;
  dateEl: HTMLParagraphElement | null;
}

const PlanCard = forwardRef<PlanCardRefs, PlanCardProps>(function PlanCard(
  props,
  ref
) {
  const {
    place,
    // budget,
    costRange,
    closingTime,
    collaborators,
    timeText,
    selectedField,
    dateText,
    weather = {
      temperature: 16,
      weather: "sunny",
      description: "Sunny",
    },
  } = props;

  // const weatherDescription = weather?.description || capitalCase(weather?.weather || "Sunny");

  function renderWeatherIcon(weather: Weather) {
    switch (weather.weather) {
      case "sunny":
        return <Sun className="text-yellow-500" />;
      case "cloudy":
        return <Cloud className="text-gray-500" />;
      case "rainy":
        return <CloudRain className="text-blue-500" />;
      case "snowy":
        return <Snowflake className="text-white" />;
      case "stormy":
        return <CloudRainWind className="text-red-500" />;
      case "foggy":
        return <CloudFog className="text-gray-300" />;
      default:
        return <Sun className="text-yellow-500" />;
    }
  }

  const [imIn, setImIn] = useState(false);

  const timeRef = useRef<HTMLParagraphElement>(null);
  const budgetRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dateRef = useRef<HTMLParagraphElement>(null);

  useImperativeHandle(ref, () => ({
    timeEl: timeRef.current,
    budgetEl: budgetRef.current,
    buttonEl: buttonRef.current,
    dateEl: dateRef.current,
  }));

  return (
    <div className="flex gap-3">
      <div className="flex flex-col justify-center items-center">
        <div className="rounded-full bg-black h-4 w-4" />
        <div className="w-[2px] flex-1 bg-black" />
      </div>
      <div className="flex-1 mb-2">
        <div className="mb-2">
          <div
            className={cn(
              selectedField === "date" &&
                "bg-orange-100/20 w-36 rounded border border-orange-100"
            )}
          >
            <p ref={dateRef} className="font-bold w-48">
              {dateText}
            </p>
          </div>
          {/* TIME */}
          <div
            className={cn(
              selectedField === "time" &&
                "bg-orange-100/20 w-12 rounded border border-orange-100"
            )}
          >
            <p ref={timeRef} className="w-32">
              {timeText}
            </p>
          </div>
        </div>
        <Card className="p-4 rounded-b-none">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="text-lg font-bold">{place.name}</p>
              <div className="flex gap-1 items-center">
              {renderWeatherIcon(weather)}
              <p className="my-0 text-sm">{weather.temperature}°</p>
              </div>
            </div>
            {/* <p className="text-sm text-gray-500">Place ID: {placeId}</p> */}
            {/* BUDGET */}
            <div
              className={cn(
                "flex gap-2 items-center w-48",
                selectedField === "budget" &&
                  "bg-orange-300/20 rounded border border-orange-300"
              )}
            >
              <Tag size={12} />
              <p ref={budgetRef} className="text-sm">
                ${costRange.join('-')}/per person
              </p>
            </div>
            {/* <p className="text-sm">
              Closing Time: {closingTime.toLocaleTimeString()}
            </p> */}
            <div className="flex gap-2 mt-2">
              {collaborators.map((collab, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <img
                    src={collab.avatarUrl}
                    alt={collab.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm">{collab.name}</span>
                </div>
              ))}
              {imIn && (
                <div className="flex items-center gap-1">
                  <img
                    src={"https://randomuser.me/api/portraits/lego/1.jpg"}
                    alt={"You"}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm">You</span>
                </div>
              )}
            </div>
          </div>
        </Card>
        <Button
          ref={buttonRef}
          variant={!imIn ? "default" : "outline"}
          className="w-full rounded-t-none rounded-b-xl pointer-events-none"
          onClick={() => setImIn(!imIn)}
        >
          {!imIn ? "I'm In!" : "I'm Out!"}
        </Button>
      </div>
    </div>
  );
});

export default PlanCard;
