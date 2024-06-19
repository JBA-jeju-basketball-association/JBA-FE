import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./CommonSlide.module.css";

type CommonSlideProps = {
  children: React.ReactNode;
  settings: any;
};
export const CommonSlide = ({ children, settings }: CommonSlideProps) => {
  return (
    <div>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};
