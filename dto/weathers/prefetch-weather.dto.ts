interface PrefetchItemDto {
  geohash?: string;
  lat: number;
  lon: number;
}

export interface PrefetchWeatherDto {
  items: PrefetchItemDto[];
  fromUtc: string;
  toUtc: string;
  granularity: 'hour' | 'day' | 'both';
}