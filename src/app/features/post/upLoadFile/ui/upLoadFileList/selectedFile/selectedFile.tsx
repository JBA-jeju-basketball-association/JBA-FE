import React from "react";
import { Button } from "../../../../../../../shared/ui/Button";

type Props = {
  onChange?: () => void;
};

export function div({ onChange }: Props) {
  return;
  <div>
    <Button onChange={onChange}></Button>
  </div>;
}
