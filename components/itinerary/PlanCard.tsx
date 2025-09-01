import { IPlace } from "@/dto/places/place.dto";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { cn, encodeGeohash } from "@/lib/utils";
import {
  Cloud,
  CloudFog,
  CloudRain,
  CloudRainWind,
  Snowflake,
  Sun,
  Tag,
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ConditionType } from "@/dto/weathers/weather.dto";
import WeatherIcon from "../weather/WeatherIcon";
import {
  HourlyWeatherState,
  useHourlyWeathers,
} from "@/hooks/useHourlyWeathers";
import { getHourlyWeatherByGeohashes } from "@/api/weathers/endpoints";
import moment from "moment";
import { IWeatherHourly } from "@/dto/weathers/hourly-weather.dto";

export interface Weather {
  temperature: number;
  description?: string;
  weather: ConditionType;
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
  disableWeather?: boolean;
  hiddenButton?: boolean;
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
    weather: weatherProp,
    disableWeather = false,
    hiddenButton = false
  } = props;

  // const weatherDescription = weather?.description || capitalCase(weather?.weather || "Sunny");
  const weatherSelector = (geohash: string) => (s: HourlyWeatherState) =>
    s.hourlyWeathers[geohash];

  const geohash = React.useMemo(
    () => encodeGeohash(Number(place.latitude), Number(place.longitude)),
    [place.latitude, place.longitude]
  );
  const weatherData = useHourlyWeathers(
    useCallback(weatherSelector(geohash), [geohash])
  );

  const [newWeathers, setNewWeathers] = useState<IWeatherHourly[]>(
    weatherData || []
  );
  const newWeather = newWeathers[0];

  const setHourlyWeather = useHourlyWeathers((s) => s.setHourlyWeather);

  useEffect(() => {
    if (disableWeather) return;
    if (weatherData && weatherData.length > 0) return;

    console.log('GETTING WEATHER FOR', place.name)

    const now = moment(`${dateText} ${timeText}`, "YYYY-MM-DD HH:mm").toDate();
    const to = moment(now).add(1, "hours").toDate();

    let cancelled = false;
    getHourlyWeatherByGeohashes({
      geohashes: [geohash],
      lat: Number(place.latitude),
      lon: Number(place.longitude),
      fromUtc: now.toISOString(),
      toUtc: to.toISOString(),
    })
      .then((res) => {
        if (cancelled) return;
        if (res.data?.length) {
          setHourlyWeather(geohash, res.data as IWeatherHourly[]);
          console.log('SETTING WEATHER FOR', place.name, res.data)
          setNewWeathers(res.data as IWeatherHourly[]);
        }
      })
      .catch(() => {
        /* optional: toast/log */
      });

    return () => {
      cancelled = true;
    };
  }, [
    disableWeather,
    weatherData,
    geohash,
    dateText,
    timeText,
    place.latitude,
    place.longitude,
    setHourlyWeather,
  ]);

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

  const defaultImages = [
    "https://plus.unsplash.com/premium_photo-1664970900025-1e3099ca757a?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  const imageUrl =
    place.images?.[0]?.url ||
    defaultImages[Math.floor(Math.random() * defaultImages.length)];

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
        <Card className="p-4 rounded-b-none flex">
          <img
            src={imageUrl}
            alt={place.name}
            className="w-24 h-24 rounded object-cover mr-4"
          />
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between">
              <p className="text-lg font-bold">{place.name}</p>
              {
                newWeather && (
                  <div className="flex gap-1 items-center">
                    <WeatherIcon condition={newWeather.iconCode || ConditionType.CLEAR} />
                    <p className="my-0 text-sm">{newWeather.tempC}°</p>
                  </div>
                )
              }
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
                ${costRange.join("-")}/per person
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
        {
          !hiddenButton && (
            <Button
              ref={buttonRef}
              variant={!imIn ? "default" : "outline"}
              className="w-full rounded-t-none rounded-b-xl pointer-events-none"
              onClick={() => setImIn(!imIn)}
            >
              {!imIn ? "I'm In!" : "I'm Out!"}
            </Button>
          )
        }
      </div>
    </div>
  );
});

export default PlanCard;
