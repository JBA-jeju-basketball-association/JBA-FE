import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/button";
import { CkEditor } from "features/ckEditor";
import OfficialOptions from "../../../shared/model/officialOptions";
import Select, { SingleValue } from "react-select";
import { useMutation } from "@tanstack/react-query";
import AddPostRequest, { requestPostData } from "../api/AddPostRequest";
import { PostImgsType } from "shared/type/PostType";
import styles from "./AddPostPage.module.css";
import { PageTitle } from "../../../shared/ui";
import axios from "axios";
import confirmAlert from "shared/lib/alert/ConfirmAlert";

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
  const [OfficialState, setOfficialState] = useState<"official" | "normal">(
    "normal"
  );
  const [postImgs, setPostImgs] = useState<PostImgsType[]>([]);
  const [postFiles, setPostFiles] = useState<FileList | null>(null);
  const [newCkImgUrls, setNewCkImgUrls] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string[]>([]);

  const navigate = useNavigate();
  let { category } = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const detailTitle =
    category === "notice"
      ? "공지사항"
      : category === "news"
        ? "NEWS"
        : "자료실";

  const mutation = useMutation({
    mutationFn: AddPostRequest,
    onSuccess: () => {
      navigate(`/post/${category}`);
      confirmAlert(
        "success",
        "작성 완료",
        "게시글 작성을 성공적으로 완료하였습니다."
      );
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 409) {
          confirmAlert("warning", "중복된 게시글 제목입니다.");
        }
        if (e.response?.status === 403) {
          confirmAlert("warning", "게시글 작성 권한이 없습니다.");
        }
        if (e.response?.status === 400) {
          confirmAlert("warning", "게시글 제목 또는 내용을 입력해주세요.");
        }
        if (e.response?.status === 404) {
          confirmAlert("warning", "존재하지 않는 작성자입니다.");
        }
      }
    },
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
    const ckImgs:{fileName:string, fileUrl:string}[] = newCkImgUrls.map((item) => {
      return {
        fileName: item,
        fileUrl: item
      }
    })
    const requestData: requestPostData = {
      title:title,
      content:content,
      postImgs: ckImgs,
    };
    addPost({
      category,
      data: requestData,
      OfficialState,
      postFiles,
    });

  };


  const officialOptionHandler = (selectedOption: SingleValue<any>): void => {
    setOfficialState(selectedOption.value);
  };


  useEffect(() => {
    if (inputRef.current?.files) {
      const files = inputRef.current?.files;
      for (let i = 0; i < files.length; i++) {
        setFileName((prev) => [...prev, files[i].name]);
      }
    }
  }, [postFiles]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.categoryArea}>
          <PageTitle pageName={detailTitle} />
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
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                  type={"text"}
                  className={styles.titleInput}
                  placeholder="제목을 입력해주세요"
                />
              </div>
              <CkEditor
                ckData={content}
                setCkData={setContent}
                setNewCkImgUrls={setNewCkImgUrls}
              />
            </div>
            <div className={styles.filesWrapper}>
              <div className={styles.subLine}></div>
              <div className={styles.uploadFileWrapper}>
                <span className={styles.uploadFileTitle}>첨부파일</span>
                <div className={styles.uploadFileBundle}>
                  {!!fileName.length ? (
                    fileName.map((item, i) => (
                      <div className={styles.uploadFileItem} key={i}>
                        {item}
                      </div>
                    ))
                  ) : (
                    <input
                      ref={inputRef}
                      className={styles.uploadFile}
                      type="file"
                      name="uploadFile"
                      id="uploadFile"
                      multiple
                      onChange={(e) => setPostFiles(e.target.files)}
                    />
                  )}
                </div>
              </div>
              <div className={styles.subLine}></div>
            </div>
            <div className={styles.buttonContainer}>
              <div className={styles.buttonWrapper}>
                <Button type="submit">작성 완료</Button>
                <Button
                  className={styles.buttonCancel}
                  type="button"
                  onClick={() => navigate(`/post/${category}`)}
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
