import { getLastMonday } from './getLastMonday';

export function getWeek(): string[] {
  const week: string[] = [];
  const monday = new Date(getLastMonday());

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    week.push(date.toISOString().split('T')[0]);
  }

  return week;
}