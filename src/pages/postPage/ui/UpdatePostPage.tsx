import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/button";
import { CkEditor } from "features/ckEditor";
import ForewordOptions from "../../../shared/model/forewordOptions";
import { AddFiles } from "features/competition";
import Select, { MultiValue, SingleValue } from "react-select";
import { useMutation } from "@tanstack/react-query";
import AddPostRequest, {
  PostImgsType,
  requestPostData,
} from "../api/AddPostRequest";
import styles from "./UpdatePostPage.module.css";

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
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [foreword, setForeword] = useState<string>("");
  const [postImgs, setPostImgs] = useState<PostImgsType[]>([]);
  const [postFiles, setPostFiles] = useState<PostFilesType[]>([]);
  const [newCkImgUrls, setNewCkImgUrls] = useState<string[]>([]);

  const navigate = useNavigate();
  let { category } = useParams();
  category = category as string;
  const detailTitle =
    category === "notice"
      ? "공지사항"
      : category === "news"
        ? "NEWS"
        : "자료실";

  const mutation = useMutation({
    mutationFn: AddPostRequest,
    onSuccess: () => {
      alert("작성이 완료되었습니다.");
      navigate(`/post/${category}`)
    },
    onError: (e) => console.log(e),
  });

  const addPost = (params: { category?: string; data: requestPostData }) => {
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

    addPost({
      category,
      data: requestData,
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
                  options={ForewordOptions}
                  placeholder="머리말"
                  className={styles.select}
                  onChange={(e: SingleValue<any>) => forewordHandler(e)}
                />
                <input
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
                <Button type="submit">작성 완료</Button>
                <Button
                  className={styles.buttonCancel}
                  type="button"
                  // onClick={() => navigate(`/post/${category}`)}
                  onClick={() => alert("작성이 취소되었습니다.")}
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
