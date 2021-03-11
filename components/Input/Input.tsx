import styles from './Input.module.css';
import cn from 'classnames';

interface InputProps {
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  value?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input(props: InputProps) {
  return (
    <div>
      <input
        className={cn(styles['Input__element'], props.className)}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      {props.errorText && <div className={styles['Input__error-text']}>{props.errorText}</div>}
      {props.helperText && <div className={styles['Input__helper-text']}>{props.helperText}</div>}
    </div>
  );
}

export default Input;
