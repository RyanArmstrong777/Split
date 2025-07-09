export function formatDateForChart(date: Date, timeframe: string): string {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  switch (timeframe) {
    case "All time":
    case "Year":
      if (day === 1) {
        return date.toLocaleString('default', { month: 'short' }).charAt(0);
      }
      return "";

    case "Month":
    case "Week":

      return day.toString();

    default:
      return day.toString();
  }
}