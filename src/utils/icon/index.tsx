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
      <path d="M19,2H5C2.243,2,0,4.243,0,7v10c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V7c0-2.757-2.243-5-5-5Zm3,15c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V7c0-1.654,1.346-3,3-3h14c1.654,0,3,1.346,3,3v10Zm-5.793-7.793l-2.793,2.793,2.793,2.793c.391,.391,.391,1.023,0,1.414-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293l-2.793-2.793-2.793,2.793c-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l2.793-2.793-2.793-2.793c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l2.793,2.793,2.793-2.793c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414Z" />
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
