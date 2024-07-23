import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostListTable } from "../../../entities/postListTable";
import { Pagination } from "widgets/pagination";
import {
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";
import { NormalApi } from "../../../shared/api";
import { PostListData } from "../../../shared/type/PostType";
import { SearchBar } from "widgets/searchBar";
import styles from "./PostListPage.module.css";
import {
  LoadingSpinner,
  PageTitle,
  RegitUpdateDeleteButton,
} from "../../../shared/ui";
import { JwtDecoder } from "../../../shared/lib";
import { useUserStore } from "../../../shared/model";
import confirmAlert from "shared/lib/ConfirmAlert";

export const PostListPage = () => {
  const [page, setPage] = useState<number>(1);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  let { category } = useParams();
  const navigate = useNavigate();
  const { AccessToken } = useUserStore();
  category = category as string;
  const title =
    category === "notice"
      ? "공지사항"
      : category === "news"
        ? "NEWS"
        : "자료실";

  const {
    isLoading,
    isError,
    data: postList,
  } = useQuery<PostListData>({
    queryKey: ["postList", category, page, searchInput],
    queryFn: () =>
      NormalApi.get(
        `/v1/api/post/${category}?page=${page - 1}&size=10&keyword=${searchInput}`
      ),
    select: (result: any) => result.data.data,
    placeholderData: keepPreviousData,
  });

  const findTargetPage = () => {
    if (searchKeyword.length >= 2 || searchKeyword.length === 0) {
      setPage(1);
      setSearchInput(searchKeyword);
    } else {
      alert("🔎 검색은 두 글자 이상 해주세요");
      setSearchInput('');
      setSearchKeyword('');
    }
  };

  // useEffect(() => {
  //   queryClient.invalidateQueries({ queryKey: ['postList'] });
  // }, [searchKeyword]);

  // 검색 -> 키워드 업데이트 -> 엔터 이벤트 -> 서치인풋상태 업데이트 -> 메뉴바 클릭 -> 검색 키워드 초기화 -> 페이지 목록 리패치
  useEffect(() => {
    setSearchInput("");
    setSearchKeyword("");
  }, [category]);

  if (isError) {
    return <span>Error</span>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.titleArea}>
          <PageTitle pageName={title} />
        </div>
        <div className={styles.searchBarArea}>
          {AccessToken && JwtDecoder(AccessToken).role === "ROLE_MASTER" ? (
            <RegitUpdateDeleteButton
              content="등록하기"
              onClickHandler={() => navigate(`/post/${category}/add`)}
            />
          ) : (
            <div></div>
          )}
          <SearchBar
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            handleSearch={findTargetPage}
          />
        </div>
        {isLoading && <LoadingSpinner />}
        <PostListTable
          postListData={postList?.posts}
          totalPosts={postList?.totalPosts}
        />
        {postList && postList.totalPosts !== 0 && (
          <Pagination
            totalPages={Math.max(1, postList?.totalPages)}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
};
