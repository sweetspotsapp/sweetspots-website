export interface IWeatherDaily {
  geohash: string;
  dayUtc: Date;
  minC: string | null;
  maxC: string | null;
  pop: number | null;
  precipMm: string | null;
  windKph: string | null;
  iconCode: string | null;
  provider: string;
  fetchedAt: Date;
  expiresAt: Date;
}