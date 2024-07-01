import React from "react";
import { GalleryCard } from "shared/ui";
import styles from "./GalleryCardList.module.css";
import { GalleryCardType, GalleryCardListType } from "shared/type/GalleryType";
import {ListErrorRow} from "../../../shared/ui/listErrorRow/ListErrorRow";

export const GalleryCardList = ({ galleries }: GalleryCardListType) => {
  return (
      <div className={styles.container}>
        {
          galleries.length === 0 ?
              <ListErrorRow content={"게시물이 없습니다."}/>
              :
              galleries.map((gallery: GalleryCardType) => (
                  <GalleryCard key={gallery.galleryId} {...gallery} />
              ))
        }
      </div>
  );
};
