import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../shared/ui/button";
import { CkEditor } from "features/ckEditor";
import OfficialOptions, {
  OfficialOptionType,
} from "../../../shared/model/officialOptions";
import Select, { SingleValue } from "react-select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NormalApi } from "../../../shared/api";
import EditPostRequest, { EditRequestPostData } from "../api/EditPostRequest";
import styles from "./UpdatePostPage.module.css";
import {
  FilesType,
  PostDetailType,
  PostImgsType,
  RemainingFilesType,
  RemainingImgsType,
} from "shared/type/PostType";
import { LoadingSpinner, PageTitle } from "shared/ui";
import axios from "axios";
import confirmAlert from "shared/lib/alert/ConfirmAlert";
import confirmDelete from "shared/lib/alert/ConfirmDelete";

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
  // 드롭 다운을 통한 공지, 일반 게시글 종류 상태관리
  const [officialState, setOfficialState] = useState<"official" | "normal">(
    isOfficialQuery === "true" ? "official" : "normal"
  );
  // 기존 내용
  const [postImgsState, setPostImgsState] = useState<PostImgsType[]>([]);
  const [remainingFilesState, setRemainingFilesState] = useState<FilesType[]>(
    []
  );
  // 수정 후 보낼 내용
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);
  const [newCkImgUrls, setNewCkImgUrls] = useState<string[]>([]);

  const navigate = useNavigate();

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
  console.log(postDetail)

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: EditPostRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postList"] });
      navigate(`/post/${category}`);
      confirmAlert("success", "수정 성공", "게시글 수정을 완료하였습니다.");
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

  const editPost = (params: {
    category?: string;
    requestData: EditRequestPostData;
    postId?: string;
    officialState: "official" | "normal";
    uploadFiles: FileList | null;
  }) => {
    mutation.mutate(params);
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const remainingFiles: RemainingFilesType[] = [];
    const postImgs: RemainingImgsType[] = [];
    remainingFilesState.map(
      (item) =>
        item.fileUrl &&
        remainingFiles.push({ fileName: item.fileName, fileUrl: item.fileUrl })
    );
    postImgsState.forEach((item) =>
      postImgs.push({ fileName: item.fileName, imgUrl: item.imgUrl })
    );
    newCkImgUrls.forEach((item) => {
      postImgs.push({fileName: item, imgUrl:item})
    })
    const requestData: EditRequestPostData = {
      title: title,
      content: content,
      remainingFiles: remainingFiles,
      postImgs: postImgs
    };
    editPost({
      category,
      requestData,
      postId,
      officialState,
      uploadFiles,
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

  // const handleForewordValue = (): forewordOptionType | undefined => {
  //   return ForewordOptions.find((option) => option.value === foreword);
  // };

  const handleOfficialValue = (): OfficialOptionType | undefined => {
    return OfficialOptions.find((option) => option.value === officialState);
  };

  const officialOptionHandler = (selectedOption: SingleValue<any>): void => {
    setOfficialState(selectedOption.value);
  };

  // const forewordHandler = (selectedOption: SingleValue<any>): void => {
  //   setForeword(selectedOption.value);
  // };

  // file preview "x"버튼 핸들 함수
  const handleDeleteButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fileNameToDelete: string
  ) => {
    // form event
    e.preventDefault();
    // 프리뷰 데이터 관리 -> 유즈 이펙트로 인한 프리뷰 업데이트
    const filteredImgs = postImgsState.filter(
      (item) => item.fileName !== fileNameToDelete
    );
    const filteredFiles = remainingFilesState.filter(
      (item) => item.fileName !== fileNameToDelete
    );
    setPostImgsState([...filteredImgs]);
    setRemainingFilesState([...filteredFiles]);

    // 추가 업로드 첨부파일 인풋 관리
    if (uploadFiles) {
      // FileList 데이터 타입을 유지하기 위해서
      const newDataTransfer = new DataTransfer();
      for (let i = 0; i < uploadFiles.length; i++) {
        if (uploadFiles[i].name !== fileNameToDelete) {
          newDataTransfer.items.add(uploadFiles[i]);
        }
      }
      setUploadFiles(newDataTransfer.files);
    }
  };

  // 첨부파일 인풋 onChange 핸들링 함수
  const handleChangeUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 데이터 변경
    setUploadFiles(e.target.files);
    // 프리뷰 변경
    if (e.target.files) {
      const Random: number = Math.floor(Math.random() * 10 + 1.6);
      for (let i = 0; i < e.target.files.length; i++) {
        const previewItem: FilesType | PostImgsType = {
          fileId: i + Random,
          fileName: e.target.files[i].name,
          fileUrl: "",
        };
        setRemainingFilesState((prev) => [...prev, previewItem]);
      }
    }
  };
  console.log(postImgsState)
  // 게시글 상세 내용 가져오기
  useEffect(() => {
    if (postDetail) {
      setTitle(postDetail.title);
      setContent(postDetail.content);
      setPostImgsState(postDetail.postImgs);
      setRemainingFilesState(postDetail.files);
      // if (isOfficialQuery === "true") {
      //   ForewordOptions.map(
      //     (option) =>
      //       option.label === postDetail.foreword && setForeword(option.value)
      //   );
      // } else {
      //   setForeword("");
      // }
    }
  }, [isOfficialQuery, postDetail]);

  // useEffect(() => {
  //   if (officialState === "normal") {
  //     setForeword("");
  //     setSearchParams({ isAnnouncement: "false" });
  //   } else {
  //     setForeword("notice");
  //     setSearchParams({ isAnnouncement: "true" });
  //   }
  // }, [officialState]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) return <div>Error: {error.message}</div>;

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
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            formSubmitHandler(e);
          }}
        >
          <div className={styles.formWrapper}>
            <div className={styles.formContent}>
              <div className={styles.inputArea}>
                <Select
                  name="official"
                  id="official"
                  styles={customStyles}
                  options={OfficialOptions}
                  placeholder="종류"
                  className={styles.select}
                  onChange={(e: SingleValue<any>) => officialOptionHandler(e)}
                  value={handleOfficialValue()}
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
              <CkEditor
                ckData={content}
                setCkData={setContent}
                setNewCkImgUrls={setNewCkImgUrls}
              />
            </div>
            <div className={styles.filesWrapper}>
              <div className={styles.subLine}></div>
              <div className={styles.inputWrapper}>
                <input
                  type="file"
                  name="uploadFile"
                  className={styles.uploadFile}
                  id="uploadFile"
                  multiple
                  onChange={(e) => handleChangeUploadFile(e)}
                />
                <div className={styles.fileBundleWrapper}>
                  {remainingFilesState.map((file) => (
                    <div key={file.fileId} className={styles.fileItemWrapper}>
                      <span className={styles.fileItemText}>
                        {file.fileName}
                      </span>
                      <button
                        onClick={(e) =>
                          handleDeleteButtonClick(e, file.fileName)
                        }
                        className={styles.deleteButton}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.subLine}></div>
            </div>
            <div className={styles.buttonContainer}>
              <div className={styles.buttonWrapper}>
                <Button type="submit">수정하기</Button>
                <Button
                  className={styles.buttonCancel}
                  type="button"
                  onClick={() => {
                    confirmDelete(
                      "수정",
                      () => navigate(`/post/${category}`),
                      "question",
                      "수정을 취소하시겠습니까?",
                      "취소하기 버튼을 누르면 작업을 종료합니다."
                    );
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
