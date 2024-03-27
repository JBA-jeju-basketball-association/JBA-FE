import React from "react";
import styles from "../selectedFile/SelectedFile.module.css"

type Props = {
  onClick?: () => void;
  filename:string;
  key:number;
};

export function SelectedFile({ onClick ,filename,key}: Props) {
  return(
  <div className={styles.SelectedFile}>
    <span>{filename}</span>
    <button key={key} onClick={onClick}>x</button>
  </div>)
}
