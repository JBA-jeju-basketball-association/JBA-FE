import axios,{AxiosResponse,AxiosError} from 'axios';
import { Response } from './type';

export default function sendEmailApi(data: string) {
     axios.post('http://ec2-43-201-38-210.ap-northeast-2.compute.amazonaws.com:8080/v1/api/mail/sign-up-send-mail', {
        email:data
    }).then((response:AxiosResponse<Response>       
        )=>{ console.log("성공 :",response.data.message);
        alert("이메일이 발송되었습니다. 이메일을 통해 인증번호를 학인하세요.")
    }).catch((response:AxiosError<Response>       
        )=>{ console.log("실패 :",response.response?.data.detailMessage);
         alert(response.response?.data.detailMessage)
    })}