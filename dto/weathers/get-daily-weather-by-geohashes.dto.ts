export interface GetDailyWeatherByGeohashesDto {
  geohashes: string[];
  fromUtc: string;
  toUtc: string;
}