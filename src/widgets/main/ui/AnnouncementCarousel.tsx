import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {AnnouncementCard} from "./AnnouncementCard";
import {useQuery} from "@tanstack/react-query";
import FetchMainAnnouncementList from "../api/FetchMainAnnouncementList";
import {getMainAnnouncement} from "../../../shared/type/MainType";

export const AnnouncementCarousel = () => {
    const {data} = useQuery({
        queryKey: ["getMainPostList"],
        queryFn: () => FetchMainAnnouncementList(),
        select: (result) => result?.data.data.posts,
    })
    let postData:getMainAnnouncement[] = data?.slice(0,27);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        rows: 3,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        appendDots: (dots: any) => (
            <div
                style={{
                    width: '100%',
                    position: 'absolute',
                    bottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <ul> {dots} </ul>
            </div>
        ),
        dotsClass: 'dots_custom'
    };
    return (
        <SliderContainer>
            <StyledSlider {...settings}>
                {postData?.map((item: getMainAnnouncement, index: number) => {
                    return (
                        <div key={index} className="slide">
                            <AnnouncementCard data={item}/>
                        </div>
                    );
                })}
            </StyledSlider>
        </SliderContainer>
    );
};

const CustomPrevArrow = ({onClick, style}:any) => {
    return (
        <button onClick={onClick} style={{...style, display: "block", position:"absolute", top:"46%", left:"-45px"}}>
            <IoIosArrowBack size={40} color={"#FFFFFF"} />
        </button>
    );
};

const CustomNextArrow = ({onClick, style}:any) => {
    return (
        <button onClick={onClick} style={{...style, display: "block", position:"absolute", top:"46%", right:"-35px"}}>
            <IoIosArrowForward size={40} color={"#FFFFFF"} />
        </button>
    );
};

const SliderContainer = styled.div`
    width: 1340px;
    height: 900px; /* 높이를 높여 카드 간의 간격을 반영 */
    position: relative;

    .dots_custom {
        position: absolute;
        top: 660px;
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
        border: 2px solid #FFFFFF;
        color: transparent;
        cursor: pointer;
        display: block;
        height: 12px;
        width: 12px;
        border-radius: 100%;
        padding: 0;
    }

    .dots_custom li.slick-active button {
        background-color: #FFFFFF;
    }
`;

const StyledSlider = styled(Slider)`
    .slide {
        padding: 8px 0 8px 0; /* 각 슬라이드에 패딩 추가 */
    }
`;
