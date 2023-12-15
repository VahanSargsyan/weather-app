export interface IWeather {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  condition: string;
  icon: string;
}

interface IForecastDay {
  date: string;
  minTemperature: number;
  MaxTemperature: number;
  condition: string;
  icon: string;
}

export interface IForecast {
  forecast: IForecastDay[];
}
