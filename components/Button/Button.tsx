import React from 'react';
import cn from 'classnames';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactElement;
  className?: string;
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
    <button
      className={cn(styles['Button'], props.className)}
      disabled={props.disabled}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
