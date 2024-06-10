import React from 'react';
import style from "./GalleryArea.module.css"
import {GalleryCardContent, MainTitle, NavigateAllItemBtn} from "../../../shared/ui";
import {useQuery} from "@tanstack/react-query";
import FetchMainGalleryList from "../api/FetchMainGalleryList";

export const GalleryArea = () => {
    const {data} = useQuery({
        queryKey: ["getMainGalleryList"],
        queryFn: () => FetchMainGalleryList(),
        select: (result) => result?.data.data
    })
    console.log(data)


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
                    <img src={data?.galleries[0].imgUrl} alt={"main-gallery1"}/>
                </div>
                <div className={style.rightArea}>
                    <div className={style.rightAreaColumn}>
                        <div className={style.rightImgBox}>
                            <GalleryCardContent title={data?.galleries[1].title} date={data?.galleries[1].createAt}/>
                            <img src={data?.galleries[1].imgUrl} alt={"main-gallery2"}/>
                        </div>
                        <div className={style.rightImgBox}>
                            <GalleryCardContent title={data?.galleries[2].title} date={data?.galleries[2].createAt}/>
                            <img src={data?.galleries[2].imgUrl} alt={"main-gallery3"}/>
                        </div>
                    </div>
                    <div className={style.rightAreaColumn}>
                        <div className={style.rightImgBox}>
                            <GalleryCardContent title={data?.galleries[3].title} date={data?.galleries[3].createAt}/>
                            <img src={data?.galleries[3].imgUrl} alt={"main-gallery4"}/>
                        </div>
                        <div className={style.rightImgBox}>
                            <GalleryCardContent title={data?.galleries[4].title} date={data?.galleries[4].createAt}/>
                            <img src={data?.galleries[4].imgUrl} alt={"main-gallery5"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
