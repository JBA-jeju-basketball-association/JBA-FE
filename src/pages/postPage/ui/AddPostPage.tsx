import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/button";
import getFilesUrl, { PostFilesType } from "../api/GetFilesUrlRequest";
import { CkEditor } from "features/ckEditor";
import ForewordOptions from "../../../shared/model/forewordOptions";
import OfficialOptions from "../../../shared/model/officialOptions";
import { AddFiles } from "features/competition";
import Select, { MultiValue, SingleValue } from "react-select";
import { useMutation } from "@tanstack/react-query";
import AddPostRequest, { requestPostData } from "../api/AddPostRequest";
import { PostImgsType } from "shared/type/PostType";
import styles from "./AddPostPage.module.css";

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

export const AddPostPage = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [foreword, setForeword] = useState<
    "notice" | "hold" | "announcement" | "bidding" | "etc" | ""
  >("");
  const [OfficialState, setOfficialState] = useState<"official" | "normal">(
    "normal"
  );
  const [postImgs, setPostImgs] = useState<PostImgsType[]>([]);
  const [postFiles, setPostFiles] = useState<FileList | null>(null);
  const [newCkImgUrls, setNewCkImgUrls] = useState<string[]>([]);

  const navigate = useNavigate();
  let { category } = useParams();
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
      navigate(`/post/${category}`);
    },
    onError: (e) => console.log(e),
  });

  const addPost = (params: {
    category?: string;
    data: requestPostData;
    OfficialState: "official" | "normal";
    postFiles: FileList | null;
  }) => {
    mutation.mutate(params);
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const forewordOption = ForewordOptions.find(
      (option) => option.value === foreword
    );
      const forewordLabel = forewordOption ? forewordOption.label : '';
      const requestData: requestPostData = {
        title,
        content,
        foreword: forewordLabel,
        postImgs,
      };
      addPost({
        category,
        data: requestData,
        OfficialState,
        postFiles,
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
    //     await FetchPostCompetition(requestData, files);
    //   }
    // );
  };

  const forewordHandler = (selectedOption: SingleValue<any>): void => {
    setForeword(selectedOption.value);
  };

  const officialOptionHandler = (selectedOption: SingleValue<any>): void => {
    setOfficialState(selectedOption.value);
  };

  useEffect(() => {
    if (OfficialState === "normal") {
      setForeword("");
    } else {
      setForeword("notice");
    }
  }, [OfficialState]);

  // const handleInputChange = async (files: FileList | null) => {
  //   // 1. url 발급 및 버켓 담기
  //   const response = await getFilesUrl(files);
  //   // 2. 담기 성공하면 setPostFile로 상태 변경
  //   setPostFiles();
  // };

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
                />
                <Select
                  styles={customStyles}
                  options={ForewordOptions}
                  placeholder="머리말"
                  className={styles.select}
                  onChange={(e: SingleValue<any>) => forewordHandler(e)}
                  isDisabled={OfficialState === "official" ? false : true}
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
              <input
                type="file"
                name="uploadFile"
                id="uploadFile"
                multiple
                onChange={(e) => setPostFiles(e.target.files)}
              />
              <div className={styles.subLine}></div>
            </div>
            <div className={styles.buttonContainer}>
              <div className={styles.buttonWrapper}>
                <Button type="submit">작성 완료</Button>
                <Button
                  className={styles.buttonCancel}
                  type="button"
                  onClick={() => navigate(`/post/${category}`)}
                  // onClick={() => alert("작성이 취소되었습니다.")}
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
