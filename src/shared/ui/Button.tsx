import React from "react";

type Props = {
  onChange?: () => void;
};

export function Button({ onChange }: Props) {
  return <button onChange={onChange} />;
}
