import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { PostListTable } from "../../../entities/postListTable";
import { Pagination } from "widgets/pagination";
import { useQuery } from "@tanstack/react-query";
import { NormalApi } from "../../../shared/api";
import { Post, PostListData } from "../../../shared/type/PostType";
import { SearchBar } from "widgets/searchBar";
import styles from "./PostListPage.module.css";
import {LoadingSpinner, RegitUpdateDeleteButton} from "../../../shared/ui";
import {JwtDecoder} from "../../../shared/lib";
import {useUserStore} from "../../../shared/model";

export const PostListPage = () => {
  const [page, setPage] = useState<number>(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  let { category } = useParams();
  const navigate = useNavigate();
  const {AccessToken} = useUserStore()
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
    refetch
  } = useQuery<PostListData>({
    queryKey: ["postList",`${category}`],
    queryFn: () =>
        NormalApi.get(`/v1/api/post/${category}?page=${page - 1}&size=10&keyword=${searchKeyword}`),
    select: (result: any) => result.data.data,
  });

  const findTargetPage = () => {
    setPage(1);
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [searchKeyword]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <span>Error</span>;
  }

  return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.titleArea}>
            <span className={styles.title}>{title}</span>
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
                setSearchKeyword={setSearchKeyword}
                handleSearch={() => findTargetPage()}
            />
          </div>
          <div className={styles.divideLine}></div>
          <PostListTable postListData={postList?.posts}/>
          <div className={styles.divideLine}></div>
          {postList && (
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
