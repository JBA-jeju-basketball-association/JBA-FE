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
import { EditRequestPostData } from "../api/EditPostRequest";
import styles from "./UpdatePostPage.module.css";
import {
  FilesType,
  PostDetailType,
  RemainingFilesType,
} from "shared/type/PostType";
import { LoadingSpinner, PageTitle } from "shared/ui";
import confirmDelete from "shared/lib/alert/ConfirmDelete";
import MutationEditPost from "../api/MutationEditPost";
import {ckEditorResponse} from "../../../features/ckEditor/ui/CkEditor";

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
  const [postImgsState, setPostImgsState] = useState<RemainingFilesType[]>([]);
  const [remainingFilesState, setRemainingFilesState] = useState<FilesType[]>(
    []
  );
  // 수정 후 보낼 내용
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [newCkImgUrls, setNewCkImgUrls] = useState<ckEditorResponse[]>([]);
  const navigate = useNavigate();

  const detailTitle =
    category === "notice"
      ? "공지사항"
      : category === "news"
        ? "NEWS"
        : "자료실";

  const {isLoading, isError, data: postDetail, error,} = useQuery<PostDetailType>({
    queryKey: ["postDeatil", category, postId],
    queryFn: () => NormalApi.get(`/v1/api/post/${category}/${postId}`),
    enabled: !!postId, // postId가 존재할 때에만 호출
    select: (result: any) => result.data.data,
  });

  const queryClient = useQueryClient();
  const mutation = MutationEditPost(queryClient, category)

  const editPost = (params: {
    category?: string;
    requestData: EditRequestPostData;
    postId?: string;
    officialState: "official" | "normal";
    uploadFiles: File[];
  }) => {
    mutation.mutate(params);
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const remainingFiles: RemainingFilesType[] = [];
    let postImgs: RemainingFilesType[] = [];

    remainingFilesState.map(
      (item) =>
        item.fileUrl && remainingFiles.push({ fileName: item.fileName, fileUrl: item.fileUrl })
    );
    postImgsState.forEach((item) =>
      postImgs.push(item)
    );
    newCkImgUrls.forEach((item) => {
      postImgs.push({fileName: item.fileName, fileUrl:item.fileUrl})
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


  };


  const handleOfficialValue = (): OfficialOptionType | undefined => {
    return OfficialOptions.find((option) => option.value === officialState);
  };

  const officialOptionHandler = (selectedOption: SingleValue<any>): void => {
    setOfficialState(selectedOption.value);
  };


  // 추가 upload 되는 파일들을 모아준다.
  const handleUploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadFiles(prevState => {
        let result = [...prevState]
        for (let i: number = 0; i < files.length; i++) {
          const file = files.item(i)
          if (file) result.push(file)
        }
        return result
      });
    }
  }

  // 추가된 파일 삭제 로직
  const handleDeleteUploadFiles = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>,indexToRemove:number) => {
    e.preventDefault()
    setUploadFiles(prev => prev.filter((f, index) => index !== indexToRemove))
  }

  // 원래 업로드 되어있던 파일 삭제 로직
  const handleDeleteOriginFiles = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, indexToRemove:number) => {
    // form event
    e.preventDefault();
    setRemainingFilesState(prev => prev.filter((f,index) => index !== indexToRemove))
  };

  // 게시글 상세 내용 가져오기
  useEffect(() => {
    if (postDetail) {
      const imgList = postDetail.postImgs.map(item => {
        return {fileName:item.fileName, fileUrl:item.fileUrl}
      })
      setTitle(postDetail.title);
      setContent(postDetail.content);
      setPostImgsState(imgList);
      setRemainingFilesState(postDetail.files);
    }
  }, [isOfficialQuery, postDetail]);

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
                <div className={styles.customFileInput}>
                  <p>파일선택</p>
                  <input
                      type="file"
                      id="uploadFile"
                      multiple
                      onChange={(e) => handleUploadFiles(e)}
                  />
                </div>
                <div className={styles.fileBundleWrapper}>
                  {remainingFilesState.map((file, index:number) => (
                      <div key={file.fileId} className={styles.fileItemWrapper}>
                      <span>
                        {file.fileName}
                      </span>
                      <button
                        onClick={(e) =>
                            handleDeleteOriginFiles(e, index)
                        }
                        className={styles.deleteButton}
                      />
                    </div>
                  ))}
                  {uploadFiles.map((file:File, index:number) => (
                      <div key={index} className={styles.fileItemWrapper}>
                      <span>
                        {file.name}
                      </span>
                        <button
                            onClick={(e) =>
                                handleDeleteUploadFiles(e,index)
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
