export function getFirstDayOfMonth(dateString: string): string {
    const date = new Date(dateString);
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay.toISOString();
}