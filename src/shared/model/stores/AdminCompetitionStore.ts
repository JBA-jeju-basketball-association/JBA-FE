import { create } from "zustand";
import { Category } from "shared/type/AdminType";
import {
  competitionListLength,
  fircompetitioncategory,
  seccompetitioncategory,
  situationList,
} from "pages/admin/adminUtils/adminCompetitionTitle";

interface AdminCompetitionState {
  page: number;
  selectedCategory: any;
  selectedfirstCategory: Category;
  searchKeyword: string;
  selectedSecondCategory: any;
  startDate: Date | null;
  endDate: Date | null;
  setPage: (page: any) => void;
  setSelectedCategory: (category: Category) => void;
  setSelectedfirstCategory: (category: any) => void;
  setSearchKeyword: (keyword: string) => void;
  setSelectedSecondCategory: (category: any) => void;
  setStartDate: any;
  setEndDate: any;

  selectSituation: any;
  setSelectSituation: (situation: Category) => void;
}

export const useAdminCompetitionStore = create<AdminCompetitionState>(
  (set) => ({
    page: 1,
    selectedCategory: competitionListLength[0],
    selectedfirstCategory: fircompetitioncategory[0],
    searchKeyword: "",
    selectedSecondCategory: seccompetitioncategory[0],
    startDate: null,
    endDate: null,
    setPage: (page: any) => set({ page }),
    setSelectedCategory: (category) => set({ selectedCategory: category }),
    setSelectedfirstCategory: (category) =>
      set({ selectedfirstCategory: category }),
    setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
    setSelectedSecondCategory: (category) =>
      set({ selectedSecondCategory: category }),
    setStartDate: (date: any) => set({ startDate: date }),
    setEndDate: (date: any) => set({ endDate: date }),

    selectSituation: situationList[0],
    setSelectSituation: (situation) => set({ selectSituation: situation }),
  })
);
