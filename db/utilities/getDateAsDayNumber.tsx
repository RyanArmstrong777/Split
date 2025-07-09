export function getDateAsDayNumber(date: string) {
  const input = new Date(date);
  const jsDay = input.getDay();
  return (jsDay + 6) % 7;
}