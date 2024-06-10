import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CompetitionCard } from "./CompetitionCard";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import FetchMainCompetitionList from "../api/FetchMainCompetitionList";
import { getMainCompetition } from "../../../shared/type/MainType";

export const CompetitionCarousel = () => {
  const { data } = useQuery({
    queryKey: ["mainCompetitionList"],
    queryFn: () => FetchMainCompetitionList(),
    select: (result) => result?.data.data,
  });
  console.log(data);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    appendDots: (dots: any) => (
      <div
        style={{
          width: "100%",
          position: "absolute",
          bottom: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: "dots_custom",
  };
  return (
    <SliderContainer>
      <Slider {...settings}>
        {data?.map((item: getMainCompetition, index: number) => {
          return <CompetitionCard data={item} key={index} />;
        })}
      </Slider>
    </SliderContainer>
  );
};

const CustomPrevArrow = ({ onClick, style }: any) => {
  return (
    <button
      onClick={onClick}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        top: "46%",
        left: "-45px",
      }}
    >
      <IoIosArrowBack size={40} color={"#D4C39C"} />
    </button>
  );
};

const CustomNextArrow = ({ onClick, style }: any) => {
  return (
    <button
      onClick={onClick}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        top: "46%",
        right: "-35px",
      }}
    >
      <IoIosArrowForward size={40} color={"#D4C39C"} />
    </button>
  );
};

const SliderContainer = styled.div`
  width: 1320px;
  height: 400px;
  .dots_custom {
    position: absolute;
    top: 450px;
    vertical-align: middle;
    margin: auto 0;
    padding: 0;
  }

  .dots_custom li {
    list-style: none;
    cursor: pointer;
    display: inline-block;
    margin: 0 10px;
    padding: 0;
  }

  .dots_custom li button {
    border: 2px solid #d4c39c;
    color: transparent;
    cursor: pointer;
    display: block;
    height: 12px;
    width: 12px;
    border-radius: 100%;
    padding: 0;
  }

  .dots_custom li.slick-active button {
    background-color: #d4c39c;
  }
`;
