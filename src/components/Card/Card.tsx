import { FC } from "react";

import styles from "./Card.module.scss";
import { useWeather } from "@/hooks/useWeather.tsx";

const Card: FC = () => {
  const { weatherInfo } = useWeather();

  if (!weatherInfo) return null;
  return (
    <div className={styles.card}>
      <div className={styles.mainContent}>
        <img className={styles.icon} src={`https:${weatherInfo.icon}`} alt="" />

        <div>
          <h5>Feels like</h5>
          <h6>{weatherInfo?.feelsLike}°</h6>
        </div>
      </div>
      <div className={styles.secondaryContent}>
        <div>
          <h1 className={styles.temperature}>{weatherInfo?.temperature}°</h1>
          <h3>{weatherInfo?.city}</h3>
        </div>

        <div className={styles.cardBodyItem}>
          <h5>Humidity</h5>
          <h6>{weatherInfo?.humidity}%</h6>
        </div>
      </div>
    </div>
  );
};

export default Card;
