import React, { useEffect } from "react";
import GalleryCard from "shared/ui/galleryCard";
import { Api } from "../../../shared/api/Api";
import axios from "axios";
import { useState } from "react";
import styles from "./galleryCardList.module.css";

type GalleryCardType = {
  galleryId: number;
  title: string;
  fileName: string;
  imgUrl: string;
};

const GalleryCardList = () => {
  const [galleries, setGalleries] = useState<GalleryCardType[]>([]);
  const fetchGalleryImage = async () => {
    try {
      const res = await axios.get(
        "http://ec2-43-200-4-149.ap-northeast-2.compute.amazonaws.com:8080/v1/api/gallery?page=0&size=6&official=true"
      );
      setGalleries(res.data.data.galleries);
    } catch (error) {
      console.error("갤러리 이미지를 가져오는 중 오류 발생:", error);
    }
  };
  console.log(galleries);

  useEffect(() => {
    fetchGalleryImage();
  }, []);

  return (
    <div className={styles.container}>
      {galleries.map((card) => (
        <GalleryCard
          key={card.galleryId}
          title={card.title}
          imgUrl={card.imgUrl}
        />
      ))}
    </div>
  );
};

export default GalleryCardList;
