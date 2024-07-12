import { create } from "zustand";
import { Category } from "shared/type/AdminType";
import {
  competitionListLength,
  fircompetitioncategory,
  seccompetitioncategory,
} from "pages/admin/adminUtils/adminCompetitionTitle";

interface AdminCompetitionState {
  page: number;
  selectedCategory: any;
  selectedfirstCategory: Category;
  searchKeyword: string;
  selectedSecondCategory: Category;
  startDate: Date | null;
  endDate: Date | null;
  setPage: any;
  setSelectedCategory: (category: any) => void;
  setSelectedfirstCategory: (category: any) => void;
  setSearchKeyword: (keyword: string) => void;
  setSelectedSecondCategory: (category: any) => void;
  setStartDate: any;
  setEndDate: any;
}

export const useAdminCompetitionStore = create<AdminCompetitionState>((set) => ({
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
}));
