export const useFormattedDate = (date: Date | null) => {
  const formattedDate = date ? date.toISOString().split("T")[0] : null;
  return formattedDate;
};
