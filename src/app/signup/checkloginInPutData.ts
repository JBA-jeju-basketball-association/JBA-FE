

export default function checkloginInPutData(type: string): [RegExp, string, string] {
    let regex: RegExp = /[a-z]/; // 초기값으로 설정
    let isTrue: string = "";
    let isFalse: string = "";
      switch(type)
      {
        case "email": 
          regex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;//이메일 형식확인
          isTrue="유효한 이메일 형식입니다.";
          isFalse="이메일 형식을 확인하세요."
        break;  
        case "password": 
          regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;;//숫자, 영문, 특수문자를 반드시 포함한 8~20자리의 비밀번호인지 확인
          isTrue="유효한 비밀번호 형식입니다.";
          isFalse="숫자, 영문, 특수문자를 반드시 포함한 8~20자리의 비밀번호를 입력해주세요. "
        break;
        case "name": 
        regex = /^[가-힣a-zA-Z]+$/;//영문 및 한글로 이루어져있는지 확인
        isTrue="사용 가능한 이름입니다.";
        isFalse="이름을 정확히 입력해주세요."
        break;  
        case "phoneNum": 
        regex = /^\d{3,4}-\d{3,4}-\d{4}$/;//000-0000-0000 형식확인
        isTrue="사용 가능한 전화번호입니다."
        isFalse="올바른 휴대폰 형식이 아닙니다."
        break; 
        case "gender": //MALE,FEMALE 둘중 하나의 값인지 확인
        regex = /^(MALE|FEMALE)$/;
        isTrue="성별이 확인되었습니다.";
        isFalse="성별을 체크해주세요."
        break;  
        case "team": 
        regex = /^\S+$/;//공백이 아닌 글씨로 시작하는지 확인
        isTrue="소속팀이 입력되었습니다.";
        isFalse="소속팀을 입력해주세요. 없을시 무소속을 체크해주세요."
        break; 
        case "year": 
        regex = /^(199[0-9]|20[0-1][0-9]|202[0-4])$/;
        isTrue="OK";
        isFalse="올바른 년도를 입력해주세요."
        break; 
        case "month": 
        regex = /^(0[1-9]|1[0-2])$/;//0부토 12까지 확인
        isTrue="OK";
        isFalse="올바른 월을 입력해주세요."
        break; 
        case "day": 
        regex = /^(0[1-9]|[12][0-9]|3[01])$/;//0부터 31까지 확인
        isTrue="OK";
        isFalse="올바른 일을 입력해주세요."
        break; 

        //비밀번호 확인은 사용자가 작성된 비밀번호와 비교하여야 하기에 정규표현식을 사용하기 알맞지 않고
       
      }
    return [regex,isTrue,isFalse]
  }
  