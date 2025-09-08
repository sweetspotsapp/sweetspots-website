import { CalculateDistanceDto } from "@/dto/places/calculate-distance.dto";
import { api } from "../client";
import { ApiPluralResponse, ApiResponse } from "../pagination.dto";
import { PlaceFormValues } from "@/components/admin-place/PlaceForm";
import { IPlace } from "@/dto/places/place.dto";
import { GetPlacesQueryDto } from "@/dto/places/get-places-query.dto";

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

export const createPlace = async (
  data: PlaceFormValues
): Promise<ApiResponse<IPlace>> => {
  const res = await api.post('/places', data);
  return res.data;
};

export const updatePlace = async (
  placeId: string,
  data: Partial<PlaceFormValues>
): Promise<ApiResponse<IPlace>> => {
  const res = await api.put(`/places/${placeId}`, data);
  return res.data;
};

export const deletePlace = async (
  placeId: string
): Promise<ApiResponse<null>> => {
  const res = await api.delete(`/places/${placeId}`);
  return res.data;
};

export const getPlaces = async (
  params?: GetPlacesQueryDto
): Promise<ApiPluralResponse<IPlace>> => {
  const res = await api.get('/places', { params });
  return res.data;
};

export const getPlace = async (
  placeId: string
): Promise<ApiResponse<IPlace>> => {
  const res = await api.get(`/places/${placeId}`);
  return res.data;
}