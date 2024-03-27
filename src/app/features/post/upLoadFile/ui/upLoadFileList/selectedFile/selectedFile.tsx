import React from "react";
import styles from "../selectedFile/SelectedFile.module.css"

type Props = {
  onClick?: () => void;
  children:string;
  filename:string;
};

export function SelectedFile({ onClick,children ,filename}: Props) {
  return(
  <div className={styles.SelectedFile}>
    <span>{filename}</span>
    <button onClick={onClick}>{children}</button>
  </div>)
}
