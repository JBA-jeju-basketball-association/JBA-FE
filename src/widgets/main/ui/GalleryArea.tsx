import React from 'react';
import style from "./GalleryArea.module.css"
import {GalleryCardContent, MainTitle, NavigateAllItemBtn} from "../../../shared/ui";
import {useQuery} from "@tanstack/react-query";
import FetchMainGalleryList from "../api/FetchMainGalleryList";
import {useGalleryModalStore} from "../../../shared/model";
import {useNavigate} from "react-router-dom";

export const GalleryArea = () => {
    const navigate = useNavigate();
    const {data} = useQuery({
        queryKey: ["getMainGalleryList"],
        queryFn: () => FetchMainGalleryList(),
        select: (result) => result?.data.data
    })
    console.log(data)

    const {forceModalOpen, setForceModalOpen, galleryIdFromMain, setGalleryIdFromMain}:any = useGalleryModalStore(state => state)
    const navigateDetail = (id:number) => {
        setForceModalOpen(true);
        setGalleryIdFromMain(id)
        navigate("/gallery")
    }

    console.log(forceModalOpen, galleryIdFromMain)

    return (
        <div className={style.GalleryArea}>
            <MainTitle title={"갤러리"} color={"white"} />
            <div className={style.titleBar} ></div>
            <div className={style.navigateBtnArea}>
                <NavigateAllItemBtn path={"/gallery"} color={"#4B4B4B"} />
            </div>
            <div className={style.pictureArea}>
                <div className={style.leftArea}>
                    <GalleryCardContent title={data?.galleries[0].title} date={data?.galleries[0].createAt}/>
                    <img src={data?.galleries[0].imgUrl} alt={"main-gallery1"} onClick={() => navigateDetail(data?.galleries[0].galleryId)}/>
                </div>
                <div className={style.rightArea}>
                    <div className={style.rightAreaColumn}>
                        <div className={style.rightImgBox}>
                            <GalleryCardContent title={data?.galleries[1].title} date={data?.galleries[1].createAt}/>
                            <img src={data?.galleries[1].imgUrl} alt={"main-gallery2"} onClick={() => navigateDetail(data?.galleries[1].galleryId)}/>
                        </div>
                        <div className={style.rightImgBox}>
                            <GalleryCardContent title={data?.galleries[2].title} date={data?.galleries[2].createAt}/>
                            <img src={data?.galleries[2].imgUrl} alt={"main-gallery3"} onClick={() => navigateDetail(data?.galleries[2].galleryId)}/>
                        </div>
                    </div>
                    <div className={style.rightAreaColumn}>
                        <div className={style.rightImgBox}>
                            <GalleryCardContent title={data?.galleries[3].title} date={data?.galleries[3].createAt}/>
                            <img src={data?.galleries[3].imgUrl} alt={"main-gallery4"} onClick={() => navigateDetail(data?.galleries[3].galleryId)}/>
                        </div>
                        <div className={style.rightImgBox}>
                            <GalleryCardContent title={data?.galleries[4].title} date={data?.galleries[4].createAt}/>
                            <img src={data?.galleries[4].imgUrl} alt={"main-gallery5"} onClick={() => navigateDetail(data?.galleries[4].galleryId)}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
