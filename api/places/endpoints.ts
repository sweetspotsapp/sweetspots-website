import { CalculateDistanceDto } from "@/dto/places/calculate-distance.dto";
import { api } from "../client";
import { ApiResponse } from "../pagination.dto";

export const calculateTimeAndDistance = async (
  data: CalculateDistanceDto
): Promise<ApiResponse<{ distance: number; duration: number }>> => {
  const res = await api.post('/places/calculate-time-distance', data);
  return res.data;
};