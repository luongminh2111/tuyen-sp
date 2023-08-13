
export const parseDateToString = (day) => {
  if (!day) return null;
  const fullYear = new Date(day).getFullYear();
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const month = months[new Date(day).getMonth()];
  const curDay = new Date(day).getDate() > 9 ? new Date(day).getDate() : `0${new Date(day).getDate()}`;
  return `${fullYear}-${month}-${curDay}`
}

export const compareTime = (d1, d2) => {
  if (d1.getTime() < d2.getTime()) {
    return true;
  }
  return false;
};