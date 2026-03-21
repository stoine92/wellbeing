import type { FC, SelectHTMLAttributes } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from './Form.module.scss';

interface Option {
  code: string;
  description: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name?: string;
  placeholder?: string;
  options: Option[];
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: FC<SelectFieldProps> = ({ label, name, placeholder, options, value, onChange }) => {

    
  return (
    <div className={styles["form"]}>
      {label && (
        <label className={styles["form-label"]} htmlFor={name}>
          {label}
        </label>
      )}

      <div className={styles["form_wrapper"]}>
        <select
          id={name}
          className={styles["form-select"]}
          name={name}
          value={value}
          onChange={onChange}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.description}
            </option>
          ))}
        </select>
        <span className={styles["form-icon"]}>
          <KeyboardArrowDownIcon fontSize="inherit" />
        </span>
      </div>
    </div>
  );
};

export default SelectField;
