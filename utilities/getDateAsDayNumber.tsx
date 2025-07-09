export function getDateAsDayNumber(dateString: string): number {
    const date = new Date(dateString);
    const jsDay = date.getDay();

    return (jsDay + 6) % 7;
}