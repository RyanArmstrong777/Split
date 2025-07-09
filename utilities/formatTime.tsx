export function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  } else if (seconds < 3600) {
    return `${Math.floor(seconds / 60)}min`;
  } else {
    return `${Math.floor(seconds / 3600)}h`;
  }
}