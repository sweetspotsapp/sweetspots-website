export interface CreateAutoItineraryDto {
  userId?: string;
  placeIds: string[];
  targetCount?: number;
  startDate?: string;
  startTime?: string;
  nameHint?: string;
  description?: string;
  radiusKm?: number;
}
