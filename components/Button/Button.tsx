import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: string;
  disabled?: boolean;
  onClick?: Function;
}

function Button(props: ButtonProps) {
  function handleClick(_event: React.MouseEvent<HTMLButtonElement>) {
    if (props.onClick) {
      props.onClick();
    }
  }

  return (
    <button className={styles['Button']} disabled={props.disabled} onClick={handleClick}>
      {props.children}
    </button>
  );
}

export default Button;
