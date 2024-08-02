import {QueryClient, useMutation} from "@tanstack/react-query";
import EditPostRequest from "./EditPostRequest";
import confirmAlert from "../../../shared/lib/alert/ConfirmAlert";
import axios from "axios";


export default function MutationEditPost(queryClient:QueryClient, category:string | undefined) {
    return  useMutation({
        mutationFn: EditPostRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["postList"] });
            confirmAlert("success", "수정 성공", "게시글 수정을 완료하였습니다.")
                .then(res => {
                    if (res.isConfirmed) window.location.href = `/post/${category}`;
                })
        },
        onError: (e) => {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 409) {
                    confirmAlert("warning", "중복된 게시글 제목입니다.");
                }
                if (e.response?.status === 403) {
                    confirmAlert("warning", "게시글 작성 권한이 없습니다.");
                }
                if (e.response?.status === 400) {
                    confirmAlert("warning", "게시글 제목 또는 내용을 입력해주세요.");
                }
                if (e.response?.status === 404) {
                    confirmAlert("warning", "존재하지 않는 작성자입니다.");
                }
            }
        },
    });
}