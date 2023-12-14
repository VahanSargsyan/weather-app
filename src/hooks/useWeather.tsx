import { useContext } from "react";

import { WeatherContext } from "@/contexts/WeatherContext.tsx";

export const useWeather = () => {
  return useContext(WeatherContext);
};
