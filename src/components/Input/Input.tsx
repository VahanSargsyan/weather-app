import { FC, InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<IInputProps> = ({ onChange, value }) => {
  return <input type="text" value={value} onChange={onChange} />;
};

export default Input;
