import { TUnit } from "@/types/common.ts";
import { IForecastResponse, IWeatherResponse } from "@/types/responce.ts";
import { IForecast, IWeather } from "@/types/weather.ts";

export const forecastDataAdapter = (
  data: IForecastResponse | null,
  unit: TUnit,
): IForecast => {
  if (!data) {
    return {
      forecast: [],
    };
  }
  const {
    forecast: { forecastday },
  } = data;

  return {
    forecast: forecastday.map((item) => {
      return {
        date: item.date,
        minTemperature: unit === "C" ? item.day.mintemp_c : item.day.mintemp_f,
        MaxTemperature: unit === "C" ? item.day.maxtemp_c : item.day.maxtemp_f,
        condition: item.day.condition.text,
        icon: item.day.condition.icon,
      };
    }),
  };
};

export const weatherDataAdapter = (
  data: IWeatherResponse,
  unit: TUnit,
): IWeather => {
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

export const generateChartData = (data: IForecast | null) => {
  const labels = data?.forecast.map((item) => item.date) || [];

  return {
    labels,
    datasets: [
      {
        label: "Max Temperature",
        data: data?.forecast.map((item) => item.MaxTemperature) || [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Min Temperature",
        data: data?.forecast.map((item) => item.minTemperature) || [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
};
