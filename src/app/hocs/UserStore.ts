import {create} from "zustand";
import {persist} from "zustand/middleware";

type userState = {
    token :string | null;
    setToken: (token:string | null) =>void;
}

const useUserStore = create(
    persist<userState>((set) => ({
            token: null,
            setToken: (token) => set({token: token}),
        }), {
            name: "userStore"
        }
    )
);
export default useUserStore;