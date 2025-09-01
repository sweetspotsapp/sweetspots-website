export interface GetDailyWeatherByGeohashesDto {
  geohashes: string[];
  lat: number;
  lon: number;
  fromUtc: string;
  toUtc: string;
}