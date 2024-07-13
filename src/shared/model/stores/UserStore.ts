import {create} from "zustand";
import {persist} from "zustand/middleware";



type userState = {
    AccessToken :string | null;
    setAccessToken: (token:string | null) =>void;
}

export const useUserStore =  create(
    persist<userState>((set) => ({
            AccessToken: null,
            setAccessToken: (token) => set({AccessToken: token}),
        }), {
            name: "userStore"
        }
    )
);
