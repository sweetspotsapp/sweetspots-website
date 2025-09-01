export interface GetHourlyWeatherByGeohashesDto {
  geohashes: string[];
  fromUtc: string;
  toUtc: string;
}