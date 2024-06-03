import React from "react";

type Props = {
  onChange?: (e:any) => void;
  type?: string;

};

export function Input({ onChange, type }: Props) {
  return <input type={type} onChange={onChange}/>;
}
