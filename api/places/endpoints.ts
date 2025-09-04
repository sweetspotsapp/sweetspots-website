import { CalculateDistanceDto } from "@/dto/places/calculate-distance.dto";
import { api } from "../client";
import { ApiResponse } from "../pagination.dto";

export const calculateTimeAndDistance = async (
  data: CalculateDistanceDto
): Promise<ApiResponse<{ distance: number; duration: number }>> => {
  const res = await api.post('/places/calculate-time-distance', data);
  return res.data;
};

export const getRandomVibes = async (
  data?: {
    limit: number;
  }
): Promise<ApiResponse<string[]>> => {
  const res = await api.get('/places/random-vibes', { params: data });
  return res.data;
};
