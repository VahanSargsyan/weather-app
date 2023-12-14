import { FC } from "react";

import styles from "./Card.module.scss";
import { useWeather } from "@/hooks/useWeather.tsx";

const Card: FC = () => {
  const { weatherInfo } = useWeather();

  if (!weatherInfo) return null;
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>{weatherInfo?.city}</h2>
        <h3>{weatherInfo?.temperature}°</h3>
        <img src={`https:${weatherInfo.icon}`} alt="" />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardBodyItem}>
          <h4>Feels like</h4>
          <h5>{weatherInfo?.feelsLike}°</h5>
        </div>
        <div className={styles.cardBodyItem}>
          <h4>Humidity</h4>
          <h5>{weatherInfo?.humidity}%</h5>
        </div>
        {/*<div className={styles.cardBodyItem}>*/}
        {/*  <h4>Pressure</h4>*/}
        {/*  <h5>{weatherInfo?.main.pressure} hPa</h5>*/}
        {/*</div>*/}
        {/*<div className={styles.cardBodyItem}>*/}
        {/*  <h4>Wind</h4>*/}
        {/*  <h5>{weatherInfo?.wind.speed} m/s</h5>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default Card;
