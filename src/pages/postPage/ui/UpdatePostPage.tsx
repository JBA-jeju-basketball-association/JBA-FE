import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../shared/ui/button";
import { CkEditor } from "features/ckEditor";
import ForewordOptions from "../../../shared/model/forewordOptions";
import OfficialOptions from "../../../shared/model/officialOptions";
import { AddFiles } from "features/competition";
import Select, { MultiValue, SingleValue } from "react-select";
import { useQuery, useMutation } from "@tanstack/react-query";
import { NormalApi } from "../../../shared/api/NormalApi";
import { requestPostData } from "../api/AddPostRequest";
import EditPostRequest from "../api/EditPostRequest";
import parse from "html-react-parser";
import styles from "./UpdatePostPage.module.css";
import { PostDetailType, PostImgsType } from "shared/type/PostType";

interface PostFilesType {
  fileName: string;
  fileUrl: string;
}

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    height: "48px",
    borderRadius: "8px",
    cursor: "pointer",
  }),
  option: (provided: any, state: { isSelected: any }) => ({
    ...provided,
    cursor: "pointer",
  }),
};

export const UpdatePostPage = () => {
  let { category, postId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  let isOfficialQuery = searchParams.get("isAnnouncement");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [foreword, setForeword] = useState<string>("");
  const [isOfficial, setIsOfficial] = useState<string>(
    isOfficialQuery === "true" ? "공지사항" : "일반"
  );
  const [postImgs, setPostImgs] = useState<PostImgsType[]>([]);
  const [postFiles, setPostFiles] = useState<PostFilesType[]>([]);
  const [newCkImgUrls, setNewCkImgUrls] = useState<string[]>([]);
  const [postData, setPostData] = useState(null);

  const navigate = useNavigate();
  console.log(isOfficial, postId, category);

  const detailTitle =
    category === "notice"
      ? "공지사항"
      : category === "news"
        ? "NEWS"
        : "자료실";

  const {
    isLoading,
    isError,
    data: postDetail,
    error,
  } = useQuery<PostDetailType>({
    queryKey: ["postDeatil", category, postId],
    queryFn: () => NormalApi.get(`/v1/api/post/${category}/${postId}`),
    enabled: !!postId, // postId가 존재할 때에만 호출
    select: (result: any) => result.data.data,
  });

  const mutation = useMutation({
    mutationFn: EditPostRequest,
    onSuccess: () => {
      alert("수정이 완료되었습니다.");
      navigate(`/post/${category}`);
    },
    onError: (e) => console.log(e),
  });

  const editPost = (params: {
    category?: string;
    data: requestPostData;
    postId?: string;
    isOfficial?: string;
  }) => {
    mutation.mutate(params);
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requestData: requestPostData = {
      title: title,
      content: content,
      foreword: foreword,
      postImgs: postImgs,
    };

    editPost({
      category,
      data: requestData,
      postId,
      isOfficial,
    });

    // for (let i: number = 0; i < newCkImgUrls.length; i++) {
    //   if (content.includes(newCkImgUrls[i])) {
    //     requestData.postImgs.push(newCkImgUrls[i]);
    //   }
    // }

    // confirmAndCancelAlertWithLoading(
    //   "question",
    //   "대회를 등록하시겠습니까?",
    //   "",
    //   async () => {
    //     await FetchAddCompetition(requestData, files);
    //   }
    // );
  };

  const forewordHandler = (selectedOption: SingleValue<any>): void => {
    setForeword(selectedOption.label);
  };

  const officialOptionHandler = (selectedOption: SingleValue<any>): void => {
    setIsOfficial(selectedOption.label);
    if (selectedOption.label === "일반") {
      setForeword("");
    }
  };

  useEffect(() => {
    if (postDetail) {
      setTitle(postDetail.title);
      setContent(postDetail.content);
      setPostImgs(postDetail.postImgs);
      if (isOfficialQuery === "true") {
        setForeword(postDetail.foreword);
      } else {
        setForeword("");
      }
    }
  }, [postDetail]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.categoryArea}>
          <span className={styles.category}>{detailTitle}</span>
        </div>
        <div className={styles.divideLine}></div>
        <div className={styles.subLine}></div>
        <form
          className={styles.formContainer}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            formSubmitHandler(e)
          }
        >
          <div className={styles.formWrapper}>
            <div className={styles.formContent}>
              <div className={styles.inputArea}>
                <Select
                  styles={customStyles}
                  options={OfficialOptions}
                  placeholder="종류"
                  className={styles.select}
                  onChange={(e: SingleValue<any>) => officialOptionHandler(e)}
                  value={{
                    label: `${isOfficial}`,
                    value: "initialValue",
                  }}
                />
                <Select
                  styles={customStyles}
                  options={ForewordOptions}
                  placeholder="머리말"
                  className={styles.select}
                  onChange={(e: SingleValue<any>) => forewordHandler(e)}
                  value={{ label: `${foreword}`, value: "initailValue" }}
                  isDisabled={isOfficial === "일반" ? true : false}
                />
                <input
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                  type={"text"}
                  className={styles.titleInput}
                  placeholder="제목을 입력해주세요"
                />
              </div>
              {/* <div className={styles.inputArea2}>
            <AddCompetitionLabel label={"첨부파일"} height={"double"} />
            <AddFiles files={postFiles} setFiles={setPostFiles} />
          </div> */}
              <CkEditor
                ckData={content}
                setCkData={setContent}
                setNewCkImgUrls={setNewCkImgUrls}
              />
            </div>
            <div className={styles.filesWrapper}>
              <div className={styles.subLine}></div>
              <span className={styles.fileNull}>파일 업로드 자리</span>
              <div className={styles.subLine}></div>
            </div>
            <div className={styles.buttonContainer}>
              <div className={styles.buttonWrapper}>
                <Button type="submit">수정하기</Button>
                <Button
                  className={styles.buttonCancel}
                  type="button"
                  onClick={() => {
                    alert("작성이 취소되었습니다.");
                    navigate(`/post/${category}`);
                  }}
                >
                  취소
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
