
import { create } from "zustand";
import { Category } from "shared/type/AdminType";
import {
  postListLength,
  firPostcategory,
  secPostcategory,
} from "pages/admin/adminUtils/adminPostTitle";

interface AdminPostState {
  page: number;
  selectedCategory: any;
  selectedfirstCategory: Category;
  searchKeyword: string;
  selectedSecondCategory: Category;
  startDate: Date | null;
  endDate: Date | null;
  setPage: (page: any) => void;
  setSelectedCategory: (category: Category) => void;
  setSelectedfirstCategory: (category: any) => void;
  setSearchKeyword: (keyword: string) => void;
  setSelectedSecondCategory: (category: any) => void;
  setStartDate: any;
  setEndDate: any;
}
//여기는 타입을 지정해주고

export const useAdminPostStore = create<AdminPostState>((set) => ({
  page: 1,
  selectedCategory: postListLength[0],
  selectedfirstCategory: firPostcategory[0],
  searchKeyword: "",
  selectedSecondCategory: secPostcategory[0],
  startDate: null,
  endDate: null,
  setPage: (page: any) => set({ page }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedfirstCategory: (category) =>
    set({ selectedfirstCategory: category }),
  setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
  setSelectedSecondCategory: (category) =>
    set({ selectedSecondCategory: category }),
  setStartDate: (date:any) => set({ startDate: date }),
  setEndDate: (date:any) => set({ endDate: date }),
}));
//여기는 상태를 지정해주는 부분이다.(초깃값)
