import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostListTable } from "../../../entities/postListTable";
import { Pagination } from "widgets/pagination";
import { useQuery } from "@tanstack/react-query";
import { NormalApi } from "../../../shared/api/NormalApi";
import { Post, PostListData } from "../../../shared/type/PostType";
import { SearchBar } from "widgets/searchBar";
import styles from "./PostListPage.module.css";

export const PostListPage = () => {
  const [page, setPage] = useState<number>(1);
  const [searchCategory, setSearchCategory] = useState("제목");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  let { category } = useParams();
  category = category as string;
  const title =
    category === "notice"
      ? "공지사항"
      : category === "news"
        ? "NEWS"
        : category === "news"
          ? "자료실"
          : "";

  const { isLoading, isError, data: postList } = useQuery<PostListData>({
    queryKey: ["postList", page],
    queryFn: () =>
      NormalApi.get(`/v1/api/post/${category}?page=${page - 1}&size=10`),
    select: (result: any) => result.data.data,
  });

  const posts: Post[] = postList?.posts ?? [];
  const totalPages: number = postList?.totalPages ?? 0;

  // 검색 결과 페이지로 이동하는 함수 호출
  const findTargetPage = () => {
    NormalApi.get(`/v1/api/post/${category}`, {
      params: {
        page: 0,
        size: totalPages * 6,
        official: true,
      },
    }).then((res) => {
      const allPosts = res.data.data.posts;
      const foundIndex = allPosts.findIndex((post: Post) =>
        post.title?.includes(searchKeyword)
      );
      const targetPageNumber =
        foundIndex !== -1 ? Math.floor(foundIndex / 6) + 1 : 1;
      setPage(targetPageNumber);
    });
  };

  useEffect(() => {
    if (!postList) return;
    const filterPosts = () => {
      return posts.filter((post) =>
        //galleries 데이터를 필터해서
        searchCategory === "제목" || searchCategory === "전체"
          ? //제목이나 전체로 검색했을 때 true면 타이틀을 포함하는 갤러리만 반환
            post.title?.includes(searchKeyword) ?? false
          : true
      );
    };
    setFilteredPosts(filterPosts());

    //검색어가 바뀌면 필터링된 갤러리를 다시 세팅
  }, [postList, searchCategory, searchKeyword]);

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error</span>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.titleArea}>
          <span className={styles.title}>{`${title}`}</span>
        </div>
        <PostListTable postListData={filteredPosts} />
        {postList && (
          <Pagination
            totalPages={Math.max(1, postList?.totalPages)}
            page={page}
            setPage={setPage}
          />
        )}
        <SearchBar
          searchCategory={searchCategory}
          setSearchCategory={setSearchCategory}
          setSearchKeyword={setSearchKeyword}
          handleSearch={() => findTargetPage()}
        />
      </div>
    </div>
  );
};
