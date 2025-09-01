import { IWeatherHourly } from '@/dto/weathers/hourly-weather.dto';
import { create } from 'zustand';

type HourlyWeatherState = {
    hourlyWeathers: { [geohash: string]: IWeatherHourly[] };
    setHourlyWeather: (geohash: string, weathers: IWeatherHourly[]) => void;
    removeHourlyWeather: (geohash: string) => void;
    clearHourlyWeathers: () => void;
};

export const useHourlyWeathers = create<HourlyWeatherState>((set) => ({
    hourlyWeathers: {},
    setHourlyWeather: (geohash, weathers) =>
        set((state) => ({
            hourlyWeathers: {
                ...state.hourlyWeathers,
                [geohash]: weathers,
            },
        })),
    removeHourlyWeather: (geohash) =>
        set((state) => {
            const { [geohash]: _, ...rest } = state.hourlyWeathers;
            return { hourlyWeathers: rest };
        }),
    clearHourlyWeathers: () => set({ hourlyWeathers: {} }),
}));