//메인메뉴와 서브메뉴를 짝지어 오브젝트형식으로 담습니다.
export const menuName={
    "농구협회":["공지사항","회장인사말"],
    "제주대회":["대회정보"],
    "미디어센터":["갤러리","대회영상"],
    "커뮤니티":["NEWS","자료실","FAQ"],
    // "심판:경기부":["스탭공지","심판부배정","경기부배정","배정기록","스탭갤러리"],
}


// 형태가 명확하기 때문에 타입스크립트가 이를 올바르게 유추할 수 있습니다. 객체의 각 키는 문자열이고, 각 값은 문자열 배열이라는 것을 타입스크립트가 추론할 수 있기 때문에 별도의 타입 지정을 하지 않아도 됩니다.