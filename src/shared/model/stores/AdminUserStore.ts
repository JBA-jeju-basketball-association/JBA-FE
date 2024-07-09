import { create } from "zustand";
import { Category } from "shared/type/AdminType";
import {
  userListLength,
  firUsercategory,
  secUsercategory,
} from "pages/admin/adminUtils/adminUserTitle";

interface AdminUserState {
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
//여기는 타입을 지정해주고

export const useAdminUserStore = create<AdminUserState>((set) => ({
  page: 1,
  selectedCategory: userListLength[0],
  selectedfirstCategory: firUsercategory[0],
  searchKeyword: "",
  selectedSecondCategory: secUsercategory[0],
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
//여기는 상태를 지정해주는 부분이다.(초깃값)
