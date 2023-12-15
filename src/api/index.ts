import { TCords } from "@/types/common.ts";
import { IForecastResponse, IWeatherResponse } from "@/types/responce.ts";

const KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeatherByCity = async (
  city: string,
): Promise<IWeatherResponse> => {
  return fetch(
    `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}&aqi=no`,
  ).then((res) => res.json());
};

export const fetchWeatherByGeo = async (
  cords: TCords,
): Promise<IWeatherResponse> => {
  const [lang, lat] = cords;
  return fetch(
    `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${lang},${lat}&aqi=no`,
  ).then((res) => res.json());
};

export const fetchForecastByLocation = async (
  location: string | TCords,
): Promise<IForecastResponse | null> => {
  if (!location) return null;
  const _location = Array.isArray(location) ? location.join(",") : location;
  return fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${_location}&aqi=no&days=5`,
  ).then((res) => res.json());
};
