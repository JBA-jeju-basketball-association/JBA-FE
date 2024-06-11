import React from "react";
import { CommonModal } from "shared/ui";
import styles from "./GalleryDetailModal.module.css";
import { CloseIcon, RightIcon, LeftIcon } from "utils/icon";
import { GalleryDetailProps } from "shared/type/GalleryType";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

type GalleryDetailModalProps = {
  modalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  galleryDetail: GalleryDetailProps | undefined;
};

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.8)",
    width: "100%",
    height: "100vh",
    zIndex: "101",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "60%",
    height: "80%",
    zIndex: "102",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0, 0, 0, 0)",
    border: "none",
  },
};

const SlideContainer = styled.div`
  width: 100%;
  overflow: hidden;

  .slick-slide {
    height: 680px;
  }

  .dots_custom {
    width: 100%;
    position: absolute;
    bottom: 0px;
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .dots_custom li {
    cursor: pointer;
    width: 190px;
    height: 140px;
  }

  .dots_custom li img {
    width: 100%;
    height: 100%;
  }

  .dots_custom li.slick-active {
    border: 4px solid var(--primary-color);
  }
  
  .slick-next {
    width: 40px;
    height: 40px;
    position: absolute;
    right: 0;
    top:40%
  }
    .slick-prev {
    width: 40px;
    height: 40px;
     position: absolute;
    left: 0;
    top:40%
    },
`;

export const GalleryDetailModal = ({
  modalOpen,
  setModalOpen,
  galleryDetail,
}: GalleryDetailModalProps) => {
  const { title, files } = galleryDetail ?? { title: "", files: [] };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <RightIcon />,
    prevArrow: <LeftIcon />,
    customPaging: (i: number) => (
      <img
        src={files[i].fileUrl}
        alt="도트 이미지"
        className={styles.dotImage}
      />
    ),
    appendDots: (dots: React.ReactNode) => (
      <ul className={styles.dotsCustom}>{dots}</ul>
    ),
    dotsClass: `dots_custom`,
  };

  return (
    <CommonModal
      isopen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      style={customModalStyles}
    >
      <div className={styles.container}>
        <h1>{title}</h1>
        <CloseIcon
          width="30"
          height="30"
          onClick={() => setModalOpen(false)}
          className={styles.closeIcon}
        />
        <SlideContainer>
          <Slider {...settings}>
            {files.map((file, index) => (
              <div className={styles.detailImageImgWrapper}>
                <img
                  className={styles.detailImage}
                  src={file.fileUrl}
                  key={index}
                  alt="갤러리 이미지"
                />
              </div>
            ))}
          </Slider>
        </SlideContainer>
      </div>
    </CommonModal>
  );
};
