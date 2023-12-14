import Card from "@components/Card/Card.tsx";
import CityForm from "@components/CityForm/CityForm.tsx";
import Toggle from "@components/Toggle/Toggle.tsx";

import { useWeather } from "@/hooks/useWeather.tsx";

import "./App.css";

function App() {
  const { setCity } = useWeather();

  return (
    <>
      <Toggle />
      <CityForm
        onSubmit={(city) => {
          setCity(city);
        }}
      />
      <Card />
    </>
  );
}

export default App;
