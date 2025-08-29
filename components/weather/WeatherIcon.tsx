import React from "react";
import { ConditionType } from "@/dto/weather/weather.dto";
import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  Wind,
  CloudRainWind,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudHail,
  CloudLightning,
  CloudSunRain,
  CloudMoonRain,
} from "lucide-react";

interface WeatherIconProps {
  condition: ConditionType;
  isNight?: boolean;
  size?: number;
  className?: string;
}

export default function WeatherIcon({
  condition,
  isNight = false,
  size = 24,
  className,
}: WeatherIconProps) {
  // Map condition → {icon, color}
  const map: Record<
    ConditionType,
    { icon: React.ComponentType<any>; color: string }
  > = {
    // Sky
    [ConditionType.CLEAR]: { icon: isNight ? Moon : Sun, color: isNight ? "text-indigo-400" : "text-yellow-400" },
    [ConditionType.MOSTLY_CLEAR]: { icon: isNight ? CloudMoon : CloudSun, color: "text-yellow-300" },
    [ConditionType.PARTLY_CLOUDY]: { icon: isNight ? CloudMoon : CloudSun, color: "text-yellow-300" },
    [ConditionType.MOSTLY_CLOUDY]: { icon: Cloud, color: "text-gray-400" },
    [ConditionType.CLOUDY]: { icon: Cloud, color: "text-gray-400" },

    // Wind
    [ConditionType.WINDY]: { icon: Wind, color: "text-teal-400" },
    [ConditionType.WIND_AND_RAIN]: { icon: CloudRainWind, color: "text-blue-500" },

    // Showers
    [ConditionType.LIGHT_RAIN_SHOWERS]: { icon: CloudDrizzle, color: "text-blue-400" },
    [ConditionType.CHANCE_OF_SHOWERS]: { icon: CloudDrizzle, color: "text-blue-400" },
    [ConditionType.SCATTERED_SHOWERS]: { icon: CloudDrizzle, color: "text-blue-400" },
    [ConditionType.RAIN_SHOWERS]: { icon: isNight ? CloudMoonRain : CloudSunRain, color: "text-blue-500" },
    [ConditionType.HEAVY_RAIN_SHOWERS]: { icon: CloudRainWind, color: "text-blue-600" },

    // Rain
    [ConditionType.LIGHT_TO_MODERATE_RAIN]: { icon: CloudRain, color: "text-blue-500" },
    [ConditionType.MODERATE_TO_HEAVY_RAIN]: { icon: CloudRainWind, color: "text-blue-600" },
    [ConditionType.RAIN]: { icon: CloudRain, color: "text-blue-500" },
    [ConditionType.LIGHT_RAIN]: { icon: CloudDrizzle, color: "text-blue-400" },
    [ConditionType.HEAVY_RAIN]: { icon: CloudRainWind, color: "text-blue-700" },
    [ConditionType.RAIN_PERIODICALLY_HEAVY]: { icon: CloudRainWind, color: "text-blue-700" },

    // Snow
    [ConditionType.LIGHT_SNOW_SHOWERS]: { icon: CloudSnow, color: "text-sky-300" },
    [ConditionType.CHANCE_OF_SNOW_SHOWERS]: { icon: CloudSnow, color: "text-sky-300" },
    [ConditionType.SCATTERED_SNOW_SHOWERS]: { icon: CloudSnow, color: "text-sky-300" },
    [ConditionType.SNOW_SHOWERS]: { icon: CloudSnow, color: "text-sky-300" },
    [ConditionType.HEAVY_SNOW_SHOWERS]: { icon: CloudSnow, color: "text-sky-400" },

    [ConditionType.LIGHT_TO_MODERATE_SNOW]: { icon: CloudSnow, color: "text-sky-300" },
    [ConditionType.MODERATE_TO_HEAVY_SNOW]: { icon: CloudSnow, color: "text-sky-400" },
    [ConditionType.SNOW]: { icon: CloudSnow, color: "text-sky-300" },
    [ConditionType.LIGHT_SNOW]: { icon: CloudSnow, color: "text-sky-300" },
    [ConditionType.HEAVY_SNOW]: { icon: CloudSnow, color: "text-sky-500" },

    // Storms
    [ConditionType.SNOWSTORM]: { icon: CloudLightning, color: "text-purple-500" },
    [ConditionType.SNOW_PERIODICALLY_HEAVY]: { icon: CloudSnow, color: "text-sky-500" },
    [ConditionType.HEAVY_SNOW_STORM]: { icon: CloudLightning, color: "text-purple-600" },
    [ConditionType.BLOWING_SNOW]: { icon: Wind, color: "text-teal-400" },

    // Mixed
    [ConditionType.RAIN_AND_SNOW]: { icon: CloudSnow, color: "text-cyan-400" },
    [ConditionType.HAIL]: { icon: CloudHail, color: "text-cyan-400" },
    [ConditionType.HAIL_SHOWERS]: { icon: CloudHail, color: "text-cyan-400" },

    // Thunder
    [ConditionType.THUNDERSTORM]: { icon: CloudLightning, color: "text-purple-500" },
    [ConditionType.THUNDERSHOWER]: { icon: CloudLightning, color: "text-purple-500" },
    [ConditionType.LIGHT_THUNDERSTORM_RAIN]: { icon: CloudLightning, color: "text-purple-400" },
    [ConditionType.SCATTERED_THUNDERSTORMS]: { icon: CloudLightning, color: "text-purple-500" },
    [ConditionType.HEAVY_THUNDERSTORM]: { icon: CloudLightning, color: "text-purple-700" },
  };

  const { icon: Icon, color } = map[condition] ?? { icon: Cloud, color: "text-gray-400" };

  return <Icon size={size} className={`${color} ${className ?? ""}`} />;
}