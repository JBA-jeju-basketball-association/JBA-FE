import React from "react";
import styles from "./Button.module.css";

type Props = {
  onClick?: () => void;
  children?: string;
  [property: string]: any;
};

const Button = ({ onClick, children, ...rest }: Props) => {
  return (
    <button className={styles.button} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
