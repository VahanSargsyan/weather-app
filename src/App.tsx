import Card from "@components/Card/Card.tsx";
import CityForm from "@components/CityForm/CityForm.tsx";
import Forecast from "@components/Forecast/Forecast.tsx";
import Toggle from "@components/Toggle/Toggle.tsx";

import styles from "./App.module.scss";
import { useWeather } from "@/hooks/useWeather.tsx";

import "@/styles/global.scss";

function App() {
  const { setCity } = useWeather();

  return (
    <>
      <div className={styles.background}>
        <img
          className={styles.backgroundImage}
          src="https://png.pngtree.com/thumb_back/fh260/back_pic/04/16/77/785825b4ba713f1.jpg"
          alt="Background"
        />
      </div>
      <div className={styles.app}>
        <div className={styles.header}>
          <Toggle />
          <CityForm
            onSubmit={(city) => {
              setCity(city);
            }}
          />
        </div>
        <div className={styles.content}>
          <Card />
          <Forecast />
        </div>
      </div>
    </>
  );
}

export default App;
