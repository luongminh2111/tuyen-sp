
export const getTimeForTrip = (start, end) => {
  const yearStart = new Date(start).getFullYear();
  const monthStart = new Date(start).getMonth();
  const dayStart = new Date(start).getDate();
  const hourStart = new Date(start).getHours();
  const minuteStart = new Date(start).getMinutes(); 

  const yearEnd = new Date(end).getFullYear();
  const monthEnd = new Date(end).getMonth();
  const dayEnd = new Date(end).getDate();
  const hourEnd = new Date(end).getHours();
  const minuteEnd = new Date(end).getMinutes(); 

  return `${ hourStart - hourEnd}hour ${minuteStart - minuteEnd}minutes`
};

export const parseDateToString = (day) => {
  if (!day) return null;
  const fullYear = new Date(day).getFullYear();
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const month = months[new Date(day).getMonth()];
  const curDay = new Date(day).getDate();
  return `${fullYear}-${month}-${curDay}`
}