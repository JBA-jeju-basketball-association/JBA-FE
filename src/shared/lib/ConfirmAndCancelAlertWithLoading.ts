import Swal, {SweetAlertIcon} from "sweetalert2";


export default function confirmAndCancelAlert(icon: SweetAlertIcon, title: string, text?: string, asyncFc?:any) {
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonText: "확인",
        confirmButtonColor: "#DFBD00",
        cancelButtonText: "취소",
        cancelButtonColor: "#3085d6",
        showLoaderOnConfirm: true,
        preConfirm: () => asyncFc()
    })
}