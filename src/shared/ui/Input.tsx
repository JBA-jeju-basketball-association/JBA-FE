import React from "react";

type Props = {
  onChange?: () => void;
  type?: string;
};

export function Input({ onChange, type }: Props) {
  return <input type={type} onChange={onChange} />;
}
