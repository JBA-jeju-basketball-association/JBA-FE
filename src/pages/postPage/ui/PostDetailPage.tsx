import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NormalApi } from "../../../shared/api/NormalApi";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/button";
import parse from "html-react-parser";
import { useUserStore } from "../../../shared/model";
import { JwtDecoder } from "../../../shared/lib";
import { PostImgsType, FilesType } from "shared/type/PostType";
import styles from "./PostDetailPage.module.css";
import { DeletePost } from "../api/DeletePost";
import { CkEditor } from "features/ckEditor";

export const PostDetailPage = () => {
  let { postId, category } = useParams();
  const navigate = useNavigate();
  const { AccessToken } = useUserStore();

  const [filesState, setFilesState] = useState<FilesType[]>([]);
  const [postImgsState, setPostImgsState] = useState<PostImgsType[]>([]);
  const [fileList, setFileList] = useState<string[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string[]>([]);

  const typeItems = ["등록자", "등록일", "조회수"];
  category = category as string;
  const detailTitle =
    category === "notice"
      ? "공지사항"
      : category === "news"
        ? "NEWS"
        : "자료실";

  const {
    isError,
    isLoading,
    data: postDetail,
  } = useQuery({
    queryKey: ["postDeatil", category, postId],
    queryFn: () => NormalApi.get(`/v1/api/post/${category}/${postId}`),
    select: (result: any) => result.data.data,
  });

  const mutation = useMutation({
    mutationFn: DeletePost,
    onSuccess: () => {
      alert("게시글이 삭제되었습니다.");
      navigate(`/post/${category}`);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const deletePost = () => {
    mutation.mutate({ postId });
  };

  useEffect(() => {
    if (postDetail) {
      const { postImgs, files } = postDetail;
      setPostImgsState(postImgs);
      setFilesState(files);
    }
  }, [postDetail]);

  useEffect(() => {
    if (postImgsState) {
      postImgsState.map((img: PostImgsType) => {
        fileList.push(img.imgUrl);
      });
    }
    if (filesState) {
      filesState.map((file: FilesType) => {
        fileList.push(file.fileUrl);
      });
    }
    if (fileList) {
      for (let i = 0; i < fileList.length - 1; i++) {
        fetch(fileList[i])
          .then((res) => res.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            setDownloadUrl((prev) => [...prev, url]);
          })
          .catch((err) => console.error("Failed to fetch image:", err));
      }
    }
  }, [postImgsState, filesState]);

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error</span>;
  }

  const {
    foreword,
    title,
    writer,
    createAt,
    viewCount,
    content,
    isAnnouncement,
  } = postDetail;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.categoryArea}>
          <span className={styles.category}>{detailTitle}</span>
        </div>
        <div className={styles.divideLine}></div>
        <ul className={styles.titleArea}>
          <li className={styles.title}>
            <span className={styles.titleContent}>
              {!!foreword ? `[${foreword}] ` + title : title}
            </span>
          </li>
          <li className={styles.list}></li>
          {typeItems.map((item, index) => (
            <li key={index} className={styles.list}>
              {item}
            </li>
          ))}
          <li></li>
          <li className={styles.list}>{writer}</li>
          <li className={styles.list}>{createAt}</li>
          <li className={styles.list}>{viewCount}</li>
        </ul>
        <div className={styles.subLine}></div>
        <div className={styles.content}>
          {parse(content)}
        </div>
        <div className={styles.filesWrapper}>
          <div className={styles.subLine}></div>
          {downloadUrl[0] && (
            <a href={downloadUrl[0]} download className={styles.fileDownload}>
              {/* {postImgsState[0].fileName || "첨부파일 다운로드 1"} */}
              "첨부파일 다운로드 1"
            </a>
          )}
          {downloadUrl[1] && (
            <a href={downloadUrl[1]} download className={styles.fileDownload}>
              {/* {filesState[0].fileName || "첨부파일 다운로드 2"} */}
              "첨부파일 다운로드 2"
            </a>
          )}
          {!!downloadUrl.length || (
            <span className={styles.fileNull}>첨부파일 없음</span>
          )}
          <div className={styles.subLine}></div>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Button onClick={() => navigate(`/post/${category}`)}>목록</Button>

        {AccessToken && JwtDecoder(AccessToken).role === "ROLE_MASTER" ? (
          <div className={styles.buttonWrapper}>
            <Button
              className={styles.buttonEdit}
              onClick={() =>
                navigate(
                  `/post/${category}/${postId}/update?isAnnouncement=${isAnnouncement}`
                )
              }
            >
              수정하기
            </Button>
            <Button
              className={styles.buttonDelete}
              onClick={() => deletePost()}
            >
              삭제하기
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
