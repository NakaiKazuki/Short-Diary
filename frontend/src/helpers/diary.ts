export const dateToday = () => {
  const d = new Date();
  const getYear = d.getFullYear();
  const month = d.getMonth() + 1;
  const getMonth = month < 10 ? `0${month}` : month;
  const date = d.getDate();
  const getDate = date < 10 ? `0${date}` : date;
  return `${getYear}-${getMonth}-${getDate}`;
};