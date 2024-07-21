import React from "react";
import styles from "./GalleryUploadPage.module.css";
import { GalleryUpload } from "features/gallery";
import {PageTitle} from "../../../shared/ui";

export const GalleryUploadPage = () => {
    return (
        <div className={styles.container}>
            <PageTitle pageName={"갤러리 등록"}/>
            <GalleryUpload/>
        </div>
    );
};
