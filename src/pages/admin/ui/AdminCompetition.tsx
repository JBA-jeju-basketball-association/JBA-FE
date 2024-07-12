import React, { useState, useEffect } from "react";
import styles from "./AdminPost.module.css";
import { Pagination } from "widgets/pagination";
import { CategoryList } from "shared/ui";
import { AdminCompetitionListData } from "features/admin/ui/AdminCompetitionListData";
import Button from "shared/ui/button";
import { useNavigate } from "react-router-dom";
import {
  competitionListLength,
  competitionLabel,
  competitionListTitles,
} from "pages/admin/adminUtils/adminCompetitionTitle";
import { useAdminCompetitionStore } from "shared/model/stores/AdminCompetitionStore";
import {
  useAdminCompetitionDatas,
  useAdminCompetitionTotal,
} from "pages/admin/api/useAdminCompetitionDatas";
import { useQuery } from "@tanstack/react-query";
import { Api } from "shared/api";

export const AdminCompetition = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const navigate = useNavigate();
  const {
    page,
    setPage,
    selectedCategory,
    selectedfirstCategory,
    searchKeyword,
    selectedSecondCategory,
    startDate,
    endDate,
    setSelectedCategory,
    setSelectedfirstCategory,
    setSearchKeyword,
    setSelectedSecondCategory,
    setStartDate,
    setEndDate,
  } = useAdminCompetitionStore();

  const { data: adminCompetitionTotal } = useAdminCompetitionTotal();

  const totalCompetitionData = adminCompetitionTotal?.data.data.totalSize ?? 0;

  const divisionData = adminCompetitionTotal?.data.data.divisionList ?? [];
  console.log(divisionData);

  //여기까지 토탈갯수 및 divisionData

  // const { data: adminCompetitionDatas, refetch } = useQuery({
  //   queryKey: ["adminCompetition"],
  //   queryFn: () =>
  //     Api.get("/v1/api/competition/admin/list", {
  //       params: {
  //         page: page - 1,
  //         size: competitionListLength,
  //         searchType: "email",
  //         searchKey: null,
  //         division: "전체",
  //         situation: "전체",
  //         //이게 선택하는 카테고리
  //         filterStartDate: startDate,
  //         filterEndDate: endDate,
  //       },
  //     }),
  // });
  // console.log(startDate, endDate);

  // "searchType": "email",
  // "searchKey": "",
  // "filterStartDate": "2024-04-12T05:46:00.738Z",
  // "filterEndDate": "2024-07-12T05:46:00.738Z",
  // "division": "전체",
  // "situation": "전체"
  // console.log(adminCompetitionDatas);

  const { data: adminCompetitionDatas, refetch } = useAdminCompetitionDatas({
    page,
    competitionListLength: selectedCategory.list,
  });
  console.log(adminCompetitionDatas);

  const handleNavigateToUploadPage = () => {
    navigate("/post/notice/add");
  };

  const handleSearch = () => {};

  const handleReset = () => {};
  const totalPage = 10;

  return (
    <div className={styles.container}>
      <div className={styles.searchFormWapper}></div>
      <div className={styles.listWrapper}>
        <div className={styles.listLengthBox}>
          <div className={styles.listLength}>
            총 {totalCompetitionData || "0"}건
            <div className={styles.CategoryListWrapper}>
              <CategoryList
                categories={competitionListLength}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
            개씩 보기
          </div>
          <div>
            <Button
              className={styles.uploadBtn}
              onClick={handleNavigateToUploadPage}
            >
              게시물 등록
            </Button>
          </div>
        </div>
        {/* <AdminCompetitionListData
          titles={competitionListTitles}
          lists={adminPostData.posts}
        /> */}
        <Pagination totalPages={totalPage} page={page} setPage={setPage} />
      </div>
    </div>
  );
};
