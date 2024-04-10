import {create} from "zustand";
import {persist} from "zustand/middleware";

type userState = {
    AccessToken :string | null;
    RefreshToken :string | null;
    setAccessToken: (token:string | null) =>void;
    setRefreshToken: (token:string | null) =>void;
}

const useUserStore = create(
    persist<userState>((set) => ({
            AccessToken: null,
            RefreshToken: null,
            setAccessToken: (token) => set({AccessToken: token}),
            setRefreshToken: (token) => set({RefreshToken: token}),
        }), {
            name: "userStore"
        }
    )
);
export default useUserStore;