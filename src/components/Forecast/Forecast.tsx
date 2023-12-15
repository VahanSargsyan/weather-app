import { FC, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import clsx from "clsx";
import { Line } from "react-chartjs-2";

import styles from "./Forecast.module.scss";
import { CHART_OPTIONS } from "@/constants/configs.ts";
import { generateChartData } from "@/hellpers/addaptors.ts";
import { useWeather } from "@/hooks/useWeather.tsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

ChartJS.defaults.color = "#fff";

const Forecast: FC = () => {
  const { forecastInfo } = useWeather();
  const [open, setOpen] = useState(false);

  const data = generateChartData(forecastInfo);

  if (!forecastInfo) return null;

  return (
    <div className={styles.forecast}>
      <div onClick={() => setOpen(!open)} className={styles.header}>
        Forecast for 5 days{" "}
        <span className={clsx(styles.arrow, open && styles.open)}>▼</span>
      </div>

      <div className={clsx(styles.chart, open && styles.openChart)}>
        <Line options={CHART_OPTIONS} data={data} />
        <div className={styles.dayInfoWrapper}>
          {forecastInfo?.forecast.map((day) => {
            return (
              <div key={day.date} className={styles.dayInfo}>
                <img src={`https:${day.icon}`} alt="Weather Icon" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Forecast;
