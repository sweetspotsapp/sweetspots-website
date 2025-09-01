import { GetHourlyWeatherDto } from "@/dto/weathers/get-hourly-weather.dto";
import { GetHourlyWeatherByGeohashesDto } from "@/dto/weathers/get-hourly-weather-by-geohashes.dto";
import { GetDailyWeatherDto } from "@/dto/weathers/get-daily-weather.dto";
import { GetDailyWeatherByGeohashesDto } from "@/dto/weathers/get-daily-weather-by-geohashes.dto";
import { api } from "../client";
import { ApiResponse } from "../pagination.dto";
import { IWeatherHourly } from "@/dto/weathers/hourly-weather.dto";
import { IWeatherDaily } from "@/dto/weathers/daily-weather.dto";

export const getHourlyWeather = async (
  query: GetHourlyWeatherDto
): Promise<ApiResponse<IWeatherHourly[]>> => {
  const res = await api.get('/weathers/hourly', { params: query });
  return res.data;
};

export const getHourlyWeatherByGeohashes = async (
  query: GetHourlyWeatherByGeohashesDto
): Promise<ApiResponse<IWeatherHourly[]>> => {
  const res = await api.get('/weathers/hourly-geohash', { params: query });
  return res.data;
};

export const getDailyWeather = async (
  query: GetDailyWeatherDto
): Promise<ApiResponse<IWeatherDaily[]>> => {
  const res = await api.get('/weathers/daily', { params: query });
  return res.data;
};

export const getDailyWeatherByGeohashes = async (
  query: GetDailyWeatherByGeohashesDto
): Promise<ApiResponse<IWeatherDaily[]>> => {
  const res = await api.get('/weathers/daily-geohash', { params: query });
  return res.data;
};