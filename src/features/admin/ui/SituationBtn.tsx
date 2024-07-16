import React, { useState } from "react";
import { situationList } from "pages/admin/adminUtils/adminCompetitionTitle";
import styles from "./SituationBtn.module.css";
import { Category } from "shared/type/AdminType";

type SituationBtnProps = {
  setSelectSituation: (situation: Category) => void;
};

export const SituationBtn = ({ setSelectSituation }: SituationBtnProps) => {
  const [selected, setSelected] = useState(situationList[0]);

  const handleSelect = (situation: any) => {
    setSelected(situation);
    setSelectSituation(situation);
  };

  return (
    <div>
      {situationList.map((situation, index) => (
        <button
          className={`${styles.btn} ${
            selected === situation ? styles.selectBtn : ""
          }`}
          key={index}
          onClick={() => handleSelect(situation)}
        >
          {situation.list}
        </button>
      ))}
    </div>
  );
};
