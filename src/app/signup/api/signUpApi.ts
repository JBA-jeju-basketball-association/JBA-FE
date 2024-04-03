import axios,{AxiosResponse,AxiosError} from 'axios';
import { SignupFormDataType,Response } from './type';


export default function SignUpApi(data: SignupFormDataType) {
  const birthday = data.birthday.split("-");
     axios.post('http://ec2-43-201-38-210.ap-northeast-2.compute.amazonaws.com:8080/v1/api/sign/sign-up', {
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      name: data.name,
      phoneNum: data.phoneNum,
      gender: data.gender,
      year: birthday[0],
      month: birthday[1],
      day: birthday[2],
      team: data.team
    }).then((response:AxiosResponse<Response>       
        )=>{ console.log("성공 :",response.data.data);
    }).catch((response:AxiosError<Response>       
        )=>{ console.log("실패 :",response.response?.data.detailMessage);
    })}