import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NormalApi } from "../../../shared/api/NormalApi";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/button";
import { useUserStore } from "../../../shared/model";
import { JwtDecoder } from "../../../shared/lib";
import { PostImgsType, FilesType } from "shared/type/PostType";
import styles from "./PostDetailPage.module.css";
import { DeletePost } from "../api/DeletePost";
import { LoadingSpinner, PageTitle } from "shared/ui";
import axios from "axios";
import confirmAlert from "shared/lib/alert/ConfirmAlert";
import confirmDelete from "shared/lib/alert/ConfirmDelete";

export const PostDetailPage = () => {
  let { postId, category } = useParams();
  const navigate = useNavigate();
  const { AccessToken } = useUserStore();
  const [filesState, setFilesState] = useState<FilesType[]>([]);
  const [postImgsState, setPostImgsState] = useState<PostImgsType[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);
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
      navigate(`/post/${category}`);
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 403) {
          confirmAlert("warning", "권한이 없습니다.");
        }
        if (e.response?.status === 404) {
          confirmAlert("warning", "존재하지 않는 게시글입니다.");
        }
      }
    },
  });

  const deletePost = () => {
    mutation.mutate({ postId });
  };

  // function extractOembedUrls() {
  //   // 모든 <oembed> 요소를 선택합니다.
  //   const oembedElements = document.querySelectorAll("oembed");

  //   // 결과를 담을 배열을 초기화합니다.
  //   const urls: string[] = [];

  //   // 각 <oembed> 요소에 대해 반복합니다.
  //   oembedElements.forEach((element) => {
  //     // url 속성 값을 추출합니다.
  //     const url = element.getAttribute("url");

  //     // 추출된 URL 값을 배열에 추가합니다.
  //     if (url) {
  //       urls.push(url);
  //     }
  //   });

  //   // 추출된 모든 URL을 반환합니다.
  //   return urls;
  // }

  // function getId(url: string) {
  //   // 추출한 url의 embed id를 생성합니다.
  //   if (url) {
  //     var regExp =
  //       /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  //     var match = url.match(regExp);
  //     if (match && match[2].length == 11) {
  //       return match[2];
  //     } else {
  //       return "error";
  //     }
  //   }
  // }

  // const url = extractOembedUrls();
  // var videoId = getId(url[0]);
  // const iframeMarkup =
  //   '<iframe class=' + styles.iframe + ' src="//www.youtube.com/embed/' +
  //   videoId +
  //   '" frameborder="0" allowfullscreen></iframe>';

  useEffect(() => {
    if (postDetail) {
      const { postImgs, files } = postDetail;
      setPostImgsState(postImgs);
      setFilesState(files);
    }
  }, [postDetail]);

  useEffect(() => {
    if (postImgsState) {
      postImgsState.map((img: PostImgsType) => fileList.push(img));
    }
    if (filesState) {
      filesState.map((file: FilesType) => fileList.push(file));
    }
    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        if (!!fileList[i]) {
          fetch(fileList[i].fileUrl)
            .then((res) => res.blob())
            .then((blob) => {
              const url = window.URL.createObjectURL(blob);
              setDownloadUrl((prev) => [...prev, url]);
            })
            .catch((err) => console.error("Failed to fetch image:", err));
        }
      }
    }
  }, [postImgsState, filesState, fileList]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <span>Error</span>;
  }

  const { title, writer, createAt, viewCount, content, isAnnouncement } =
    postDetail;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.categoryArea}>
          <PageTitle pageName={detailTitle} />
        </div>
        <ul className={styles.titleArea}>
          {AccessToken && JwtDecoder(AccessToken).role === "ROLE_MASTER" ? (
            <div className={styles.adminWrapper}>
              <span
                className={styles.adminEdit}
                onClick={() =>
                  navigate(
                    `/post/${category}/${postId}/update?isAnnouncement=${isAnnouncement}`
                  )
                }
              >
                수정하기
              </span>
              <span
                className={styles.adminDelete}
                onClick={() => {
                  confirmDelete(
                    "삭제",
                    deletePost,
                    "question",
                    "정말 삭제하시겠습니까?",
                    "게시글을 삭제하면 복원할 수 없습니다."
                  );
                }}
              >
                삭제하기
              </span>
            </div>
          ) : null}
          <li className={styles.title}>
            <span className={styles.titleContent}>{title}</span>
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
        {/* ------ 에디터 콘텐츠 화면 ------ */}
        <div
          id="editor-content"
          className={"ck-content " + styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className={styles.filesWrapper}>
          <div className={styles.filesContainer}>
            <div className={styles.filesContainerTitle}>
              <span>첨부파일</span>
            </div>
            <div className={styles.downloadUrlWrapper}>
              {downloadUrl.map((item, i) => (
                <a
                  key={i}
                  href={item}
                  download={fileList[i]?.fileName || `다운로드${i + 1}`}
                  className={styles.fileDownloadItem}
                >
                  {fileList[i]?.fileName || `첨부파일 ${i + 1}`}
                </a>
              ))}
              {!!downloadUrl.length || (
                <span className={styles.fileNull}>첨부파일 없음</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Button onClick={() => navigate(`/post/${category}`)}>목록</Button>
      </div>
    </div>
  );
};
