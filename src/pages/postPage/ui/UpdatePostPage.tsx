import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../shared/ui/button";
import { CkEditor } from "features/ckEditor";
import ForewordOptions, {
  forewordOptionType,
} from "../../../shared/model/forewordOptions";
import OfficialOptions, {
  OfficialOptionType,
} from "../../../shared/model/officialOptions";
import { AddFiles } from "features/competition";
import Select, { MultiValue, SingleValue } from "react-select";
import { useQuery, useMutation } from "@tanstack/react-query";
import { NormalApi } from "../../../shared/api/NormalApi";
import EditPostRequest, { EditRequestPostData } from "../api/EditPostRequest";
import styles from "./UpdatePostPage.module.css";
import { FilesType, PostDetailType, PostImgsType } from "shared/type/PostType";

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
  // 드롭다운을 통한 머리말 상태관리
  const [foreword, setForeword] = useState<
    "notice" | "hold" | "announcement" | "bidding" | "etc" | ""
  >("");
  // 드롭 다운을 통한 공지, 일반 게시글 종류 상태관리
  const [officialState, setOfficialState] = useState<"official" | "normal">(
    isOfficialQuery === "true" ? "official" : "normal"
  );
  // 기존 내용
  const [postImgs, setPostImgs] = useState<PostImgsType[]>([]);
  const [postFiles, setPostFiles] = useState<FilesType[]>([]);
  const [filePreview, setFilePreview] = useState<(FilesType | PostImgsType)[]>(
    []
  );

  // 수정 후 보낼 내용
  const [remainingFiles, setRemainingFiles] = useState<FileList | null>(null);
  const [newCkImgUrls, setNewCkImgUrls] = useState<string[]>([]);
  const [postData, setPostData] = useState(null);

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
    requestData: EditRequestPostData;
    postId?: string;
    officialState: "official" | "normal";
    remainingFiles: FileList | null;
  }) => {
    mutation.mutate(params);
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const forewordOption = ForewordOptions.find(
      (option) => option.value === foreword
    );
    const forewordLabel = forewordOption ? forewordOption.label : "";
    const requestData: EditRequestPostData = {
      title,
      content,
      foreword: forewordLabel,
      postImgs,
    };
    editPost({
      category,
      requestData,
      postId,
      officialState,
      remainingFiles,
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

  const handleForewordValue = (): forewordOptionType | undefined => {
    return ForewordOptions.find((option) => option.value === foreword);
  };

  const handleOfficialValue = (): OfficialOptionType | undefined => {
    return OfficialOptions.find((option) => option.value === officialState);
  };

  const officialOptionHandler = (selectedOption: SingleValue<any>): void => {
    setOfficialState(selectedOption.value);
  };

  const forewordHandler = (selectedOption: SingleValue<any>): void => {
    setForeword(selectedOption.value);
  };

  // file preview "x"버튼 핸들 함수
  const handleDeleteButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fileName: string
  ) => {
    // form event 
    e.preventDefault();
    // 데이터 상태관리 해주기 -> 유즈 이펙트로 인한 프리뷰 업데이트 
    const filteredImgs = postImgs.filter((item) => item.fileName !== fileName)
    const filteredFiles = postFiles.filter((item) => item.fileName !== fileName)
    setPostImgs([...filteredImgs]);
    setPostFiles(filteredFiles);
  };

  // 게시글 상세 내용 가져오기
  useEffect(() => {
    if (postDetail) {
      setTitle(postDetail.title);
      setContent(postDetail.content);
      setPostImgs(postDetail.postImgs);
      setPostFiles(postDetail.files);
      if (isOfficialQuery === "true") {
        ForewordOptions.map((option) => {
          if (option.label === postDetail.foreword) {
            setForeword(option.value);
          }
        });
      } else {
        setForeword("");
      }
    }
  }, [postDetail]);

  // 게시글 상세 내용 가져온 후, file + postImgs 합쳐서 화면에 미리 보기 위해서 상태로 관리
  useEffect(() => {
    let fileBucket: (FilesType | PostImgsType)[] = [];
    if (!!postImgs) {
      fileBucket.push(...postImgs);
    }
    if (!!postFiles) {
      fileBucket.push(...postFiles);
    }
    setFilePreview(fileBucket);
  }, [postImgs, postFiles]);

  useEffect(() => {
    if (officialState === "normal") {
      setForeword("");
      setSearchParams({ isAnnouncement: "false" });
    } else {
      setForeword("notice");
      setSearchParams({ isAnnouncement: "true" });
    }
  }, [officialState]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  console.log(postDetail, "---postDetail---");

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
                  name="official"
                  id="official"
                  styles={customStyles}
                  options={OfficialOptions}
                  placeholder="종류"
                  className={styles.select}
                  onChange={(e: SingleValue<any>) => officialOptionHandler(e)}
                  value={handleOfficialValue()}
                />
                <Select
                  name="foreword"
                  id="foreword"
                  styles={customStyles}
                  options={ForewordOptions}
                  placeholder="머리말"
                  className={styles.select}
                  onChange={(e: SingleValue<any>) => forewordHandler(e)}
                  value={handleForewordValue()}
                  isDisabled={officialState === "normal" ? true : false}
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
              <input
                type="file"
                name="uploadFile"
                id="uploadFile"
                multiple
                onChange={(e) => setRemainingFiles(e.target.files)}
              />
              {filePreview.map((file) => (
                <div key={file.fileId} className={styles.fileItemWrapper}>
                  <span className={styles.fileItemText}>{file.fileName}</span>
                  <button
                    onClick={(e) => handleDeleteButtonClick(e, file.fileName)}
                    className={styles.deleteButton}
                  >
                    X
                  </button>
                </div>
              ))}
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
