import Swal, {SweetAlertIcon} from "sweetalert2";


export default function confirmAlert(icon: SweetAlertIcon, title: string, text?: string) {
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: "확인",
        confirmButtonColor: "#DFBD00",
    })
}