import React, { useState } from "react";
import styles from "./AdminGallery.module.css";
import { Pagination } from "widgets/pagination";
import { CategoryList } from "shared/ui";
import { AdminGalleryListData } from "features/admin/";
import { AdminSearchForm } from "features/admin";
import {
  galleryListLength,
  galleryListTitles,
  galleryLabel,
  firGallerycategory,
  secGallerycategory,
  galleryCsv,
} from "../adminUtils/adminGalleryTitle";
import {
  useAdminGalleryDatas,
  useAdminGalleryCsv,
} from "../api/useAdminGalleryDatas";
import Button from "shared/ui/button";
import { useAdminGalleryStore } from "shared/model/stores/AdminGalleryStore";
import { CSVLink } from "react-csv";
import { useFlattenData } from "shared/hook/useFlattenData";

export const AdminGallery = () => {
  //몇개씩 조회할건지 내려주는 state
  const [isEnabled, setIsEnabled] = useState(false);
  const flattenDatas = useFlattenData();

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
  } = useAdminGalleryStore();

  const { data: adminGalleryDatas, refetch } = useAdminGalleryDatas(
    {
      page,
      galleryListLength: selectedCategory.list,
      firstCategory: selectedfirstCategory.list,
      searchKeyword,
      secondCategory: selectedSecondCategory.list,
      startDate,
      endDate,
    },
    isEnabled
  );

  const { data: galleryCsvDatas } = useAdminGalleryCsv(isEnabled);

  const adminGalleryData = adminGalleryDatas?.data.data ?? [];
  const totalPage: number = adminGalleryDatas?.data.data.totalPages ?? 0;
  const csvData = galleryCsvDatas?.data.data.galleries ?? [];

  const handleNavigateToUploadPage = () => {
    window.open("/admin/galleryupload");
  };

  const handleSearch = () => {
    setIsEnabled(true);
    refetch();
  };

  const handleReset = () => {
    setSelectedfirstCategory(firGallerycategory[0]);
    setSelectedSecondCategory(secGallerycategory[0]);
    setSearchKeyword("");
    setStartDate(null);
    setEndDate(null);
    setIsEnabled(false);
    refetch();
  };

  const galleryCsvData = flattenDatas(csvData);

  return (
    <div className={styles.container}>
      <div className={styles.searchFormWapper}>
        <AdminSearchForm
          label={galleryLabel}
          firstCategoryOptions={firGallerycategory}
          secondCategoryOptions={secGallerycategory}
          selectedfirstCategory={selectedfirstCategory}
          setSelectedfirstCategory={setSelectedfirstCategory}
          selectedSecondCategory={selectedSecondCategory}
          setSelectedSecondCategory={setSelectedSecondCategory}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          handleSearch={handleSearch}
          handleReset={handleReset}
        />
      </div>
      <div className={styles.listWrapper}>
        <div className={styles.listLengthBox}>
          <div className={styles.listLength}>
            총 {adminGalleryData.totalGalleries || "0"}건
            <div className={styles.CategoryListWrapper}>
              <CategoryList
                categories={galleryListLength}
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
              미디어 등록
            </Button>
            {galleryCsvData && (
              <CSVLink
                headers={galleryCsv}
                data={galleryCsvData}
                filename="gallery.csv"
                className={styles.csvBtn}
              >
                엑셀 다운로드
              </CSVLink>
            )}
          </div>
        </div>
        <AdminGalleryListData
          titles={galleryListTitles}
          lists={adminGalleryData.galleries}
        />
        <Pagination totalPages={totalPage} page={page} setPage={setPage} />
      </div>
    </div>
  );
};
