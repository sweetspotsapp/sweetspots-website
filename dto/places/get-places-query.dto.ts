export class GetPlacesQueryDto {
  page: number = 1;
  limit: number = 20;
  category?: string;
  priceRange?: string[];
  vibes?: string[];
  rating?: number;
  distance?: number;
  latitude?: number;
  longitude?: number;
  sortBy?: 'rating' | 'distance' | 'newest' = 'newest';
  query?: string;
  showHidden?: boolean = false;
}