import axios,{AxiosResponse,AxiosError} from 'axios';
import { Response } from './type';

export default function checkEmailCodeApi(email: string,authNum:string,isConfirmedEmail:(data:boolean)=>void) {
     axios.post('http://ec2-43-201-38-210.ap-northeast-2.compute.amazonaws.com:8080/v1/api/mail/check-auth-num', {
        email:email,
        authNum:authNum
    }).then((response:AxiosResponse<Response>       
        )=>{ console.log("성공 :",response.data.code)
        isConfirmedEmail(true);
        ;
    }).catch((response:AxiosError<Response>       
        )=>{ console.log("실패 :",response.response?.data)
        isConfirmedEmail(false);
    })}