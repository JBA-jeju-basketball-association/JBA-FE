
export interface Props{
  icon?:string;
  type:SignupFormDataKey;
  placeholder?:string;
  changeSignupForm:(type: SignupFormDataKey, value: string | "MALE" | "FEMALE" | "")=>void;
}

export interface SignupFormDataType {
    email: string;
    password: string;
    passwordConfirm: string;
    name: string;
    phoneNum: string;
    team: string;
    birthday: string;
    gender: "MALE"|"FEMALE"|"";
  }
  
export type SignupFormDataKey ="email"|"password"|"passwordConfirm"|"name"|"phoneNum"|"team"|"birthday"|"gender"

export interface BirthdayType {
  year: string;
  month: string;
  day: string;
  [key: string]: string;
}

export type BirthdayKey = "year"|"month"|"day"



export interface Response {
  code: number;
  message: string;
  detailMessage?: string;
  request?: string;
  data?: string;
}
