import React from "react";

type IconPropsType = {
  width?: string;
  height?: string;
  fill?: string;
  onClick?: any;
  className?: string;
};

const IconTemplate = ({
  width = "24",
  height = "24",
  fill = "white",
  onClick,
  className,
  children,
}: IconPropsType & { children: React.ReactNode }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill={fill}
      onClick={onClick}
      className={className}
    >
      {children}
    </svg>
  );
};

export const CloseIcon = ({ ...props }: IconPropsType) => {
  return (
    <IconTemplate {...props}>
      <path d="M12.649,12L21.886,.818c.176-.213,.146-.528-.067-.704-.211-.176-.526-.147-.704,.067L12,11.215,2.886,.182c-.178-.215-.493-.243-.704-.067-.213,.176-.243,.491-.067,.704L11.351,12,2.114,23.182c-.176,.213-.146,.528,.067,.704,.212,.175,.527,.147,.704-.067L12,12.785l9.114,11.033c.177,.214,.493,.242,.704,.067,.213-.176,.243-.491,.067-.704L12.649,12Z" />
    </IconTemplate>
  );
};

export const LeftIcon = ({ ...props }: IconPropsType) => {
  return (
    <IconTemplate {...props}>
      <path d="M17.921,1.505a1.5,1.5,0,0,1-.44,1.06L9.809,10.237a2.5,2.5,0,0,0,0,3.536l7.662,7.662a1.5,1.5,0,0,1-2.121,2.121L7.688,15.9a5.506,5.506,0,0,1,0-7.779L15.36.444a1.5,1.5,0,0,1,2.561,1.061Z" />
    </IconTemplate>
  );
};

export const RightIcon = ({ ...props }: IconPropsType) => {
  return (
    <IconTemplate {...props}>
      <path d="M6.079,22.5a1.5,1.5,0,0,1,.44-1.06l7.672-7.672a2.5,2.5,0,0,0,0-3.536L6.529,2.565A1.5,1.5,0,0,1,8.65.444l7.662,7.661a5.506,5.506,0,0,1,0,7.779L8.64,23.556A1.5,1.5,0,0,1,6.079,22.5Z" />
    </IconTemplate>
  );
};

export const MeatballIcon = ({ ...props }: IconPropsType) => {
  return (
    <IconTemplate {...props}>
      <circle cx="2" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="22" cy="12" r="2" />
    </IconTemplate>
  );
};
