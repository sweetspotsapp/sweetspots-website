export interface GetHourlyWeatherByGeohashesDto {
  geohashes: string[];
  lat: number;
  lon: number;
  fromUtc: string;
  toUtc: string;
}