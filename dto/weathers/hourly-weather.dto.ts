import { ConditionType } from "./weather.dto";

export interface IWeatherHourly {
  geohash: string;
  hourStartUtc: Date;
  tempC: string | null;
  feelsLikeC: string | null;
  windKph: string | null;
  windDir: string | null;
  precipMm: string | null;
  pop: number | null;  
  cloudPct: string | null;
  humidityPct: string | null;
  pressureHpa: string | null;
  iconCode: ConditionType | null;
  condition: string | null;
  provider: string;    
  fetchedAt: Date;
  expiresAt: Date;
}