export const dateToday = ():string => {
  const d:Date = new Date();
  const getYear:number = d.getFullYear();
  const month:number = d.getMonth() + 1;
  const getMonth:string | number = month < 10 ? `0${month}` : month;
  const date:number = d.getDate();
  const getDate:string | number = date < 10 ? `0${date}` : date;
  return `${getYear}-${getMonth}-${getDate}`;
};