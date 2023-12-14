import { FC } from "react";

import clsx from "clsx";

import styles from "./Toggle.module.scss";
import { useWeather } from "@/hooks/useWeather.tsx";

const Toggle: FC = () => {
  const { setUnit, unit } = useWeather();
  const isCelsius = unit === "C";
  return (
    <div
      className={styles.toggle}
      onClick={() => {
        setUnit(unit === "C" ? "F" : "C");
      }}
    >
      <span className={clsx(isCelsius ? styles.active : "", styles.unit)}>
        C
      </span>
      <span className={clsx(!isCelsius ? styles.active : "", styles.unit)}>
        F
      </span>
    </div>
  );
};

export default Toggle;
