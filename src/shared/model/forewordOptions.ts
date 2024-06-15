export type forewordType = {
  value: string;
  label: string;
};
const ForewordOptions: forewordType[] = [
  { value: "notice", label: "안내" },
  { value: "hold", label: "개최" },
  { value: "announcement", label: "합격자 발표"  },
  { value: "bidding", label: "입찰"  },
  { value: "etc", label: "기타"  },
];

export default ForewordOptions;
