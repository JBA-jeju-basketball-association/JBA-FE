import React from "react";
import { CategoryList } from "shared/ui";

export const AdminSearchForm = () => {
  const categorys = [
    { id: 1, label: "이름" },
    { id: 2, label: "이메일" },
    { id: 3, label: "아이디" },
    { id: 4, label: "소속팀" },
  ];
  return (
    <div>
      <CategoryList categorys={categorys} />
    </div>
  );
};
