import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

import toast, { Toaster } from "react-hot-toast";

import {
  fetchForecastByLocation,
  fetchWeatherByCity,
  fetchWeatherByGeo,
} from "@/api";
import { DEFAULT_TEMPERATURE_UNIT } from "@/constants/defaults.ts";
import {
  forecastDataAdapter,
  weatherDataAdapter,
} from "@/hellpers/addaptors.ts";
import { errorCheck } from "@/hellpers/api.ts";
import { TCords, TUnit } from "@/types/common.ts";
import { IForecastResponse, IWeatherResponse } from "@/types/responce.ts";
import { IForecast, IWeather } from "@/types/weather.ts";

interface IWeatherContext {
  weatherInfo: IWeather | null;
  setCity: (city: string) => void;
  unit: TUnit;
  setUnit: (units: TUnit) => void;
  forecastInfo: IForecast | null;
}

const geoLocation = navigator.geolocation;

export const WeatherContext = createContext<IWeatherContext>(
  {} as IWeatherContext,
);

export const WeatherProvider: FC<PropsWithChildren> = ({ children }) => {
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState<TUnit>(DEFAULT_TEMPERATURE_UNIT);
  const [coordinates, setCoordinates] = useState<TCords | null>(null);
  const [weatherData, setWeatherData] = useState<IWeatherResponse>();
  const [weatherInfo, setWeatherInfo] = useState<IWeather | null>(null);

  const [forecastData, setForecastData] = useState<IForecastResponse | null>(
    null,
  );
  const [forecastInfo, setForecastInfo] = useState<IForecast | null>(null);

  useEffect(() => {
    geoLocation?.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCoordinates([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    if (coordinates) {
      fetchWeatherByGeo(coordinates)
        ?.then(errorCheck)
        .then(setWeatherData)
        .catch((err) => console.log(err));
      fetchForecastByLocation(coordinates)
        .then(errorCheck)
        .then(setForecastData)
        .catch((err) => console.log(err));
    }
  }, [coordinates]);

  useEffect(() => {
    if (city) {
      fetchWeatherByCity(city)
        ?.then(errorCheck)
        .then(setWeatherData)
        .catch((err) => toast.error(err.message));
      fetchForecastByLocation(city)
        .then(errorCheck)
        .then(setForecastData)
        .catch((err) => console.log(err));
    }
  }, [city]);

  useEffect(() => {
    if (weatherData) {
      console.log(weatherData, "weatherData");
      setWeatherInfo(weatherDataAdapter(weatherData, unit));
    }
  }, [weatherData, unit]);

  useEffect(() => {
    if (forecastData) {
      setForecastInfo(forecastDataAdapter(forecastData, unit));
    }
  }, [forecastData, unit]);

  return (
    <WeatherContext.Provider
      value={{
        unit,
        weatherInfo,
        forecastInfo,
        setCity,
        setUnit,
      }}
    >
      {children}
      <Toaster position="top-right" />
    </WeatherContext.Provider>
  );
};
