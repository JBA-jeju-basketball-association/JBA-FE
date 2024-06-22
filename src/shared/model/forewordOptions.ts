export type forewordOptionType = {
  value: "notice" | "hold" | "announcement" | "bidding" | "etc" | "";
  label: "안내" | "개최" | "합격자 발표" | "입찰" | "기타" | "";
};
const ForewordOptions: forewordOptionType[] = [
  { value: "notice", label: "안내" },
  { value: "hold", label: "개최" },
  { value: "announcement", label: "합격자 발표" },
  { value: "bidding", label: "입찰" },
  { value: "etc", label: "기타" },
];

export default ForewordOptions;
