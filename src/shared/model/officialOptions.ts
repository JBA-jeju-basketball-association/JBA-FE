export type OfficialOptionType = {
  value: "official" | "normal";
  label: "공지사항" | "일반";
};
const OfficialOptions: OfficialOptionType[] = [
  { value: "official", label: "공지사항" },
  { value: "normal", label: "일반" },
];

export default OfficialOptions;
