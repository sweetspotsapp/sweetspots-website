export interface GetHourlyWeatherDto {
  geohash?: string;
  lat?: number;
  lon?: number;
  fromUtc: string; // ISO string
  toUtc: string; // ISO string
}