import React, { useState } from "react";
import { Pagination } from "widgets/pagination";
import { SearchBar } from "widgets/searchBar";
import styles from "./FaqPage.module.css";
import { mockData } from "../model/mockData";
import { FAQListTable } from "entities/faqListTable";
import {PageTitle} from "../../../shared/ui";

export const FaqPage = () => {
  const [page, setPage] = useState<number>(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const findTargetPage = () => {
    setPage(1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.titleArea}>
          <PageTitle pageName={"FAQ"} />
        </div>
        <FAQListTable mockData={mockData} />
        {mockData && (
          <Pagination
            totalPages={Math.max(1, mockData?.totalPages)}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
};
