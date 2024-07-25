import Swal, {SweetAlertIcon} from "sweetalert2";
import * as sweetalert2 from "sweetalert2";


export default function AutoCloseTimerAlert(icon:SweetAlertIcon, title:string, text:string, time:number) {
    console.log(time)
    let timerInterval:any;
    Swal.fire({
        icon: icon,
        title: title,
        html: `<b id="m"></b>분 <b id="s"></b>초 ${text}`,
        timer: time,
        timerProgressBar: true,
        confirmButtonText: "확인",
        confirmButtonColor: "#DFBD00",
        didOpen: () => {
            // Swal.getDenyButton();

            // @ts-ignore
            const minuteTag:any = Swal.getPopup().querySelector("#m");
            // @ts-ignore
            const secondTag:any = Swal.getPopup().querySelector("#s");

            timerInterval = setInterval(() => {
                let min:number;
                let sec:number;
                let timerLeft:number = Swal.getTimerLeft() || 0

                min = (timerLeft/1000/60) | 0
                minuteTag.textContent = min;
                sec = ((timerLeft/1000) % 60) | 0
                secondTag.textContent = sec;
            }, 1000);


        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
        }
    });
}