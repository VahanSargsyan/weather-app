import { FC, InputHTMLAttributes } from "react";

import styles from "./Input.module.scss";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<IInputProps> = ({ onChange, value, placeholder }) => {
  return (
    <input
      className={styles.input}
      type="search"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
