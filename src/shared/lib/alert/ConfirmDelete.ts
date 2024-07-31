import Swal, { SweetAlertIcon } from "sweetalert2";

export default function confirmDelete(
  purpose: string,
  onConfirm: () => void,
  icon: SweetAlertIcon,
  title: string,
  text?: string
) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonText: purpose === "수정" ? "수정취소" : `${purpose}`,
    confirmButtonColor: "#DF1A1A",
    cancelButtonText: purpose === "수정" ? "계속하기" : "취소",
    cancelButtonColor: "#EEEEEE",
  }).then((result) => {
    if (purpose === "삭제") {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${purpose}완료`,
          text: `파일이 성공적으로 ${purpose}되었습니다!`,
          icon: "success",
        });
        onConfirm();
      }
    } else if (purpose === "수정") {
      if (result.isConfirmed) {
        Swal.fire({
          title: "작업 취소",
          text: "작업이 취소되었습니다.",
          icon: "success",
        });
        onConfirm();
      }
    }
  });
}
