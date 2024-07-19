export const userListLength = [{ list: 20 }, { list: 50 }, { list: 100 }];

export const userLabel = ["검색어", "권한", "가입일시"];

export const firUsercategory = [
  { list: "전체" },
  { list: "이름" },
  { list: "이메일" },
  { list: "아이디" },
  { list: "소속팀" },
];

export const secUsercategory = [
  { list: "전체" },
  { list: "유저" },
  { list: "심판부" },
  { list: "심판 이사" },
  { list: "경기부" },
  { list: "경기부 이사" },
  { list: "관리자" },
  { list: "마스터" },
];

export const userListTitles = [
  "아이디",
  "이름",
  "소속팀",
  "권한",
  "이메일",
  "휴대폰 번호",
  "생년월일",
  "성별",
  "유저 상태",
  "로그인 일시",
  "가입 일시",
  "최종 수정 일시",
  "잠금 일시",
  "탈퇴 일시",
  "로그인 실패 횟수",
];

export const userPermissionList = [
  { list: "마스터" },
  { list: "관리자" },
  { list: "유저" },
  { list: "심판부" },
  { list: "심판 이사" },
  { list: "경기부" },
  { list: "경기부 이사" },
];

export const userPermissionMap = [
  { label: "마스터", value: "master" },
  { label: "관리자", value: "admin" },
  { label: "유저", value: "user" },
  { label: "심판부", value: "referee" },
  { label: "심판 이사", value: "referee-leader" },
  { label: "경기부", value: "table-official" },
  { label: "경기부 이사", value: "table-official-leader" },
];

export const userCsv = [
  { label: "아이디", key: "userId" },
  { label: "이름", key: "name" },
  { label: "소속팀", key: "team" },
  { label: "권한", key: "permission" },
  { label: "이메일", key: "email" },
  { label: "휴대폰 번호", key: "phoneNum" },
  { label: "생년월일", key: "dateOfBirth" },
  { label: "성별", key: "gender" },
  { label: "유저 상태", key: "userStatus" },
  { label: "로그인 일시", key: "loginAt" },
  { label: "가입 일시", key: "createAt" },
  { label: "최종 수정 일시", key: "updateAt" },
  { label: "잠금 일시", key: "lockAt" },
  { label: "탈퇴 일시", key: "deleteAt" },
  { label: "로그인 실패 횟수", key: "failureCount" },
];
