import React from "react";
import { Button } from "../../../../../../../shared/ui/Button";
import styles from "../selectedFile/SelectedFile.module.css"

type Props = {
  onChange?: () => void;
  children:string;
  name:string;
};

export function SelectedFile({ onChange,children ,name}: Props) {
  return(
  <div className={styles.SelectedFile}>
    <span>{name}</span>
    <Button onChange={onChange}>{children}</Button>
  </div>)
}
