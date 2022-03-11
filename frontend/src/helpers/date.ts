export const dateToday = () =>
  new Date(Date.now() + 9 * 3600000)
    .toISOString()
    .replace(/\..*/, "+09:00")
    .split("T")[0];
