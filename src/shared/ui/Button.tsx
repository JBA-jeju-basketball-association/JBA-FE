import React from "react";

type Props = {
  onChange?: () => void;
  children:string
};

export function Button({ onChange,children }: Props) {
  return <button  onChange={onChange} >{children}</button>;
}
