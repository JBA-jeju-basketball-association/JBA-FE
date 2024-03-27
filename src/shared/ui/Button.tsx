import React from "react";

type Props = {
  onClick?: () => void;
  children?:string
};

export function Button({ onClick,children }: Props) {
  return <button  onClick={onClick} >{children}</button>;
}
