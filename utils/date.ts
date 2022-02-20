export const subtractMonth = (date: Date, n: number): Date => {
  date.setMonth(date.getMonth() - n);
  return date;
};

export const toDateTimeFormat = (date: Date): string => {
  return date.toISOString().substring(0, 16);
};
