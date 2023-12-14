import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

import { getWeatherByCity, getWeatherByGeo } from "@/api";
import { DEFAULT_TEMPERATURE_UNIT } from "@/constants/defaults.ts";
import { TCords, TUnit } from "@/types/common.ts";
import { IWeatherResponse } from "@/types/responce.ts";
import { IWeather } from "@/types/weather.ts";

interface IWeatherContext {
  weatherInfo: IWeather | null;
  setCity: (city: string) => void;
  unit: TUnit;
  setUnit: (units: TUnit) => void;
}

const geoLocation = navigator.geolocation;

const weatherDataAdapter = (data: IWeatherResponse, unit: TUnit): IWeather => {
  const { current, location } = data;

  return {
    city: location.name,
    country: location.country,
    temperature: unit === "C" ? current.temp_c : current.temp_f,
    feelsLike: unit === "C" ? current.feelslike_c : current.feelslike_f,
    humidity: current.humidity,
    condition: current.condition.text,
    icon: current.condition.icon,
  };
};

export const WeatherContext = createContext<IWeatherContext>(
  {} as IWeatherContext,
);

export const WeatherProvider: FC<PropsWithChildren> = ({ children }) => {
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState<TUnit>(DEFAULT_TEMPERATURE_UNIT);
  const [coordinates, setCoordinates] = useState<TCords | null>(null);
  const [weatherData, setWeatherData] = useState<IWeatherResponse>();

  const [weatherInfo, setWeatherInfo] = useState<IWeather | null>(null);

  useEffect(() => {
    geoLocation?.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCoordinates([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    if (weatherData) {
      console.log(weatherData);
      setWeatherInfo(weatherDataAdapter(weatherData, unit));
    }
  }, [weatherData, unit]);

  useEffect(() => {
    if (coordinates) {
      getWeatherByGeo(coordinates)?.then((data) => setWeatherData(data));
    }
  }, [coordinates]);

  useEffect(() => {
    if (city) {
      getWeatherByCity(city)?.then((data) => setWeatherData(data));
    }
  }, [city]);

  return (
    <WeatherContext.Provider value={{ unit, weatherInfo, setCity, setUnit }}>
      {children}
    </WeatherContext.Provider>
  );
};
