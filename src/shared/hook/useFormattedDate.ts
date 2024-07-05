export const useFormattedDate = (date: Date | null) => {
  if (!date) return null;
  let offset = date.getTimezoneOffset() * 60000;
  const formatteddDate = new Date(date.getTime() - offset);
  return formatteddDate.toISOString().split("T")[0];
};
// date.getTime() - offset을 통해 UTC 기준 시간을 계산
// 조정된 날짜를 ISO 형식 문자열로 변환하고, T 문자를 기준으로 분리하여 YYYY-MM-DD 부분을 반환