export const dateToday = () => {
  const date = new Date(new Date().toLocaleString("ja"));

  const y = date.getFullYear();
  const m = ("00" + (date.getMonth() + 1)).slice(-2);
  const d = ("00" + date.getDate()).slice(-2);
  return `${y}-${m}-${d}`;
};

// YYYY-MM-DD をYYYY/MM/DD に変換
export const formattedDate = (date: string): string => {
  const parts = date.split("-");
  const newDateString = `${parts[0]}/${parts[1]}/${parts[2]}`;
  return newDateString;
};
