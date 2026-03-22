import type { FC, InputHTMLAttributes } from 'react';
import styles from "./Form.module.scss";


interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name?: string;
  value?: string | number;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
}

const InputField: FC<InputFieldProps> = ({ label, name, value, placeholder, onChange, type = 'text', autoComplete }) => {
  return (
    <div className={styles["form"]}>
      {label && <label className={styles["form-label"]} htmlFor={name}>{label}</label>}
      <input
        id={name}
        className={styles["form-input"]}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default InputField; 