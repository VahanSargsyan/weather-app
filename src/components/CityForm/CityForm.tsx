import { FC, useState } from "react";

import Input from "@components/Input/Input.tsx";

interface ICityFormProps {
  onSubmit: (value: string) => void;
}

const CityForm: FC<ICityFormProps> = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(value);
        setValue("");
      }}
    >
      <Input
        value={value}
        onChange={(event) => setValue(event.currentTarget.value! as string)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default CityForm;
