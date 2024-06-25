import React from "react";
import { AdminSearchForm } from "features/admin/";
export const AdminUser = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "1000px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "beige",
          width: "90%",
          height: "200px",
        }}
      >
        <AdminSearchForm />
      </div>
      <div
        style={{
          backgroundColor: "beige",
          width: "90%",
          height: "700px",
          marginTop: "50px",
        }}
      >
        목록 영역
      </div>
    </div>
  );
};
