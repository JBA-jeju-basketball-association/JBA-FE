import Swal, { SweetAlertIcon } from "sweetalert2";

export default function confirmDelete(
  icon: SweetAlertIcon,
  title: string,
  text?: string,
  deletePost?: any
) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonText: "삭제",
    confirmButtonColor: "#DF1A1A",
    cancelButtonText: "취소",
    cancelButtonColor: "#EEEEEE",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "삭제완료",
        text: "파일이 삭제되었습니다!",
        icon: "success",
      });
      deletePost();
    }
  });
}
