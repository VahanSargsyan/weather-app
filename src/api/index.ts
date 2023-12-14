import { TCords } from "@/types/common.ts";
import { IWeatherResponse } from "@/types/responce.ts";

const KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getWeatherByCity = (city: string): Promise<IWeatherResponse> => {
  return fetch(
    `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}&aqi=no`,
  ).then((res) => res.json());
};

export const getWeatherByGeo: (
  cords: TCords | null,
) => null | Promise<IWeatherResponse> = (cords) => {
  if (!cords) return null;
  const [lang, lat] = cords;
  return fetch(
    `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${lang},${lat}&aqi=no`,
  ).then((res) => res.json());
};
